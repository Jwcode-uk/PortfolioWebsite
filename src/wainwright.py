import json
import geopandas as gpd
from shapely.geometry import Point, LineString
from shapely.ops import nearest_points
from glob import glob
import os
import matplotlib.pyplot as plt
import folium

def load_geojson(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except json.JSONDecodeError:
        print(f"Error decoding JSON from {file_path}")
        return None

def flatten_route_coordinates(features):
    route_coords = []
    for feature in features:
        if feature["geometry"]["type"] in ["LineString", "MultiLineString"]:
            coords = feature["geometry"]["coordinates"]
            if isinstance(coords[0][0], list):  # MultiLineString
                for segment in coords:
                    route_coords.extend(segment)
            else:  # LineString
                route_coords.extend(coords)
    return route_coords

def find_wainwrights_near_route(wainwrights_geojson, route_geojson, distance_threshold=250):
    try:
        wainwrights_gdf = gpd.GeoDataFrame.from_features(wainwrights_geojson["features"])
        route_coords = flatten_route_coordinates(route_geojson["features"])
        route_linestring = LineString(route_coords)
        wainwrights_gdf["distance_to_route"] = wainwrights_gdf.geometry.apply(
            lambda x: x.distance(nearest_points(x, route_linestring)[1]) * 111139
        )
        wainwrights_near_route = wainwrights_gdf[wainwrights_gdf["distance_to_route"] <= distance_threshold]
        return wainwrights_near_route[["name", "distance_to_route"]]
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def plot_wainwrights(wainwrights_gdf, all_near_wainwrights):
    # Ensure 'name' is directly accessible in the GeoDataFrame
    wainwrights_gdf['in_range'] = wainwrights_gdf['name'].isin(all_near_wainwrights)

    # Plot setup
    fig, ax = plt.subplots(figsize=(10, 10))
    wainwrights_gdf.plot(ax=ax, color='grey', markersize=5)  # Plot all Wainwrights as a base layer
    
    # Plot Wainwrights in range
    wainwrights_gdf[wainwrights_gdf['in_range']].plot(ax=ax, marker='o', color='red', markersize=50, label='Within Range')
    
    # Plot Wainwrights not in range
    wainwrights_gdf[~wainwrights_gdf['in_range']].plot(ax=ax, marker='x', color='blue', markersize=50, label='Outside Range')
    
    plt.legend()
    plt.show()
    
def plot_wainwrights_on_satellite_map(wainwrights_gdf, all_near_wainwrights):
    # Create a map centered at an average location of the Wainwrights
    map_center = [wainwrights_gdf.geometry.y.mean(), wainwrights_gdf.geometry.x.mean()]
    folium_map = folium.Map(location=map_center, zoom_start=10, tiles='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr='© OpenStreetMap contributors')

    # Iterate through each row in the GeoDataFrame to add points to the map
    for index, row in wainwrights_gdf.iterrows():
        # Determine if the current Wainwright is in range
        in_range = row['name'] in all_near_wainwrights

        # Choose the color based on whether the Wainwright is in range
        marker_color = 'green' if in_range else 'red'
        
        # Add a marker to the map
        folium.Marker(
            location=[row.geometry.y, row.geometry.x],
            popup=f"{row['name']} ({'In range' if in_range else 'Out of range'})",
            icon=folium.Icon(color=marker_color)
        ).add_to(folium_map)

    # Return the Folium map object
    return folium_map

if __name__ == "__main__":
    directory_path = "/home/jonathan/Documents/PortfolioWebsite/public/hikeData/"
    wainwrights_geojson = load_geojson("/home/jonathan/Documents/PortfolioWebsite/public/mapData/wainwrights.geojson")
    all_near_wainwrights = set()

    for route_file in glob(os.path.join(directory_path, "*.js")):
        route_geojson = load_geojson(route_file)
        if route_geojson:
            wainwrights_near = find_wainwrights_near_route(wainwrights_geojson, route_geojson)
            if wainwrights_near is not None:
                all_near_wainwrights.update(wainwrights_near["name"].tolist())
            else:
                print(f"Skipping file due to errors: {route_file}")

    # Convert Wainwrights data into a GeoDataFrame for plotting
    wainwrights_gdf = gpd.GeoDataFrame.from_features(wainwrights_geojson["features"])
    # Plot Wainwrights
    map = plot_wainwrights_on_satellite_map(wainwrights_gdf, all_near_wainwrights)
    map.save('./map.html')
    print(f"Total unique Wainwrights within 50m across all hikes: {len(all_near_wainwrights)}")
    print("Unique Wainwrights within 50m:\n", all_near_wainwrights)


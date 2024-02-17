import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';
import './style/App.css';
// eslint-disable-next-line import/no-cycle
import Nav from './components/Nav';
// access key
mapboxgl.accessToken = 'pk.eyJ1IjoiZG9udGNvZGVtZSIsImEiOiJjbGdiYjBiaW4xNzhzM3BvNng1ZnV3N3RjIn0.rPcKW9uT3LvaOZ8vHItwzg';

// List of hike and hill datasets
const hikeCollections = [
  'Aira_Force',
  'Arthurs_Pike',
  'Aysgill_Force',
  'Birks_of_Aberfeldy',
  'Bleaberry_Fell',
  'Blencathra',
  'Branstree',
  'Cheviot_Sunrise',
  'Dodds_wood',
  'Hadrians_wall',
  'Hardraw_Force',
  'Hare_Law',
  'Haweswater',
  'Hellvelyn_from_west',
  'Helvellyn',
  'Hen_Holes',
  'High_Seat',
  'High_Street',
  'Ingleborough',
  'Kieldar_1',
  'Kieldar_2',
  'Legburthwaite_infinity_pool',
  'Lords_Seat',
  'Roseberry_Topping',
  'Sadgill',
  'Simon\'s_Seat',
  'Simons_Seat',
  'Simonside',
  'Skidaw',
  'Stargazing',
  'The_Cheviot_Circular',
  'Ulswater',
  'Whernside',
  'Windy_Gyle',
  'Winter_Crag',
];
const layerSources = [
  'birketts',
  'cheviot99',
  'corbetts',
  'hewitts',
  'marilyns',
  'munros',
  'nuttalls',
  'trail100s',
  'trigpoints',
  'wainwrights',
  'wales',
  'trigs',
];

const startPos = {
  Haweswater: [-2.82133, 54.48836],
};

function checkNameInProperties(geojsonData, location) {
  // Assuming geojsonData is the parsed GeoJSON object
  const feature = geojsonData.features[0].properties.names || geojsonData.features[1].properties.names || geojsonData.features[2].properties.names || [];

  if (feature.includes(location)) {
    console.log('TRUE');
    return true;
  }
  return false;
}

const generateHikeCollectionVisibility = (hikeCollections) => {
  const initialState = {};
  hikeCollections.forEach((hike) => {
    initialState[hike] = useState(true); // This sets up each hike with a visible state
  });
  return initialState;
};

function Hikes() {
  const hillCollectionVisiblity = {
    Trigs: useState(false),
    Wainwrights: useState(false),
    Munros: useState(false),
    Wales: useState(false),
    Marilyns: useState(false),
    Corbetts: useState(false),
    Nuttalls: useState(false),
    Hewitts: useState(false),
    Birketts: useState(false),
    Trail100s: useState(false),
    Cheviot99: useState(false),
  };
  const hikeCollectionVisiblity = generateHikeCollectionVisibility(hikeCollections);
  const { location } = useParams(); // used to get the location from url if specific hike shared
  console.log(location);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  // try to grab m

  // create map
  useEffect(() => {
    const initialMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-3.0886, 54.4609],
      zoom: 10,
      pitch: 60,
      bearing: 41,
      attributionControl: false,
    });

    initialMap.on('load', () => {
      initialMap.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      initialMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1 });

      layerSources.forEach((source) => {
        initialMap.addSource(`d-${source}`, { type: 'geojson', data: `../mapData/${source}.geojson` });
        initialMap.addLayer({
          id: source,
          type: 'circle',
          layout: { visibility: 'none' },
          source: `d-${source}`,
          paint: {
            'circle-radius': {
              base: 1.75,
              stops: [[12, 2], [22, 180]],
            },
            'circle-color': 'yellow',
          },
        });
      });
      hikeCollections.forEach((source) => {
        fetch(`../hikeData/${source}.js`).then((response) => response.json()).then((data) => {
          const match = checkNameInProperties(data, location);
          initialMap.addSource(`d-${source}`, { type: 'geojson', data: `../hikeData/${source}.js` });
          initialMap.addLayer({
            id: source,
            type: 'line',
            layout: {
              visibility: !location || location === source || match ? 'visible' : 'none',
            },
            source: `d-${source}`,
            paint: {
              'line-color': ['get', 'color'],
              'line-width': [
                'interpolate', ['linear'], ['zoom'],
                10, 2,
                20, 15,
              ],
            },
          });
        });
      });

      setMap(initialMap);
    });

    if (location) {
      initialMap.jumpTo({ center: startPos[location] });
    }

    hikeCollections.forEach((source) => {
      initialMap.on('click', source, async (e) => {
        console.log(e); // Inspect the event object
        const { geometry } = e.features[0];
        console.log(geometry); // Inspect the geometry object
        // let name = '';
        // if (e.features.length > 0) {
        //   name = e.features.at(-1).properties.name || 'No description available';
        // }

        // eslint-disable-next-line no-use-before-define
        let allCoordinates = [];
        switch (geometry.type) {
          case 'Point':
            allCoordinates = [geometry.coordinates]; // Wrap in array for consistency
            break;
          case 'LineString':
          case 'MultiPoint':
            allCoordinates = geometry.coordinates;
            break;
          case 'Polygon':
          case 'MultiLineString':
            allCoordinates = geometry.coordinates.flat(1);
            break;
          case 'MultiPolygon':
            allCoordinates = geometry.coordinates.flat(2);
            break;
          default:
            console.warn('Unknown geometry type:', geometry.type);
        }
        const altitudes = getAltitudes(allCoordinates, initialMap);
        const popupContent = document.createElement('div');
        popupContent.style.width = '300px';
        popupContent.style.height = '150px';

        const canvas = document.createElement('canvas');
        popupContent.appendChild(canvas);

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(popupContent)
          .addTo(initialMap);

        // Create chart
        // eslint-disable-next-line no-new
        new Chart(canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: altitudes.map((_, i) => i),
            datasets: [
              {
                label: 'Altitude',
                data: altitudes,
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  beginAtZero: true,
                  color: 'rgba(255, 255, 255, 0.7)',
                  // Adding 'm' unit to y-axis ticks
                  // eslint-disable-next-line no-unused-vars
                  callback(value, index, values) {
                    return `${value}m`;
                  },
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
              x: {
                display: false,
              },
            },
            plugins: {
              title: {
                display: true,
                text: `Hike elevation gain at ${source.replace(/_/g, ' ')}`,
                color: 'rgba(255, 255, 255, 1)', // Optional: Color of the title
              },
              // Hiding the key (legend)
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          },
        });
      });
    });

    return () => {
      initialMap.remove();
    };
  }, []);

  // Function to get altitudes for an array of coordinates
  function getAltitudes(coordinates, map_) {
    const altitudes = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const coordinate of coordinates) {
      const altitude = map_.queryTerrainElevation(coordinate);
      altitudes.push(altitude);
    }
    // eslint-disable-next-line no-use-before-define
    return altitudes;
  }

  function shrinkArray(arr) {
    const n = 1000;
    if (arr.length <= n) {
      return arr; // No need to squish if the array is already smaller or equal to n
    }

    const squishedArray = [];
    const ratio = Math.ceil(arr.length / n); // Calculate the ratio for squishing

    for (let i = 0; i < arr.length; i += ratio) {
      const chunk = arr.slice(i, i + ratio); // Get a chunk of the original array
      const average = chunk.reduce((sum, num) => sum + num, 0) / chunk.length;
      // Calculate the average of the chunk
      squishedArray.push(average); // Push the average value to the squished array
    }

    return squishedArray;
  }

  // Usage

  const toggleLayerVisibility = (layer) => {
    if (map) {
      const visibility = map.getLayoutProperty(layer, 'visibility');
      setMap((prevMap) => {
        prevMap.setLayoutProperty(layer, 'visibility', visibility === 'visible' ? 'none' : 'visible');
        return prevMap;
      });
    }
  };

  const toggleAllHikesVisibility = (isVisible) => {
    if (map) {
      const visibility = isVisible ? 'visible' : 'none';
      Object.entries(hikeCollectionVisiblity).forEach(([layer, [_, setter]]) => {
        map.setLayoutProperty(layer, 'visibility', visibility);
        setter(isVisible);
      });
    }
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
  };

  const [menuVisibleHikes, setMenuVisibleHikes] = useState(false);
  const toggleMenuHikes = () => {
    setMenuVisibleHikes((prevMenuVisible) => !prevMenuVisible);
  };

  return (
    <>
      <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css" rel="stylesheet" />
      <Nav background />
      <div
        ref={mapContainer}
        style={{
          width: '100vw', height: '100vh', overflow: 'hidden',
        }}
      />
      <button
        type="button"
        onClick={toggleMenu}
        style={{
          margin: '10px',
          zIndex: 1,
          position: 'absolute',
          bottom: '20px',
          left: '0px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          textDecoration: 'none',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        {' '}
        {menuVisible ? 'Hide Menu' : 'Show Menu'}
      </button>

      <button
        type="button"
        onClick={toggleMenuHikes}
        style={{
          margin: '10px',
          zIndex: 1,
          position: 'absolute',
          bottom: '20px',
          left: '150px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          textDecoration: 'none',
          padding: '5px',
          borderRadius: '5px',
        }}
      >

        {menuVisibleHikes ? 'Hide Hikes' : 'Show Hikes'}
      </button>
      {menuVisible && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1,
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            bottom: '60px',
            left: '10px',
            borderRadius: '5px',
          }}
        >
          {Object.entries(hillCollectionVisiblity).map(([layer, [visible, setVisible]]) => (
            <button
              type="button"
              onClick={() => {
                setVisible((prevVisible) => !prevVisible);
                toggleLayerVisibility(layer.toLowerCase());
              }}
              key={layer}
              style={{
                display: 'block',
                marginBottom: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              {visible ? `Hide ${layer}` : `Show ${layer}`}
            </button>

          ))}

        </div>
      )}

      {menuVisibleHikes && (
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '10px',
          bottom: '60px',
          left: '160px',
          borderRadius: '5px',
          overflow: 'scroll',
          height: '400px',
        }}
      >
        <button
          type="button"
          onClick={() => {
            toggleAllHikesVisibility(false);
          }}
          style={{
            display: 'block',
            marginBottom: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Hide All
        </button>
        <button
          type="button"
          onClick={() => {
            toggleAllHikesVisibility(true);
          }}
          style={{
            display: 'block',
            marginBottom: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Show All
        </button>
        {Object.entries(hikeCollectionVisiblity).map(([layer, [visible, setVisible]]) => (
          <button
            type="button"
            onClick={() => {
              setVisible((prevVisible) => !prevVisible);
              toggleLayerVisibility(layer);
            }}
            key={layer.replace(/_/g, ' ')}
            style={{
              display: 'block',
              marginBottom: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'white',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {!visible ? (location ? `Hide ${layer.replace(/_/g, ' ')}` : `Show ${layer.replace(/_/g, ' ')}`) : (location ? `Show ${layer.replace(/_/g, ' ')}` : `Hide ${layer.replace(/_/g, ' ')}`) }
          </button>

        ))}

      </div>
      )}

      <div style={{
        position: 'absolute',
        zIndex: 1,
        background: 'rgba(0, 0, 0, 0.5)',
        bottom: '5px',
        color: 'white',
        right: '20px',
        borderRadius: '5px',
        fontSize: '15px',
        textDecoration: 'none',
      }}
      >
        ©
        {'   '}
        <a
          href="https://www.mapbox.com/about/maps/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Mapbox

        </a>
        {'   '}
        ©
        {'   '}
        <a
          href="http://www.openstreetmap.org/copyright"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          OpenStreetMap

        </a>
        {'   '}
        <a
          href="https://www.mapbox.com/map-feedback/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Improve this map

        </a>
      </div>
    </>
  );
}

export default Hikes;

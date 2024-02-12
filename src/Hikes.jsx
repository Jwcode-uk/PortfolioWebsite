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
  'Arthurs_Pike',
  'Blencathra',
  'Cheviot_Sunrise',
  'Dodds_wood',
  'Haweswater',
  'Helvellyn',
  'Legburthwaite_infinity_pool',
  'Whernside',
  'Ulswater',
  'Hadrians_wall',
  'Simonside',
  'Aysgill_Force',
  'Hardraw_Force',
  'Roseberry_Topping',
  'Ingleborough',
  'Sadgill',
  'High_Street',
  'Branstree',
  'Skidaw',
  'Birk_of_Aberfeldy',
  'The_Cheviot_Circular',
  'Lords_Seat',
  'Winter_Crag',
  'Windy_Gyle',
  'Hare_Law',
  'Hen_Holes',
  'Kieldar_1',
  'Kieldar_2',
  'Stargazing',
  'Aira_force', 'High_Seat', 'Simons_Seat', 'Bleaberry_Fell', 'Hellvelyn_from_west'
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
  const hikeCollectionVisiblity = {
    Arthurs_Pike: useState(true),
    Blencathra: useState(true),
    Cheviot_Sunrise: useState(true),
    Dodds_wood: useState(true),
    Haweswater: useState(true),
    Helvellyn: useState(true),
    Legburthwaite_infinity_pool: useState(true),
    Whernside: useState(true),
    Ulswater: useState(true),
    Hadrians_wall: useState(true),
    Simonside: useState(true),
    Aysgill_Force: useState(true),
    Hardraw_Force: useState(true),
    Ingleborough: useState(true),
    Roseberry_Topping: useState(true),
    Lords_Seat: useState(true),
    Winter_Crag: useState(true),
    Windy_Gyle: useState(true),
    Hare_Law: useState(true),
    Hen_Holes: useState(true),
    Kieldar_1: useState(true),
    Kieldar_2: useState(true),
    Stargazing: useState(true),
    Aira_force: useState(true),
    High_Seat: useState(true),
    Simons_Seat: useState(true),
    Bleaberry_Fell: useState(true),
    Hellvelyn_from_west: useState(true)
  };
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
        fetch(`../hikeData/${source}.js`).then(response => response.json()).then(data => {
          const matches = data.features.some(feature =>  feature.properties.names && feature.properties.names.includes(location)
          );

        initialMap.addSource(`d-${source}`, { type: 'geojson', data: `../hikeData/${source}.js` });
        initialMap.addLayer({
          id: source,
          type: 'line',
          layout: {
            visibility: !location || location === source || matches ? 'visible' : 'none',
          },
          source: `d-${source}`,
          paint: {
            'line-color': ["get","color"],
            'line-width': 4,
          },
        });});
      });

      setMap(initialMap);
    });

    if (location) {
      initialMap.jumpTo({ center: startPos[location] });
    }

    hikeCollections.forEach((source) => {
      initialMap.on('click', source, async (e) => {
        const { geometry } = e.features[0];
        // let name = '';
        // if (e.features.length > 0) {
        //   name = e.features.at(-1).properties.name || 'No description available';
        // }

        // eslint-disable-next-line no-use-before-define
        const altitudes = getAltitudes(geometry.coordinates, initialMap);
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
            // Adding a title to the chart
              // title: {
              //   display: true,
              //   text: name,
              //   color: 'rgba(255, 255, 255, 1)', // Optional: Color of the title
              // },
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
    return shrinkArray(altitudes);
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
          left: '10px',
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
          left: '150px',
          borderRadius: '5px',
        }}
      >
        {Object.entries(hikeCollectionVisiblity).map(([layer, [visible, setVisible]]) => (
          <button
            type="button"
            onClick={() => {
              setVisible((prevVisible) => !prevVisible);
              toggleLayerVisibility(layer);
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
            {!visible ? (location ? `Hide ${layer}` : `Show ${layer}`) : (location ? `Show ${layer}` : `Hide ${layer}`) }
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

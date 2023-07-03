import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved, no-unused-vars
import mapboxgl, { Popup } from '!mapbox-gl';
import './style/App.css';
// eslint-disable-next-line import/no-cycle
import Nav from './components/Nav';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9udGNvZGVtZSIsImEiOiJjbGdiYjBiaW4xNzhzM3BvNng1ZnV3N3RjIn0.rPcKW9uT3LvaOZ8vHItwzg';

function Hikes() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    const initialMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-3.0886, 54.4609],
      zoom: 10,
      pitch: 80,
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
      initialMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1.25 });

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
        'wales', 'osTrigs',
      ];

      layerSources.forEach((source) => {
        initialMap.addSource(`d-${source}`, { type: 'geojson', data: `./mapData/${source}.geojson` });
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

      initialMap.addSource('hike', {
        type: 'geojson',
        data: './map.geojson',
      });

      initialMap.addLayer({
        id: 'my-layer2',
        type: 'line',
        source: 'hike',
        paint: {
          'line-color': 'red',
          'line-width': 4,
        },
      });

      setMap(initialMap);
    });

    initialMap.on('click', 'my-layer2', async (e) => {
      // Extract the description property from the GeoJSON feature
      // let description = '';
      // if (e.features.length > 0) {
      // description = e.features[0].properties.description || 'No description available';
      // }
      const { geometry } = e.features[0];
      console.log(geometry);
      let description = '';
      if (e.features.length > 0) {
        description = e.features[0].properties.description || 'No description available';
      }

      // eslint-disable-next-line no-use-before-define
      const altitudes = getAltitudes(geometry.coordinates, initialMap);
      console.log(altitudes);
      // Create a container for the chart
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
              lineTension: 0.97,
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
            title: {
              display: true,
              text: description,
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

    return () => {
      initialMap.remove();
    };
  }, []);

  // Function to get altitudes for an array of coordinates
  function getAltitudes(coordinates, map_) {
    const altitudes = [];
    console.log(coordinates);

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

  const layerVisibilityState = {
    OSTrigs: useState(false),
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

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
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
        {menuVisible ? 'Hide Menu' : 'Show Menu'}
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
          {Object.entries(layerVisibilityState).map(([layer, [visible, setVisible]]) => (
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

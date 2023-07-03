import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
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
        'wales', 'ostrigs',
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
        paint: { 'line-color': 'red', 'line-width': 2 },
      });

      setMap(initialMap);
    });

    return () => {
      initialMap.remove();
    };
  }, []);

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
        color: 'white',
        bottom: '35px',
        left: '110px',
        borderRadius: '5px',
        fontSize: '12px',

      }}
      >
        <a href="http://mapbox.com/about/maps" className="mapbox-logo" target="_blank" rel="noreferrer"> </a>
      </div>
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

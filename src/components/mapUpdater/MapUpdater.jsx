import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

function MapUpdater({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, map.getZoom(), {
      animate: true,
    });
  }, [coords, map]);

  return null;
}

export default MapUpdater
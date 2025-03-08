import { FeatureCollection } from 'geojson';
import { LatLngExpression } from 'leaflet';
import { useCallback, useState } from 'react';

import { PointFeature } from './types';

export const useSearchNearby = () => {
  const [results, setResults] = useState<PointFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [latLng, setLatLng] = useState<LatLngExpression | null>(null);

  const findNearby = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setLatLng({ lat: lat, lng: lon });
      const url = new URL('/api/places', document.baseURI);
      url.searchParams.set('lat', lat.toString());
      url.searchParams.set('lon', lon.toString());

      const apiResponse = await fetch(url.toString());
      const data: FeatureCollection = await apiResponse.json();
      setResults(data.features as PointFeature[]);
      setLoading(false);
    } catch (error) {
      setResults([]);
      setLoading(false);
      setLatLng(null);
      console.error(error);
    }
  }, []);

  return { results, loading, latLng, findNearby };
};

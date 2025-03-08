import { FeatureCollection } from 'geojson';
import { useCallback, useState } from 'react';
import { PointFeature } from './types';

export const useSearchNearby = () => {
  const [results, setResults] = useState<PointFeature[]>([]);

  const findNearby = useCallback(async (lat: number, lon: number) => {
    try {
      const url = new URL('/api/places', document.baseURI);
      url.searchParams.set('lat', lat.toString());
      url.searchParams.set('lon', lon.toString());

      const apiResponse = await fetch(url.toString());
      const data: FeatureCollection = await apiResponse.json();
      setResults(data.features as PointFeature[]);
    } catch (error) {
      setResults([]);
      console.error(error);
    }
  }, []);

  return { results, findNearby };
};

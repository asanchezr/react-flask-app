import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { MapContainer, ScaleControl, TileLayer } from 'react-leaflet';

import { FeatureCollection } from 'geojson';
import { FeatureMarker } from './FeatureMarker';
import { PointFeature } from './types';

const victoriaBC = [48.4231, -123.3661];

export const MapView: React.FC<unknown> = () => {
  const [results, setResults] = useState<PointFeature[]>([]);

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    try {
      const url = new URL('/api/places', document.baseURI);
      url.searchParams.set('lat', lat.toString());
      url.searchParams.set('lon', lon.toString());

      const apiResponse = await fetch(url.toString());
      const data: FeatureCollection = await apiResponse.json();
      setResults(data.features as PointFeature[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNearbyPlaces(victoriaBC[0], victoriaBC[1]);
  }, []);

  return (
    <div className="w-screen h-screen grid relative p-0">
      <MapContainer
        center={[48.4231, -123.3661]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <ScaleControl metric={true} imperial={false}></ScaleControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results.map((feature) => (
          <FeatureMarker key={nanoid()} feature={feature}></FeatureMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

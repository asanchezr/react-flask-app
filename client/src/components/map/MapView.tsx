import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { Circle, MapContainer, ScaleControl, TileLayer } from 'react-leaflet';

import { exists } from '@/utils/utils';
import { LeafletMouseEvent } from 'leaflet';
import { FeatureMarker } from './FeatureMarker';
import { useSearchNearby } from './hooks';
import { MapEvents } from './MapEvents';

const victoriaBC = [48.4231, -123.3661];

export const MapView: React.FC<unknown> = () => {
  const { results, loading, latLng, findNearby } = useSearchNearby();

  // get new results whenever the user clicks the map
  const handleMapClick = (event: LeafletMouseEvent) => {
    findNearby(event.latlng.lat, event.latlng.lng);
  };

  useEffect(() => {
    findNearby(victoriaBC[0], victoriaBC[1]);
  }, [findNearby]);

  return (
    <div className="w-screen h-screen grid relative p-0">
      <MapContainer
        center={[48.4231, -123.3661]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <MapEvents click={(e) => handleMapClick(e)} />
        <ScaleControl metric={true} imperial={false}></ScaleControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results.map((feature) => (
          <FeatureMarker key={nanoid()} feature={feature}></FeatureMarker>
        ))}
        {loading && exists(latLng) && (
          <Circle
            center={latLng}
            pathOptions={{ fillColor: 'blue' }}
            radius={500}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;

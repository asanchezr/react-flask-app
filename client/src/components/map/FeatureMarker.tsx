import { LatLngLiteral } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import { exists } from '@/utils/utils';
import { PlaceFeature_Properties, PointFeature } from './types';

export interface IFeatureMarkerProps {
  feature: PointFeature<PlaceFeature_Properties>;
}

export const FeatureMarker: React.FC<IFeatureMarkerProps> = ({ feature }) => {
  const [longitude, latitude] = feature.geometry.coordinates;
  const latLng: LatLngLiteral = { lat: latitude, lng: longitude };

  return (
    <Marker position={latLng}>
      <Popup>
        <div className="p-1">
          <div className="columns-2 mt-1">
            <div className="w-16">Name</div>
            <div className="w-auto">
              {feature.properties.brand ?? feature.properties.name ?? 'N/A'}
            </div>
          </div>
          {exists(feature.properties.website) && (
            <div className="columns-2  mt-1">
              <div className="w-16">Website</div>
              <div className="w-auto">
                <a
                  href={feature.properties.website ?? '#'}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Link
                </a>
              </div>
            </div>
          )}
          <div className="columns-2  mt-1">
            <div className="w-16">Phone</div>
            <div className="w-auto">{feature.properties.phone ?? '-'}</div>
          </div>
          {feature.properties.takeaway &&
          feature.properties.takeaway === 'yes' ? (
            <div className="columns-2  mt-1">
              <div className="w-16">Takeout</div>
              <div className="w-auto">{feature.properties.takeaway}</div>
            </div>
          ) : null}
        </div>
      </Popup>
    </Marker>
  );
};

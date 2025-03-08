import { Feature, Point } from 'geojson';

export type PointFeature<P = PlaceFeature_Properties> = Feature<Point, P>;

export interface PlaceFeature_Properties {
  readonly amenity: string;
  readonly brand?: string;
  readonly name?: string;
  readonly website?: string;
  readonly phone?: string;
  readonly takeaway?: string;
}

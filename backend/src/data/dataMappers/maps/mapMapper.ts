import { maps } from './mapsData';
import type { MapI } from '../../../models/map/map';
import { NotFoundError, InternalServerError } from '../../../models/error';

export const mapMapper = {
  async readMaps(): Promise<MapI[]> {
    // to be edited with await and DB call
    if (maps.length >= 1) {
      return maps;
    } else {
      throw new InternalServerError('No Maps found');
    }
  },

  async readWithSlug(slug: string): Promise<MapI> {
    // to be edited with await and DB call
    const mapWithSlug = maps.find((map) => map.slug === slug);
    if (mapWithSlug) {
      return mapWithSlug;
    } else {
      throw new NotFoundError(`Map with slug: ${slug} not found`);
    }
  },

  async readWithType(type: string): Promise<MapI[]> {
    // to be edited with await and DB call
    const mapsWithType = maps.filter((map) => map.type === type);
    if (mapsWithType.length >= 1) {
      return mapsWithType;
    } else {
      throw new NotFoundError(`Maps with type: ${type} not found`);
    }
  },
};

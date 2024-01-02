import { mapTypes } from './mapTypesData';
import type { MapTypeI } from '../../../models/map/mapType';
import { InternalServerError } from '../../../models/error';

export const mapTypeMapper = {
  async readMapTypes(): Promise<MapTypeI[]> {
    // to be edited with await and DB call
    if (mapTypes.length >= 1) {
      return mapTypes;
    } else {
      throw new InternalServerError('No MapType found');
    }
  },
};

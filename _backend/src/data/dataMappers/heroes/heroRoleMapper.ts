import { heroRoles } from './heroRolesData';
import type { HeroRoleI } from '../../../models/hero/heroRole';
import { InternalServerError } from '../../../models/error';

export const heroRoleMapper = {
  async readHeroRoles(): Promise<HeroRoleI[]> {
    // to be edited with await and DB call
    if (heroRoles.length >= 1) {
      return heroRoles;
    } else {
      throw new InternalServerError('No HeroRole found');
    }
  },
};

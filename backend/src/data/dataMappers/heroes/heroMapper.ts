import { heroes } from './heroesData';
import type { HeroI } from '../../../models/hero/hero';
import { NotFoundError, InternalServerError } from '../../../models/error';

export const heroMapper = {
  async readHeroes(): Promise<HeroI[]> {
    // to be edited with await and DB call
    if (heroes.length >= 1) {
      return heroes;
    } else {
      throw new InternalServerError('No Heroes found');
    }
  },

  async readWithSlug(slug: string): Promise<HeroI> {
    // to be edited with await and DB call
    const heroWithSlug = heroes.find((hero) => hero.slug === slug);
    if (heroWithSlug) {
      return heroWithSlug;
    } else {
      throw new NotFoundError(`Hero with slug: ${slug} not found`);
    }
  },

  async readWithRole(role: string): Promise<HeroI[]> {
    // to be edited with await and DB call
    const heoesWithRole = heroes.filter((hero) => hero.role === role);
    if (heoesWithRole.length >= 1) {
      return heoesWithRole;
    } else {
      throw new NotFoundError(`Heroes with role: ${role} not found`);
    }
  },
};

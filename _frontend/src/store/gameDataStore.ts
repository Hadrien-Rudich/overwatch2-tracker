import { create } from 'zustand';
import type { GameDataStore } from '../types/store/gameDataTypes';

export const gameDataStore = create<GameDataStore>()((set) => ({
  heroesData: [],
  rolesData: [],
  mapsData: [],
  mapTypesData: [],
  addHeroesData: (heroes) => set(() => ({ heroesData: heroes })),
  addMapsData: (maps) => set(() => ({ mapsData: maps })),
  addMapTypesData: (types) => set(() => ({ mapTypesData: types })),
  addRolesData: (roles) => set(() => ({ rolesData: roles })),
}));

export default gameDataStore;

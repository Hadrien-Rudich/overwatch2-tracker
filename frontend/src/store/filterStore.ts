import { create } from 'zustand';
import type { FilterStore } from '../types/store/filterTypes';

export const filterStore = create<FilterStore>()((set) => ({
  isFilteringGames: false,
  setIsFilteringGames: (boolean) => set(() => ({ isFilteringGames: boolean })),
  clearIsFilteringGames: () => set(() => ({ isFilteringGames: false })),

  filterDropDown: false,
  setFilterDropDown: (boolean) => set(() => ({ filterDropDown: boolean })),

  expandedFilter: '',
  setExpandedFilter: (filterName: string) =>
    set(() => ({ expandedFilter: filterName })),
  clearExpandedFilter: () => set(() => ({ expandedFilter: '' })),

  displayedFilter: '',
  setDisplayedFilter: (filterName) =>
    set(() => ({ displayedFilter: filterName })),
  clearDisplayedFilter: () => set(() => ({ displayedFilter: '' })),

  filteredHeroes: [],
  filterHero: (hero: string) =>
    set((state) => ({
      filteredHeroes: [...state.filteredHeroes, hero],
    })),
  unfilterHero: (hero: string) =>
    set((state) => ({
      filteredHeroes: state.filteredHeroes.filter((h: string) => h !== hero),
    })),
  clearFilteredHeroes: () => set(() => ({ filteredHeroes: [] })),

  filteredHeroRoles: [],
  filterHeroRole: (heroRole: string) =>
    set((state) => ({
      filteredHeroRoles: [...state.filteredHeroRoles, heroRole],
    })),
  unfilterHeroRole: (heroRole: string) =>
    set((state) => ({
      filteredHeroRoles: state.filteredHeroRoles.filter(
        (hr: string) => hr !== heroRole
      ),
    })),
  clearFilteredHeroRole: () => set(() => ({ filteredHeroRoles: [] })),

  filteredMapTypes: [],
  filterMapType: (mapType: string) =>
    set((state) => ({
      filteredMapTypes: [...state.filteredMapTypes, mapType],
    })),
  unfilterMapType: (mapType: string) =>
    set((state) => ({
      filteredMapTypes: state.filteredMapTypes.filter(
        (m: string) => m !== mapType
      ),
    })),

  clearFilteredMapTypes: () => set(() => ({ filteredMapTypes: [] })),

  filteredMaps: [],
  filterMap: (map: string) =>
    set((state) => ({
      filteredMaps: [...state.filteredMaps, map],
    })),
  unfilterMap: (map: string) =>
    set((state) => ({
      filteredMaps: state.filteredMaps.filter((m: string) => m !== map),
    })),

  clearFilteredMaps: () => set(() => ({ filteredMaps: [] })),

  filteredResults: [],
  filterResult: (result: string) =>
    set((state) => ({
      filteredResults: [...state.filteredResults, result],
    })),
  unfilterResult: (result: string) =>
    set((state) => ({
      filteredResults: state.filteredResults.filter(
        (r: string) => r !== result
      ),
    })),
  clearFilteredResults: () => set(() => ({ filteredResults: [] })),

  filteredDates: [],
}));

export default filterStore;

interface HeroData {
  id: number;
  label: string;
  slug: string;
  role: string;
  imageUrl: string;
}

interface MapData {
  id: number;
  label: string;
  slug: string;
  type: string;
  imageUrl: string;
}

interface MapTypeData {
  id: number;
  label: string;
  imageUrl: string;
}

interface RoleData {
  id: number;
  label: string;
  imageUrl: string;
}

interface GameDataStore {
  heroesData: HeroData[] | [];
  addHeroesData: (heroes: HeroData[]) => void;
  mapsData: MapData[] | [];
  addMapsData: (maps: MapData[]) => void;
  mapTypesData: MapTypeData[] | [];
  addMapTypesData: (mapTypes: MapTypeData[]) => void;
  rolesData: RoleData[] | [];
  addRolesData: (roles: RoleData[]) => void;
}

export type { HeroData, MapData, MapTypeData, RoleData, GameDataStore };

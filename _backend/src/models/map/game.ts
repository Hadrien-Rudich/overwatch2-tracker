export namespace Game {
  export interface Base {
    id: number;
    userId: number;
    profileId: number;
    result: string;
    map: string;
    mapType: string;
    mapImageUrl: string;
    heroes: string[];
    heroesImageUrl: string[];
    date: string;
  }

  export interface New {
    userId: number;
    profileId: number;
    result: string;
    map: string;
    mapType: string;
    mapImageUrl: string;
    heroes: string[];
    heroesImageUrl: string[];
    date: string;
  }

  export interface Update {
    id?: number;
    userId?: number;
    profileId?: number;
    result?: string;
    map?: string;
    mapType?: string;
    mapImageUrl?: string;
    heroes?: string[];
    heroesImageUrl?: string[];
    date?: string;
  }
}

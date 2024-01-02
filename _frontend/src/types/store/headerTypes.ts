interface Location {
  label: string;
  url: string;
}

interface HeaderStore {
  locations: Location[];
}

export type { HeaderStore, Location };

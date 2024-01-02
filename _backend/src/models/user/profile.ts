export namespace Profile {
  export interface Base {
    id: number;
    userId: number;
    label: string;
  }
  export interface New {
    label: string;
  }

  export interface Update {
    label: string;
  }
}

export enum PLATE_FORM {
  PS3 = "PS3",
  PS4 = "PS4",
  PS5 = "PS5",
  VITA = "VITA",
}

export enum TYPE {
  MAINLINE = "mainline",
  SPIN_OFF = "spin-off",
  UNOFFICIAL = "unofficial",
  DLC = "dlc",
}

export interface ITitle {
  id: string;
  title: string;
  plate_forms: PLATE_FORM[];
  type: TYPE;
  logo: string;
  unreleased?: boolean;
}

export interface IBadge {
  id: string;
  title: string;
  logo: string;
  gameIds?: string[];
  gameTypes?: TYPE[];
  unsupported?: boolean;
  nbrRequired?: number;
}

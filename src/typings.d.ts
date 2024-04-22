import { User } from "firebase/auth";

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
  XIV_PS5_DLC = "xiv-ps5-dlc",
  SPECIAL_BADGE = "special-badge",
}

export interface ITitle {
  id: string;
  title: string;
  plate_forms?: PLATE_FORM[];
  type: TYPE;
  logo: string;
  unreleased?: boolean;
}

export interface IBadge {
  id: string;
  title: string;
  logo: string;
  gameIds?: (string | string[])[];
  gameTypes?: TYPE[];
  nbrRequired?: number;
}

export interface IContext {
  profileIdToLoad: String | null;
  readOnly: boolean;
  authenticating: boolean;
  updateAuthenticating: Function;
  loaded: boolean;
  updateLoaded: Function;
  loggedUser: User | null;
}

export interface IProfile {
  username: String;
}

export interface IFeature {
  name: String;
  enabled: boolean;
}


export interface HousingStats {
  socialHousingRate: number;
  targetRate: number;
  deficit: boolean;
  exempt?: boolean; // Commune exonérée (Oui/Non)
}

export interface Zoning {
  accession: string;
  rental: string; // bailleur (1, 2, 3)
}

export interface SubsidyRow {
  type: string;
  amount: string;
  condition: string;
}

export interface MarginRow {
  type: string;
  product: string;
  margin: string;
}

export interface RentRow {
  type: string;
  product: string;
  maxRent: string;
  condition?: string;
}

// Structures pour les modes de répartition (nouveau tableau)
export interface DistributionData {
  ro?: string; // Répartition RO
  dc?: string; // Répartition DC
  commentRoDc?: string;
  plaiPlus?: string; // Répartition Sociale
  plai?: string;
  plaiAdapte?: string;
  plus?: string;
  pls?: string;
  t2?: string; // Typologie
  t5?: string;
  remarks?: string;
}

export interface ReferenceData {
  id: string; // 'ddtm' or 'mel'
  name: string;
  lastUpdated: string;
  subsidiesState: SubsidyRow[];
  subsidiesEPCI?: SubsidyRow[]; // Optional, specific to MEL
  subsidiesNPNRU: SubsidyRow[];
  subsidiesCD: SubsidyRow[];
  margins?: MarginRow[]; // Optional, might be absent in MEL
  hasMargins: boolean; // Flag to show "Absence de marges"
  accessoryRents?: RentRow[];
  hasRents: boolean; // Flag to show "Absence de loyers"
  footnotes: string[];
  
  // Nouveau champ pour le tableau de répartition
  distribution?: DistributionData;
  communeSpecifics?: {
    [communeName: string]: DistributionData;
  };
}

export interface Source {
  title: string;
  uri: string;
}

export interface CommuneData {
  name: string;
  population: number;
  epci: string;
  stats: HousingStats;
  zoning: Zoning;
  directionTerritoriale?: string; // Nouvelle donnée
  sources?: Source[];
  lastUpdated?: string;
}

export interface Subsidy {
  housingType: string;
  description: string;
  amountEstimate: string;
  localAid: string;
  eligibility: string;
}

export enum ViewState {
  HOME,
  LOADING, // Initial loading if needed, or searching
  RESULT,
  ERROR
}

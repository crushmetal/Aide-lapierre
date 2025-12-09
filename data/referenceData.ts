import { ReferenceData } from '../types';

const STORAGE_KEY = 'nord_habitat_data_v1';

// Données par défaut (Hardcoded)
const DEFAULT_DATA: Record<string, ReferenceData> = {
  'ddtm': {
    id: 'ddtm',
    name: 'DDTM 59 (Défaut)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: true,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "5%" },
      { type: "Bbio-20%", product: "PLUS", margin: "7%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "5%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "7%" },
      { type: "Passif", product: "PLUS", margin: "7%" },
      { type: "Energie positive", product: "PLUS", margin: "7%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "0%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "formule" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "formule" },
      { type: "Zone 3 - Si certificat norme EN 17065", product: "PLUS", margin: "8%" },
      { type: "BBC rénovation 2024 1ère étape", product: "PLAI / PLUS", margin: "4%" },
      { type: "BBC rénovation 2024", product: "PLAI / PLUS", margin: "7%" },
      { type: "Récupération eaux de pluie/grises (a)(b)", product: "PLUS", margin: "3%" },
    ],
    hasRents: true,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "0 €" },
      { type: "Garage", product: "PLUS / PLS", maxRent: "32 €" },
      { type: "Carport", product: "PLAI", maxRent: "0 €" },
      { type: "Carport", product: "PLUS / PLS", maxRent: "25 €" },
      { type: "Stationnement", product: "PLAI", maxRent: "0 €" },
      { type: "Stationnement", product: "PLUS / PLS", maxRent: "16 €" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA, les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d'une contribution financière d'au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique",
      "(b) Utilisation des eaux de pluies et/ou eaux grises pour un usage interne au logement"
    ]
  },
  'mel': {
    id: 'mel',
    name: 'Métropole Européenne de Lille (MEL)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun et AA", amount: "9 130 €/lgt", condition: "Si AA, peut se cumuler avec Super et Mega Bonus" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Résidences sociales", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
      { type: "PLAI Octave", amount: "9 130 €/lgt", condition: "Ne se cumul pas avec d'autres aides de l'Etat" },
      { type: "PLAI Gens du voyage", amount: "9 130 €/lgt", condition: "Ne se cumul pas avec d'autres aides de l'Etat" },
    ],
    subsidiesEPCI: [
      { type: "PLAI", amount: "15 000 €/lgt", condition: "" },
      { type: "PLAI (Petite opération)", amount: "26 000 €/lgt", condition: "Opération de moins de 10 logements" },
      { type: "PLAI AA", amount: "26 000 €/lgt", condition: "" },
      { type: "PLAI structure < 50 lgts", amount: "15 000 €/lgt", condition: "" },
      { type: "PLAI structure > 50 lgts", amount: "12 000 €/lgt", condition: "" },
      { type: "PLAI Octave", amount: "7 500 €/lgt", condition: "Cumulable avec les aides de l'Etat" },
      { type: "PLAI Octave - CARSAT", amount: "+ 3 500 €/lgt", condition: "En plus de l'aide PLAI Octave de la MEL" },
      { type: "PLAI Gens du voyage", amount: "15 000 € + 30 000 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Cumulable sauf PLAI Octaves" },
      { type: "PLAI Adapté Octave", amount: "8 980 €/lgt", condition: "Uniquement pour les PLAI Octaves" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: false,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "0%" },
      { type: "Bbio-20%", product: "PLUS", margin: "0%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "0%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "0%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "0%" },
      { type: "Logt ind", product: "PLUS", margin: "0%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLUS", margin: "0%" },
      { type: "Lgt coll traversant ou double orientation", product: "PLUS", margin: "0%" },
      { type: "Balcon, loggia ou terrasse > 6m2", product: "PLUS", margin: "0%" },
      { type: "Secteur ABF", product: "PLUS", margin: "0%" },
      { type: "Secteur ABF (si contraintes ABF)", product: "PLAI", margin: "0%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "0%" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "0%" },
      { type: "Zone 3 - Si certificat norme EN 17065 par COFRAC", product: "PLUS", margin: "0%" },
    ],
    hasRents: false,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "32 €", condition: "" },
      { type: "Garage", product: "PLS", maxRent: "32 €", condition: "" },
      { type: "Carport", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Carport", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Carport", product: "PLS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "16 €", condition: "" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique"
    ]
  },
  'caph': {
    id: 'caph',
    name: 'Communauté d\'Agglomération de la Porte du Hainaut (CAPH)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
    ],
    subsidiesEPCI: [
      { type: "PLAI", amount: "3 000 €/lgt", condition: "Zone U" },
      { type: "PLAI (Passif)", amount: "+ 3 000 €/lgt", condition: "Logement passif" },
      { type: "PLAI (Collectif)", amount: "+ 1 000 €/lgt", condition: "T2 collectif pour 40% de l'opération" },
      { type: "PLAI (Vertueux)", amount: "+ 1 500 €/lgt", condition: "Projet vertueux" },
      { type: "PLAI (Cuve)", amount: "+ 500 €/cuve", condition: "Cuve récup eaux pluies (40% max)" },
      { type: "PLUS", amount: "1 000 €/lgt", condition: "Zone U" },
      { type: "PLUS (Passif)", amount: "+ 3 000 €/lgt", condition: "Logement passif" },
      { type: "PLUS (Collectif)", amount: "+ 1 000 €/lgt", condition: "T2 collectif pour 40% de l'opération" },
      { type: "PLUS (Vertueux)", amount: "+ 1 500 €/lgt", condition: "Projet vertueux" },
      { type: "PLUS (Cuve)", amount: "+ 500 €/cuve", condition: "Cuve récup eaux pluies (40% max)" },
      { type: "PLS", amount: "0 €/lgt", condition: "Zone U" },
      { type: "PLS (Passif)", amount: "+ 1 000 €/lgt", condition: "Logement passif" },
      { type: "PLS (Collectif)", amount: "+ 1 000 €/lgt", condition: "T2 collectif pour 40% de l'opération" },
      { type: "PLS (Vertueux)", amount: "+ 1 500 €/lgt", condition: "Projet vertueux" },
      { type: "PLS (Cuve)", amount: "+ 500 €/cuve", condition: "Cuve récup eaux pluies (40% max)" },
      { type: "PLAI AA", amount: "5 000 €/lgts", condition: "Maximum 25 000 €/opération" },
      { type: "PLUS AA", amount: "+ 1 500 €/lgt", condition: "Projet vertueux" },
      { type: "PLS AA", amount: "+ 500 €/cuve", condition: "Cuve récup eaux pluies (40% max)" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: false,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Bbio-5%", product: "PLUS", margin: "0%" },
      { type: "Cepnr et Cep -5%", product: "PLUS", margin: "0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "0%" },
      { type: "Bbio-20%", product: "PLUS", margin: "0%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "0%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "0%" },
      { type: "Cep -20% et Cepnr-10%", product: "PLUS", margin: "0%" },
      { type: "Passif", product: "PLUS", margin: "0%" },
      { type: "Energie positive", product: "PLUS", margin: "0%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "0%" },
      { type: "Contexte local Zone 3 si RT>RT2012-10%", product: "PLUS", margin: "0%" },
      { type: "Logt ind", product: "PLUS", margin: "0%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLUS", margin: "0%" },
      { type: "Lgt coll traversant ou double orientation", product: "PLUS", margin: "0%" },
      { type: "Balcon, loggia ou terrasse > 6m2", product: "PLUS", margin: "0%" },
      { type: "Secteur ABF", product: "PLUS", margin: "0%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "0%" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "0%" },
      { type: "Zone 3 - Si certificat norme EN 17065", product: "PLUS", margin: "0%" },
      { type: "BBC rénovation 2024 1ère étape", product: "PLAI", margin: "0%" },
      { type: "BBC rénovation 2024", product: "PLUS", margin: "0%" },
    ],
    hasRents: false,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "15 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "32 €", condition: "" },
      { type: "Garage", product: "PLS", maxRent: "38 €", condition: "" },
      { type: "Carport", product: "PLAI", maxRent: "10 €", condition: "Sans local" },
      { type: "Carport", product: "PLAI", maxRent: "12 €", condition: "Local technique fermé" },
      { type: "Carport", product: "PLUS", maxRent: "20 €", condition: "Sans local" },
      { type: "Carport", product: "PLUS", maxRent: "25 €", condition: "Local technique fermé" },
      { type: "Carport", product: "PLS", maxRent: "20 €", condition: "Sans local" },
      { type: "Carport", product: "PLS", maxRent: "25 €", condition: "Local technique fermé" },
      { type: "Stationnement", product: "PLAI", maxRent: "8 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "16 €", condition: "" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique"
    ]
  },
  'cad': {
    id: 'cad',
    name: 'Communauté d\'Agglomération du Douaisis (CAD)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
    ],
    subsidiesEPCI: [
      { type: "PLAI", amount: "3 000 €/lgt", condition: "Zone U" },
      { type: "PLAI", amount: "+ 5 000 €/lgt", condition: "Petites typologies (Studio, T1, T2)" },
      { type: "PLAI", amount: "+ 5 000 €/lgt", condition: "Adapté au Gens du Voyage" },
      { type: "PLAI Adapté", amount: "5 000 €/lgt", condition: "Peut être couplé aux aides PLAI" },
      { type: "PLUS", amount: "3 000 €/lgt", condition: "Logement neuf pour Maing et Hergnies" },
      { type: "PLAI AA", amount: "5 000 €/lgt", condition: "Peut être couplé aux aides PLAI" },
      { type: "PSLA", amount: "5 000 €/lgt", condition: "PV max 2 000 €/m² TTC" },
      { type: "Accession maitrisé", amount: "5 000 €/lgt", condition: "PV max 2 250 €/m² TTC" },
      { type: "Autre 1 - Habitat inclusif", amount: "1 000 €/lgt", condition: "Aide du CD + 1 000 € Aide EPCI" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: true,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Cep-10%", product: "PLUS", margin: "3%" },
      { type: "Energie positive", product: "PLUS", margin: "7%" },
      { type: "RE 2020 - RO NPNRU Base", product: "PLUS", margin: "0%" },
      { type: "NPNRU - Cep nr et/ou Bbio -10%", product: "PLUS", margin: "5%" },
      { type: "NPNRU - Cep nr et/ou Bbio -20%", product: "PLUS", margin: "7%" },
      { type: "NPNRU - Passif", product: "PLUS", margin: "7%" },
      { type: "NPNRU - Energie positive", product: "PLUS", margin: "7%" },
      { type: "NPNRU - Récup eaux pluie/grises", product: "PLUS", margin: "3%" },
      { type: "BBC rénov 2025 1ère étape", product: "PLAI/PLUS", margin: "4%" },
      { type: "BBC rénovation 2025", product: "PLAI/PLUS", margin: "7%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "Formule" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "Formule" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "4%" },
      { type: "Contexte local Zone 3 si RT>RT2012-10%", product: "PLUS", margin: "+ 1%" },
      { type: "BBC rénov 2025 1ère étape", product: "PLAI", margin: "3%" },
      { type: "BBC rénovation 2025", product: "PLAI", margin: "6%" },
      { type: "BBC rénov 2025 - Zone 3", product: "PLAI", margin: "+ 1%" },
      { type: "BBC rénov 2025 1ère étape", product: "PLUS", margin: "2%" },
      { type: "BBC rénovation 2025", product: "PLUS", margin: "4%" },
      { type: "BBC rénov 2025 - Zone 3", product: "PLUS", margin: "+ 1%" },
    ],
    hasRents: true,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "32 €", condition: "" },
      { type: "Garage", product: "PLS", maxRent: "32 €", condition: "" },
      { type: "Carport", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Carport", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Carport", product: "PLS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "16 €", condition: "" },
      { type: "Garage (RO NPNRU)", product: "PLAI", maxRent: "0 €", condition: "NPNRU" },
      { type: "Garage (RO NPNRU)", product: "PLUS", maxRent: "32 €", condition: "NPNRU" },
      { type: "Garage (RO NPNRU)", product: "PLS", maxRent: "32 €", condition: "NPNRU" },
      { type: "Carport (RO NPNRU)", product: "PLAI", maxRent: "0 €", condition: "NPNRU" },
      { type: "Carport (RO NPNRU)", product: "PLUS", maxRent: "25 €", condition: "NPNRU" },
      { type: "Carport (RO NPNRU)", product: "PLS", maxRent: "25 €", condition: "NPNRU" },
      { type: "Stationnement (RO NPNRU)", product: "PLAI", maxRent: "0 €", condition: "NPNRU" },
      { type: "Stationnement (RO NPNRU)", product: "PLUS", maxRent: "16 €", condition: "NPNRU" },
      { type: "Stationnement (RO NPNRU)", product: "PLS", maxRent: "16 €", condition: "NPNRU" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique",
      "(b) Utilisation des eaux de pluies et/ou eaux grises pour un usage interne au logement"
    ]
  },
  'cavm': {
    id: 'cavm',
    name: 'Communauté d\'Agglomération de Valenciennes Métropole (CAVM)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
      { type: "PLAI - Opération en PNRQAD", amount: "13 500 €/lgts", condition: "B1 (Valenciennes)" },
      { type: "PLAI - Opération en PNRQAD", amount: "11 500 €/lgts", condition: "B2" },
      { type: "PLUS - Opération en PNRQAD", amount: "2 600 €/lgt", condition: "B1 et B2" },
    ],
    subsidiesEPCI: [
      { type: "PLAI", amount: "3 000 €/lgt", condition: "Logement neuf pour Maing et Hergnies" },
      { type: "PLUS", amount: "3 000 €/lgt", condition: "Logement neuf pour Maing et Hergnies" },
      { type: "PLAI AA", amount: "0 €", condition: "Prix de revient par logement < 2 500 €/m²" },
      { type: "PLUS AA", amount: "15 000€", condition: "PR < 2 500 €/m² et plus de 10% de FP" },
      { type: "PLUS AA", amount: "30 000€", condition: "PR > 2 500 €/m² et plus de 20% de FP" },
      { type: "PLS AA", amount: "40 000€", condition: "PR > 2 500 €/m² + 20% FP + périmètre ACV/PVD" },
      { type: "PSLA", amount: "Max 30 000 €/lgts", condition: "Commune groupe 3 + TVA 5,5%" },
      { type: "Accession maitrisé", amount: "Variable", condition: "Selon PR et PV TTC" },
      { type: "Autre 1 - Habitat inclusif", amount: "1 000 €/lgt", condition: "Aide du CD + 1 000 € Aide EPCI" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: true,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "5%" },
      { type: "Bbio-20%", product: "PLUS", margin: "7%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "5%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "7%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "3%" },
      { type: "Logt ind", product: "PLUS", margin: "3%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLUS", margin: "3%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLAI", margin: "2%" },
      { type: "Lgt coll traversant ou double orientation", product: "PLUS", margin: "2%" },
      { type: "Balcon, loggia ou terrasse > 6m2", product: "PLUS", margin: "2%" },
      { type: "Secteur ABF", product: "PLUS", margin: "5%" },
      { type: "Secteur ABF (si contraintes ABF)", product: "PLAI", margin: "2%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "4%" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "0,77*SLCR/CS*SU" },
      { type: "Zone 3 - Si certificat norme EN 17065 par COFRAC", product: "PLUS", margin: "8%" },
    ],
    hasRents: true,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "15 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "32 €", condition: "" },
      { type: "Garage", product: "PLS", maxRent: "38 €", condition: "" },
      { type: "Carport", product: "PLAI", maxRent: "10 €", condition: "Sans local" },
      { type: "Carport", product: "PLAI", maxRent: "12 €", condition: "Local technique fermé" },
      { type: "Carport", product: "PLUS", maxRent: "20 €", condition: "Sans local" },
      { type: "Carport", product: "PLUS", maxRent: "25 €", condition: "Local technique fermé" },
      { type: "Carport", product: "PLS", maxRent: "20 €", condition: "Sans local" },
      { type: "Carport", product: "PLS", maxRent: "25 €", condition: "Local technique fermé" },
      { type: "Stationnement", product: "PLAI", maxRent: "8 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "16 €", condition: "" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique"
    ]
  },
  'cud': {
    id: 'cud',
    name: 'Communauté Urbaine de Dunkerque (CUD)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
    ],
    subsidiesEPCI: [
      { type: "PLAI", amount: "15 000 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "18 000 €/lgt", condition: "" },
      { type: "PLUS", amount: "2 000 €/lgt", condition: "" },
      { type: "PLAI RO", amount: "15 000 €/lgt", condition: "" },
      { type: "PLUS RO", amount: "3 000 €/lgt", condition: "" },
      { type: "PLAI AA - Droit commun et NPNRU", amount: "15 000 €/lgt", condition: "Etiquette A,B ou C < 145 kWh/m²/an" },
      { type: "PLAI AA - Droit commun et NPNRU", amount: "+ 1 000 €/lgt", condition: "BBC Rénovation 2024" },
      { type: "PLAI AA - Droit commun et NPNRU", amount: "+ 2 000 €/lgt", condition: "Logement individuel" },
      { type: "PLAI AA - Droit commun et NPNRU", amount: "+ 3 000 €/lgt", condition: "PLAI Adapté (Droit commun uniquement)" },
      { type: "PLUS AA - Droit commun et NPNRU", amount: "6 000 €/lgt", condition: "Etiquette A,B ou C < 145 kWh/m²/an" },
      { type: "PLUS AA - Droit commun et NPNRU", amount: "+ 1 000 €/lgt", condition: "BBC Rénovation 2024" },
      { type: "PLUS AA - Droit commun et NPNRU", amount: "+ 2 000 €/lgt", condition: "Logement individuel" },
      { type: "Autre 1 - Ascenseur <R+3", amount: "20 000 €/ascenseur", condition: "Aide du CD" },
      { type: "Autre 2 - Restructuration", amount: "2 500 €/lgt créé", condition: "Grands logements" },
    ],
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: true,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "Z2: 0% / Z3: 0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "Z2: 5% / Z3: 6%" },
      { type: "Bbio-20%", product: "PLUS", margin: "Z2: 7% / Z3: 8%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "Z2: 5% / Z3: 6%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "Z2: 7% / Z3: 8%" },
      { type: "Passif", product: "PLUS", margin: "Z2: 9% / Z3: 9%" },
      { type: "Energie positive", product: "PLUS", margin: "Z2: 9% / Z3: 9%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "Z2: 0% / Z3: 0%" },
      { type: "Logt ind", product: "PLUS", margin: "Z2: 2% / Z3: 2%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "Formule" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "Formule" },
      { type: "BBC rénovation 2024 1ère étape", product: "PLAI", margin: "Z2: 4% / Z3: 7%" },
      { type: "BBC rénovation 2024", product: "PLUS", margin: "Z2: 4% / Z3: 7%" },
    ],
    hasRents: true,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "39 €", condition: "Boxé" },
      { type: "Garage", product: "PLUS", maxRent: "30 €", condition: "Non Boxé" },
      { type: "Garage", product: "PLS", maxRent: "39 €", condition: "Boxé" },
      { type: "Garage", product: "PLS", maxRent: "30 €", condition: "Non Boxé" },
      { type: "Carport", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Carport", product: "PLUS", maxRent: "25 €", condition: "" },
      { type: "Carport", product: "PLS", maxRent: "25 €", condition: "" },
      { type: "Stationnement", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "18 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "18 €", condition: "" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique"
    ]
  },
  'camvs': {
    id: 'camvs',
    name: 'Communauté d\'Agglomération Maubeuge Val de Sambre (CAMVS)',
    lastUpdated: 'Juillet 2025',
    subsidiesState: [
      { type: "PLAI - Droit Commun", amount: "6 452 €/lgt", condition: "" },
      { type: "PLAI Adapté", amount: "16 480 €/lgt", condition: "Ordinaire - 1 à 3 lgts" },
      { type: "PLAI Adapté (Structure)", amount: "8 980 €/lgt", condition: "En structure" },
      { type: "PLAI - AA", amount: "16 000 €/lgt", condition: "Super bonus" },
      { type: "PLUS - AA", amount: "20 000 €/lgt", condition: "Mega bonus*" },
      { type: "Pension de familles et RS", amount: "7 500 €/lgt", condition: "Supplémentaire au PLAI Adapté Structure" },
    ],
    // Pas de subventions EPCI mentionnées pour la CAMVS dans les données fournies
    subsidiesNPNRU: [
      { type: "Subvention PLAI", amount: "6 300 €/lgt + 1 500 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLAI", amount: "7 900 €/lgt + 1 900 €/lgt", condition: "Si AA - Subvention doublé" },
      { type: "Prêt bonifié PLUS", amount: "6 700 €/lgt + 5 600 €/lgt", condition: "Si AA - Subvention doublé" },
    ],
    subsidiesCD: [
      { type: "CD PLAI", amount: "27 000 €/lgt", condition: "" },
      { type: "CD PLAI Adapté", amount: "33 250 €/lgt", condition: "Fonctionne sur toutes les zones" },
      { type: "CD PLUS", amount: "18 000 €/lgt", condition: "" },
      { type: "CD PLS", amount: "4 000 €/lgt", condition: "" },
    ],
    hasMargins: true,
    margins: [
      { type: "RE 2020 Base", product: "PLUS", margin: "0%" },
      { type: "Bbio-10%", product: "PLUS", margin: "6%" },
      { type: "Bbio-20%", product: "PLUS", margin: "8%" },
      { type: "Cepnr et Cep-10%", product: "PLUS", margin: "6%" },
      { type: "Cepnr et Cep -20%", product: "PLUS", margin: "8%" },
      { type: "NF Habitat HQE ou Prestaterre BEE+ (a)", product: "PLUS", margin: "3%" },
      { type: "Logt ind", product: "PLUS", margin: "3%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLUS", margin: "3%" },
      { type: "Indiv + 60m² de jardin mini", product: "PLAI", margin: "2%" },
      { type: "Lgt coll traversant ou double orientation", product: "PLUS", margin: "2%" },
      { type: "Balcon, loggia ou terrasse > 6m2", product: "PLUS", margin: "2%" },
      { type: "Secteur ABF", product: "PLUS", margin: "5%" },
      { type: "Secteur ABF (si contraintes ABF)", product: "PLAI", margin: "2%" },
      { type: "Asc. Bât col < R+3", product: "PLUS", margin: "4%" },
      { type: "Locaux collectifs résidentiels", product: "PLUS", margin: "0,77*SLCR/CS*SU" },
      { type: "Zone 3 - Si certificat norme EN 17065 par COFRAC", product: "PLUS", margin: "8%" },
    ],
    hasRents: true,
    accessoryRents: [
      { type: "Garage", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Garage", product: "PLUS", maxRent: "32 €", condition: "" },
      { type: "Garage", product: "PLS", maxRent: "32 €", condition: "" },
      { type: "Carport", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Carport", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Carport", product: "PLS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLAI", maxRent: "0 €", condition: "" },
      { type: "Stationnement", product: "PLUS", maxRent: "16 €", condition: "" },
      { type: "Stationnement", product: "PLS", maxRent: "16 €", condition: "" },
    ],
    footnotes: [
      "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA , les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d’une contribution financière d’au moins 5 000 par logement",
      "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique"
    ]
  }
};

// Fonction pour récupérer les données (Local Storage > Defaut)
export const getReferenceData = (epciName: string): ReferenceData => {
  // Charger depuis Local Storage
  const savedJson = localStorage.getItem(STORAGE_KEY);
  let currentData = DEFAULT_DATA;

  if (savedJson) {
    try {
      currentData = JSON.parse(savedJson);
    } catch (e) {
      console.error("Erreur lecture LocalStorage", e);
    }
  }

  const normalized = epciName.toLowerCase();

  // Détection EPCI
  if (normalized.includes("métropole européenne de lille") || normalized.includes("lille")) {
    return currentData['mel'];
  }
  if (normalized.includes("porte du hainaut") || normalized.includes("caph")) {
    return currentData['caph'];
  }
  if (normalized.includes("douaisis") || normalized.includes("cad") || normalized.includes("douai")) {
    return currentData['cad'];
  }
  if (normalized.includes("dunkerque") || normalized.includes("cud") || normalized.includes("communauté urbaine de dunkerque")) {
    return currentData['cud'];
  }
  if (normalized.includes("valenciennes") || normalized.includes("cavm") || normalized.includes("valenciennois")) {
    return currentData['cavm'];
  }
  if (normalized.includes("maubeuge") || normalized.includes("camvs") || normalized.includes("val de sambre")) {
    return currentData['camvs'];
  }
  
  // Défaut : DDTM
  return currentData['ddtm'];
};

// Fonction pour sauvegarder toutes les modifications
export const saveAllData = (newData: Record<string, ReferenceData>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

// Récupérer tout l'objet de données (pour le mode Admin)
export const getAllData = (): Record<string, ReferenceData> => {
  const savedJson = localStorage.getItem(STORAGE_KEY);
  if (savedJson) {
    return JSON.parse(savedJson);
  }
  return DEFAULT_DATA;
};
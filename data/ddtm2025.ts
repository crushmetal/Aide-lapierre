export const DDTM_DATA = {
  lastUpdated: "Juillet 2025",
  source: "DDTM 59 / Conseil Départemental / EPCI",
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
  accessoryRents: [
    { type: "Garage", product: "PLAI", maxRent: "0 €", conditions: "" },
    { type: "Garage", product: "PLUS / PLS", maxRent: "32 €", conditions: "" },
    { type: "Carport", product: "PLAI", maxRent: "0 €", conditions: "" },
    { type: "Carport", product: "PLUS / PLS", maxRent: "25 €", conditions: "" },
    { type: "Stationnement", product: "PLAI", maxRent: "0 €", conditions: "" },
    { type: "Stationnement", product: "PLUS / PLS", maxRent: "16 €", conditions: "" },
  ],
  footnotes: [
    "* sont éligibles au méga bonus les opérations de PLAI Adapté en AA, les opérations de transformation de bâtiments tertiaires en logements et les opérations en AA bénéficiant d'une contribution financière d'au moins 5 000 par logement",
    "(a) NF Habitat HQE récupération eau de pluie ou équivalent, cumulable jusqu'à 8% avec autres marges de performance énergétique",
    "(b) Utilisation des eaux de pluies et/ou eaux grises pour un usage interne au logement"
  ]
};
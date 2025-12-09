
export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  
  // Nettoyage : on garde les chiffres et éventuellement les virgules
  // On traite le cas "6 300 € + 1 500 €" -> on prend le premier montant principal pour l'instant, 
  // ou on additionne si le format est explicite.
  // Pour la sécurité de cette version, on extrait le premier grand nombre trouvé (> 100) pour éviter de prendre les "1 à 3 lgts".
  
  // Enlever les espaces insécables et espaces normaux
  const cleanStr = value.replace(/\s/g, '').replace(/€/g, '');
  
  // Chercher tous les nombres
  const matches = cleanStr.match(/(\d+)/g);
  
  if (!matches) return 0;
  
  // On prend le plus grand nombre trouvé dans la chaîne comme montant unitaire probable
  // C'est une heuristique pour gérer "Max 30 000" ou "16 480 / lgt"
  const numbers = matches.map(n => parseInt(n, 10));
  return Math.max(...numbers);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
};

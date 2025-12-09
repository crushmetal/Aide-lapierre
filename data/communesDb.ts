

// Base de données Maître des Communes du Nord (59)
// Contient : Population, EPCI, SRU, Zonages (Acc/Loc), Direction Territoriale
// Cette base est chargée en mémoire et peut être surchargée par le LocalStorage (Mode Admin)

export interface CommuneDbEntry {
  insee: string;
  name: string;
  epci: string;
  pop: number;
  sruRate: number | null;
  targetRate: number;
  isOver: boolean; // Carencé / Déficitaire
  exempt: boolean;
  zoneAcc: string; // A, B1, B2, C
  zoneLoc: string; // 1, 2, 3
  dirTerr: string; // Direction Territoriale
}

const STORAGE_KEY_DB = 'nord_habitat_communes_db_v1';

// Données initiales (Extrait massif basé sur votre input)
const INITIAL_DB: CommuneDbEntry[] = [
  { insee: "59002", name: "ABSCON", epci: "CA de la Porte du Hainaut", pop: 4203, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Valenciennes" },
  { insee: "59005", name: "ALLENNES-LES-MARAIS", epci: "Métropole Européenne de Lille", pop: 3567, sruRate: 10.25, targetRate: 25, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59009", name: "VILLENEUVE-D'ASCQ", epci: "Métropole Européenne de Lille", pop: 62067, sruRate: 39.52, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59011", name: "ANNOEULLIN", epci: "Métropole Européenne de Lille", pop: 10486, sruRate: 18.96, targetRate: 25, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59014", name: "ANZIN", epci: "CA de Valenciennes Métropole", pop: 13422, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59017", name: "ARMENTIERES", epci: "Métropole Européenne de Lille", pop: 25581, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59024", name: "AUBERCHICOURT", epci: "CC Cœur d'Ostrevent", pop: 4626, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59028", name: "AUBY", epci: "CA du Douaisis", pop: 7188, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59032", name: "AULNOY-LEZ-VALENCIENNES", epci: "CA de Valenciennes Métropole", pop: 7183, sruRate: 21.24, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59033", name: "AULNOYE-AYMERIES", epci: "CA Maubeuge Val de Sambre", pop: 8756, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Sambre Avesnois" },
  { insee: "59043", name: "BAILLEUL", epci: "CC de Flandre Intérieure", pop: 15163, sruRate: 21.09, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Flandre" },
  { insee: "59044", name: "BAISIEUX", epci: "Métropole Européenne de Lille", pop: 5177, sruRate: 17.50, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59051", name: "LA BASSEE", epci: "Métropole Européenne de Lille", pop: 6622, sruRate: 21.04, targetRate: 25, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59052", name: "BAUVIN", epci: "Métropole Européenne de Lille", pop: 4999, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59079", name: "BEUVRAGES", epci: "CA de Valenciennes Métropole", pop: 6784, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59090", name: "BONDUES", epci: "Métropole Européenne de Lille", pop: 9713, sruRate: 18.61, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59094", name: "BOURBOURG", epci: "CA de Dunkerque", pop: 7156, sruRate: 14.88, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre Grand Littoral" },
  { insee: "59098", name: "BOUSBECQUE", epci: "Métropole Européenne de Lille", pop: 4847, sruRate: 18.52, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59107", name: "BRAY-DUNES", epci: "CA de Dunkerque", pop: 4476, sruRate: 12.53, targetRate: 20, isOver: false, exempt: true, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Flandre Grand Littoral" },
  { insee: "59112", name: "BRUAY-SUR-L'ESCAUT", epci: "CA de Valenciennes Métropole", pop: 11309, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59122", name: "CAMBRAI", epci: "CA de Cambrai", pop: 31425, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Cambrésis" },
  { insee: "59131", name: "CAPPELLE-LA-GRANDE", epci: "CA de Dunkerque", pop: 7899, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B2", dirTerr: "Flandre Grand Littoral" },
  { insee: "59143", name: "LA CHAPELLE-D'ARMENTIERES", epci: "Métropole Européenne de Lille", pop: 8719, sruRate: 24.59, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59146", name: "CHERENG", epci: "Métropole Européenne de Lille", pop: 3001, sruRate: 28.85, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59153", name: "CONDE-SUR-L'ESCAUT", epci: "CA de Valenciennes Métropole", pop: 9396, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59155", name: "COUDEKERQUE-BRANCHE", epci: "CA de Dunkerque", pop: 20765, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B2", dirTerr: "Flandre Grand Littoral" },
  { insee: "59160", name: "CRESPIN", epci: "CA de Valenciennes Métropole", pop: 4515, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59163", name: "CROIX", epci: "Métropole Européenne de Lille", pop: 20778, sruRate: 22.25, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59165", name: "CUINCY", epci: "CA du Douaisis", pop: 6472, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59170", name: "DECHY", epci: "CA du Douaisis", pop: 5351, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59172", name: "DENAIN", epci: "CA de la Porte du Hainaut", pop: 20640, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59178", name: "DOUAI", epci: "CA du Douaisis", pop: 39648, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59179", name: "DOUCHY-LES-MINES", epci: "CA de la Porte du Hainaut", pop: 10207, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59183", name: "DUNKERQUE", epci: "CA de Dunkerque", pop: 86788, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "Flandre Grand Littoral" },
  { insee: "59193", name: "EMMERIN", epci: "Métropole Européenne de Lille", pop: 3053, sruRate: 19.36, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59202", name: "ERQUINGHEM-LYS", epci: "Métropole Européenne de Lille", pop: 5356, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59205", name: "ESCAUDAIN", epci: "CA de la Porte du Hainaut", pop: 9253, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Valenciennes" },
  { insee: "59207", name: "ESCAUTPONT", epci: "CA de la Porte du Hainaut", pop: 4152, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59212", name: "ESTAIRES", epci: "CC Flandre Lys", pop: 6496, sruRate: 17.16, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre" },
  { insee: "59220", name: "FACHES-THUMESNIL", epci: "Métropole Européenne de Lille", pop: 18110, sruRate: 19.58, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "SUD" },
  { insee: "59225", name: "FEIGNIES", epci: "CA Maubeuge Val de Sambre", pop: 6752, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Sambre Avesnois" },
  { insee: "59227", name: "FENAIN", epci: "CC Cœur d'Ostrevent", pop: 5529, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59230", name: "FERRIERE-LA-GRANDE", epci: "CA Maubeuge Val de Sambre", pop: 5202, sruRate: 21.89, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Sambre Avesnois" },
  { insee: "59234", name: "FLERS-EN-ESCREBIEUX", epci: "CA du Douaisis", pop: 5642, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59239", name: "FLINES-LEZ-RACHES", epci: "CA du Douaisis", pop: 5610, sruRate: 10.75, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59253", name: "FRESNES-SUR-ESCAUT", epci: "CA de Valenciennes Métropole", pop: 7486, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59260", name: "GHYVELDE", epci: "CA de Dunkerque", pop: 4119, sruRate: 12.34, targetRate: 20, isOver: false, exempt: true, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre Grand Littoral" },
  { insee: "59268", name: "LA GORGUE", epci: "CC Flandre Lys", pop: 5599, sruRate: 19.28, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre" },
  { insee: "59271", name: "GRANDE-SYNTHE", epci: "CA de Dunkerque", pop: 20331, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B2", dirTerr: "Flandre Grand Littoral" },
  { insee: "59272", name: "GRAND-FORT-PHILIPPE", epci: "CA de Dunkerque", pop: 4977, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre Grand Littoral" },
  { insee: "59273", name: "GRAVELINES", epci: "CA de Dunkerque", pop: 11223, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre Grand Littoral" },
  { insee: "59276", name: "GUESNAIN", epci: "CA du Douaisis", pop: 4656, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59278", name: "HALLENNES-LEZ-HAUBOURDIN", epci: "Métropole Européenne de Lille", pop: 4718, sruRate: 15.92, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59279", name: "HALLUIN", epci: "Métropole Européenne de Lille", pop: 20829, sruRate: 27.04, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59286", name: "HAUBOURDIN", epci: "Métropole Européenne de Lille", pop: 14757, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59291", name: "HAUTMONT", epci: "CA Maubeuge Val de Sambre", pop: 14182, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Sambre Avesnois" },
  { insee: "59295", name: "HAZEBROUCK", epci: "CC de Flandre Intérieure", pop: 21498, sruRate: 22.98, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Flandre" },
  { insee: "59299", name: "HEM", epci: "Métropole Européenne de Lille", pop: 18713, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59301", name: "HERGNIES", epci: "CA de Valenciennes Métropole", pop: 4463, sruRate: 10.50, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59314", name: "HORNAING", epci: "CC Cœur d'Ostrevent", pop: 3535, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59317", name: "HOUPLINES", epci: "Métropole Européenne de Lille", pop: 7897, sruRate: 17.94, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59324", name: "JEUMONT", epci: "CA Maubeuge Val de Sambre", pop: 10342, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Sambre Avesnois" },
  { insee: "59327", name: "LALLAING", epci: "CA du Douaisis", pop: 6250, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59328", name: "LAMBERSART", epci: "Métropole Européenne de Lille", pop: 27121, sruRate: 17.71, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59329", name: "LAMBRES-LEZ-DOUAI", epci: "CA du Douaisis", pop: 4926, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59339", name: "LEERS", epci: "Métropole Européenne de Lille", pop: 9588, sruRate: 19.28, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59340", name: "LEFFRINCKOUCKE", epci: "CA de Dunkerque", pop: 4124, sruRate: 20.00, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "Flandre Grand Littoral" },
  { insee: "59343", name: "LESQUIN", epci: "Métropole Européenne de Lille", pop: 9241, sruRate: 23.64, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "SUD" },
  { insee: "59350", name: "LILLE", epci: "Métropole Européenne de Lille", pop: 236710, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59352", name: "LINSELLES", epci: "Métropole Européenne de Lille", pop: 8192, sruRate: 21.06, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59359", name: "LOON-PLAGE", epci: "CA de Dunkerque", pop: 6039, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre Grand Littoral" },
  { insee: "59360", name: "LOOS", epci: "Métropole Européenne de Lille", pop: 23013, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "SUD" },
  { insee: "59361", name: "LOURCHES", epci: "CA de la Porte du Hainaut", pop: 3814, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59365", name: "LOUVROIL", epci: "CA Maubeuge Val de Sambre", pop: 6357, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Sambre Avesnois" },
  { insee: "59367", name: "LYS-LEZ-LANNOY", epci: "Métropole Européenne de Lille", pop: 13793, sruRate: 25.44, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59368", name: "LA MADELEINE", epci: "Métropole Européenne de Lille", pop: 22488, sruRate: 25.26, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59369", name: "MAING", epci: "CA de Valenciennes Métropole", pop: 4004, sruRate: 11.81, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59378", name: "MARCQ-EN-BAROEUL", epci: "Métropole Européenne de Lille", pop: 39356, sruRate: 19.40, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59383", name: "MARLY", epci: "CA de Valenciennes Métropole", pop: 12024, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59386", name: "MARQUETTE-LEZ-LILLE", epci: "Métropole Européenne de Lille", pop: 11213, sruRate: 30.23, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59390", name: "MASNY", epci: "CC Cœur d'Ostrevent", pop: 4056, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Douaisis" },
  { insee: "59392", name: "MAUBEUGE", epci: "CA Maubeuge Val de Sambre", pop: 29066, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Sambre Avesnois" },
  { insee: "59400", name: "MERVILLE", epci: "CC Flandre Lys", pop: 9652, sruRate: 17.56, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre" },
  { insee: "59410", name: "MONS-EN-BAROEUL", epci: "Métropole Européenne de Lille", pop: 21467, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59414", name: "MONTIGNY-EN-OSTREVENT", epci: "CC Cœur d'Ostrevent", pop: 4681, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59421", name: "MOUVAUX", epci: "Métropole Européenne de Lille", pop: 13173, sruRate: 15.46, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59426", name: "NEUVILLE-EN-FERRAIN", epci: "Métropole Européenne de Lille", pop: 10160, sruRate: 15.08, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59428", name: "NEUVILLE-SAINT-REMY", epci: "CA de Cambrai", pop: 3912, sruRate: 28.73, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Cambrésis" },
  { insee: "59431", name: "NIEPPE", epci: "CC Flandre Lys", pop: 7606, sruRate: 23.07, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B1", dirTerr: "Flandre" },
  { insee: "59447", name: "ONNAING", epci: "CA de Valenciennes Métropole", pop: 8719, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59456", name: "PECQUENCOURT", epci: "CC Cœur d'Ostrevent", pop: 6232, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59457", name: "PERENCHIES", epci: "Métropole Européenne de Lille", pop: 8519, sruRate: 20.21, targetRate: 25, isOver: false, exempt: true, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59459", name: "PETITE-FORET", epci: "CA de Valenciennes Métropole", pop: 5058, sruRate: 22.89, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59462", name: "PHALEMPIN", epci: "CC Pévèle Carembault", pop: 4469, sruRate: 20.75, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59482", name: "QUESNOY-SUR-DEULE", epci: "Métropole Européenne de Lille", pop: 6920, sruRate: 20.29, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59484", name: "QUIEVRECHAIN", epci: "CA de Valenciennes Métropole", pop: 6208, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59489", name: "RAIMBEAUCOURT", epci: "CA du Douaisis", pop: 4015, sruRate: 16.93, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59491", name: "RAISMES", epci: "CA de la Porte du Hainaut", pop: 12055, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59504", name: "ROEULX", epci: "CA de la Porte du Hainaut", pop: 3779, sruRate: 18.95, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Valenciennes" },
  { insee: "59507", name: "RONCHIN", epci: "Métropole Européenne de Lille", pop: 19437, sruRate: 28.99, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "SUD" },
  { insee: "59508", name: "RONCQ", epci: "Métropole Européenne de Lille", pop: 13784, sruRate: 20.94, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59509", name: "ROOST-WARENDIN", epci: "CA du Douaisis", pop: 5976, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59512", name: "ROUBAIX", epci: "Métropole Européenne de Lille", pop: 98892, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59514", name: "ROUSIES", epci: "CA Maubeuge Val de Sambre", pop: 4043, sruRate: 15.63, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Sambre Avesnois" },
  { insee: "59525", name: "SAINGHIN-EN-WEPPES", epci: "Métropole Européenne de Lille", pop: 5641, sruRate: 13.66, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59526", name: "SAINT-AMAND-LES-EAUX", epci: "CA de la Porte du Hainaut", pop: 15980, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59527", name: "SAINT-ANDRE-LEZ-LILLE", epci: "Métropole Européenne de Lille", pop: 12942, sruRate: 25.46, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59544", name: "SAINT-SAULVE", epci: "CA de Valenciennes Métropole", pop: 11117, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59553", name: "SANTES", epci: "Métropole Européenne de Lille", pop: 5660, sruRate: 12.53, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59560", name: "SECLIN", epci: "Métropole Européenne de Lille", pop: 12834, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59566", name: "SEQUEDIN", epci: "Métropole Européenne de Lille", pop: 4762, sruRate: 9.72, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59569", name: "SIN-LE-NOBLE", epci: "CA du Douaisis", pop: 15603, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59574", name: "SOMAIN", epci: "CC Cœur d'Ostrevent", pop: 11790, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59580", name: "STEENVOORDE", epci: "CC de Flandre Intérieure", pop: 4324, sruRate: 9.72, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "Flandre" },
  { insee: "59581", name: "STEENWERCK", epci: "CC de Flandre Intérieure", pop: 3540, sruRate: 10.51, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Flandre" },
  { insee: "59585", name: "TEMPLEMARS", epci: "Métropole Européenne de Lille", pop: 3635, sruRate: 13.22, targetRate: 25, isOver: false, exempt: true, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59588", name: "TETEGHEM-COUDEKERQUE-VILLAGE", epci: "CA de Dunkerque", pop: 8384, sruRate: 24.89, targetRate: 20, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "Flandre Grand Littoral" },
  { insee: "59592", name: "THUMERIES", epci: "CC Pévèle Carembault", pop: 4029, sruRate: 11.21, targetRate: 20, isOver: false, exempt: false, zoneLoc: "3", zoneAcc: "C", dirTerr: "SUD" },
  { insee: "59598", name: "TOUFFLERS", epci: "Métropole Européenne de Lille", pop: 3910, sruRate: 18.95, targetRate: 25, isOver: false, exempt: true, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59599", name: "TOURCOING", epci: "Métropole Européenne de Lille", pop: 99011, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59603", name: "TRITH-SAINT-LEGER", epci: "CA de la Porte du Hainaut", pop: 6124, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59606", name: "VALENCIENNES", epci: "CA de Valenciennes Métropole", pop: 42991, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59616", name: "VIEUX-CONDE", epci: "CA de Valenciennes Métropole", pop: 10446, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59632", name: "WALLERS", epci: "CA de la Porte du Hainaut", pop: 5598, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Valenciennes" },
  { insee: "59636", name: "WAMBRECHIES", epci: "Métropole Européenne de Lille", pop: 10798, sruRate: 24.63, targetRate: 25, isOver: false, exempt: true, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59646", name: "WASQUEHAL", epci: "Métropole Européenne de Lille", pop: 20836, sruRate: 23.31, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "A", dirTerr: "METROPOLE NORD" },
  { insee: "59648", name: "WATTIGNIES", epci: "Métropole Européenne de Lille", pop: 15531, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59650", name: "WATTRELOS", epci: "Métropole Européenne de Lille", pop: 40836, sruRate: 25, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
  { insee: "59653", name: "WAVRIN", epci: "Métropole Européenne de Lille", pop: 7773, sruRate: 21.40, targetRate: 25, isOver: false, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "SUD" },
  { insee: "59654", name: "WAZIERS", epci: "CA du Douaisis", pop: 7354, sruRate: 25, targetRate: 20, isOver: true, exempt: false, zoneLoc: "3", zoneAcc: "B2", dirTerr: "Douaisis" },
  { insee: "59656", name: "WERVICQ-SUD", epci: "Métropole Européenne de Lille", pop: 5299, sruRate: 29.61, targetRate: 25, isOver: true, exempt: false, zoneLoc: "2", zoneAcc: "B1", dirTerr: "METROPOLE NORD" },
];

const normalizeName = (name: string): string => {
  return name
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^SAINT[- ]/, "ST ")
    .replace(/^SAINTE[- ]/, "STE ")
    .replace(/['’]/g, "")
    .replace(/-/g, " ")
    .trim();
};

// Fonction pour récupérer toute la DB (pour Admin)
export const getAllCommunesData = (): CommuneDbEntry[] => {
  const saved = localStorage.getItem(STORAGE_KEY_DB);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing local communes DB", e);
    }
  }
  return INITIAL_DB;
};

// Fonction pour sauvegarder la DB (Admin)
export const saveAllCommunesData = (data: CommuneDbEntry[]) => {
  localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(data));
};

// Fonction de recherche unique
export const getOfficialCommuneData = (communeName: string): CommuneDbEntry | null => {
  if (!communeName) return null;
  const db = getAllCommunesData();
  const normalized = normalizeName(communeName);

  // 1. Exact match
  let found = db.find(c => normalizeName(c.name) === normalized);
  if (found) return found;

  // 2. SAINT -> ST
  if (normalized.includes("SAINT")) {
    const withSt = normalized.replace("SAINT", "ST");
    found = db.find(c => normalizeName(c.name) === withSt);
    if (found) return found;
  }

  // 3. ST -> SAINT
  if (normalized.includes("ST ")) {
    const withSaint = normalized.replace("ST ", "SAINT ");
    found = db.find(c => normalizeName(c.name) === withSaint);
    if (found) return found;
  }

  return null;
};

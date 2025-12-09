
import React, { useEffect, useState } from 'react';
import { CommuneData, ReferenceData } from '../types';
import StatsCard from './StatsCard';
import ReferenceTable from './ReferenceTable';
import SimulationPanel from './SimulationPanel';
import AdminCommuneEditor from './AdminCommuneEditor';
import { Building2, Users, PieChart, Landmark, Map, Link as LinkIcon, AlertTriangle, CheckCircle, Sparkles, Database, ShieldCheck, BadgeCheck, Pencil, MapPinned, Euro } from 'lucide-react';
import { getReferenceData } from '../data/referenceData';

interface DashboardProps {
  data: Partial<CommuneData>;
  epciForced: string;
  loadingStats: boolean;
  isAdmin: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ data, epciForced, loadingStats, isAdmin }) => {
  const [referenceData, setReferenceData] = useState<ReferenceData | null>(null);
  const [showDbEditor, setShowDbEditor] = useState(false);
  
  // Load the correct reference table based on the EPCI
  const loadReference = () => {
      const ref = getReferenceData(epciForced);
      setReferenceData(ref);
  };

  useEffect(() => {
    loadReference();
  }, [epciForced]);

  const socialRate = data.stats?.socialHousingRate;
  const targetRate = data.stats?.targetRate;
  const isExempt = data.stats?.exempt;
  
  const hasSruData = typeof socialRate === 'number' && typeof targetRate === 'number';
  // Deficit calculation: If not exempt AND rate < target
  const isDeficit = hasSruData && !isExempt ? (socialRate! < targetRate!) : false;
  
  const displayPopulation = data.population ? data.population.toLocaleString('fr-FR') : "Non trouvé";
  const displaySocialRate = (socialRate !== null && socialRate !== undefined) ? `${socialRate}%` : "Non trouvé";
  const displayTarget = (targetRate !== null && targetRate !== undefined) ? `Objectif: ${targetRate}%` : "";
  
  // Détection si source officielle (hack simple basé sur la présence de la source "Données Officielles")
  const isOfficial = data.sources?.some(s => s.title.includes("Officielles"));

  if (showDbEditor && isAdmin) {
      return <AdminCommuneEditor onClose={() => setShowDbEditor(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Info */}
      <div className="mb-8 border-b pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Landmark className="w-8 h-8 text-brand-600" />
                    {data.name}
                    <span className="text-lg font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{epciForced}</span>
                </h2>
                {/* Direction Territoriale */}
                {data.directionTerritoriale && (
                     <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 ml-1">
                        <MapPinned className="w-4 h-4 text-brand-500" />
                        <span>Direction Territoriale : <strong>{data.directionTerritoriale}</strong></span>
                     </div>
                )}
            </div>
            
            <div className="flex items-center gap-2">
                {/* Badge Exonérée */}
                {isExempt && (
                    <div className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full border border-indigo-200 shadow-sm animate-pulse-slow">
                        <BadgeCheck className="w-5 h-5" />
                        <span className="font-bold">Commune Exonérée SRU</span>
                    </div>
                )}
                
                {isAdmin && (
                    <button 
                        onClick={() => setShowDbEditor(true)}
                        className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
                    >
                        <Pencil className="w-4 h-4" />
                        Éditer BDD Communes
                    </button>
                )}
            </div>
        </div>
        {data.lastUpdated && <p className="text-sm text-gray-400 mt-2">Recherche effectuée le : {data.lastUpdated}</p>}
      </div>

      {/* SECTION 1: Données Clés */}
      <div className={`mb-12 rounded-2xl p-6 border ${isOfficial ? 'bg-green-50/30 border-green-200' : 'bg-blue-50/50 border-blue-100'}`}>
        <div className="flex items-center gap-2 mb-6">
            {isOfficial ? <ShieldCheck className="w-5 h-5 text-green-600" /> : <Sparkles className="w-5 h-5 text-blue-600" />}
            <h3 className={`text-lg font-bold ${isOfficial ? 'text-green-900' : 'text-blue-900'}`}>
                {isOfficial ? 'Données Officielles 2024 & Web' : 'Données Web (Recherche IA)'}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded border ml-2 ${isOfficial ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                {isOfficial ? 'Certifié' : 'Non Certifié'}
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
            title="Population" 
            value={loadingStats ? "..." : displayPopulation} 
            icon={<Users className="w-6 h-6" />}
            isAiGenerated={!isOfficial}
            />
            
            <StatsCard 
            title="Taux SRU Actuel" 
            value={loadingStats ? "..." : displaySocialRate} 
            subValue={loadingStats ? "" : (isExempt ? "Exonérée" : displayTarget)}
            alert={!loadingStats && hasSruData && isDeficit}
            icon={<PieChart className="w-6 h-6" />}
            isAiGenerated={!isOfficial}
            />

            <StatsCard 
            title="Zonage Accession" 
            value={loadingStats ? "..." : (data.zoning?.accession || "Non trouvé")} 
            subValue="PTZ / Pinel"
            icon={<Map className="w-6 h-6" />}
            isAiGenerated={!isOfficial && !data.zoning?.accession} // Si on a l'info officielle, ce n'est pas IA
            />

            <StatsCard 
            title="Zonage Locatif" 
            value={loadingStats ? "..." : (data.zoning?.rental || "Non trouvé")} 
            subValue="PLUS / PLAI"
            icon={<Building2 className="w-6 h-6" />}
            isAiGenerated={!isOfficial && !data.zoning?.rental}
            />
        </div>

        {/* SRU Status Banner */}
        {!loadingStats && hasSruData && data.stats && (
            <div className={`mt-6 p-4 rounded-lg border flex items-center gap-3 bg-white shadow-sm ${isDeficit ? 'border-orange-200 text-orange-800' : 'border-green-200 text-green-800'}`}>
                {isDeficit ? <AlertTriangle className="w-6 h-6 flex-shrink-0 text-orange-500" /> : <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-500" />}
                <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide">
                        {isExempt ? 'Commune Exonérée' : (isDeficit ? 'Déficit SRU Détecté' : 'Objectifs SRU Atteints (ou non soumis)')}
                    </h4>
                    <p className="text-sm mt-1 text-gray-600">
                        {isExempt 
                             ? "Cette commune est exonérée de prélèvement SRU pour la période en cours." 
                             : (isDeficit 
                                ? `Cette commune n'atteint pas son objectif de ${targetRate}%.` 
                                : `Cette commune semble respecter ses obligations ou n'est pas soumise à la loi SRU.`
                               )
                        }
                    </p>
                </div>
            </div>
        )}
        
        {!loadingStats && !hasSruData && (
             <div className="mt-6 p-4 rounded-lg border border-gray-200 bg-white shadow-sm text-gray-500 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-400" />
                <p className="text-sm">Données SRU indisponibles.</p>
             </div>
        )}

        {/* Sources Section */}
        {data.sources && data.sources.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <LinkIcon className="w-3 h-3" />
                Sources
            </h3>
            <div className="flex flex-wrap gap-3">
                {data.sources.map((source, idx) => (
                <a 
                    key={idx}
                    href={source.uri === '#' ? undefined : source.uri} 
                    target={source.uri === '#' ? undefined : "_blank"}
                    rel="noopener noreferrer" 
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs border rounded-full shadow-sm max-w-[300px] ${source.title.includes("Officielles") ? 'bg-green-600 text-white border-green-600 font-bold' : 'bg-white text-blue-700 border-blue-200 hover:text-blue-900 hover:shadow transition-all'}`}
                    title={source.uri}
                >
                    <span className="truncate max-w-[200px] font-medium">{source.title}</span>
                    {!source.title.includes("Officielles") && <LinkIcon className="w-3 h-3 opacity-50 flex-shrink-0" />}
                </a>
                ))}
            </div>
            </div>
        )}
      </div>

      {/* SECTION 2: Données Officielles (Tableaux codés en dur) */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-6">
            <Euro className="w-6 h-6 text-brand-600" />
            <h3 className="text-2xl font-bold text-gray-900">Marges Locales, Subventions & Prêts Bonifiés</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded border border-green-200 ml-2">Certifié</span>
        </div>

        {referenceData && (
            <>
                <ReferenceTable 
                    data={referenceData} 
                    isAdmin={isAdmin}
                    onDataChange={loadReference} 
                    communeName={data.name}
                />
                
                <SimulationPanel referenceData={referenceData} />
            </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;

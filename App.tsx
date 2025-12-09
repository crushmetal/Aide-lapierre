import React, { useState } from 'react';
import SearchHeader from './components/SearchHeader';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import { fetchCommuneStats } from './services/geminiService';
import { CommuneData, ViewState } from './types';
import { FileSearch } from 'lucide-react';
import { getCommuneEpci } from './data/communes';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [data, setData] = useState<Partial<CommuneData>>({});
  const [epciForced, setEpciForced] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loadingStats, setLoadingStats] = useState(false);
  
  // Admin logic
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSearch = async (term: string) => {
    setError('');
    
    // 1. Local Lookup First
    const localEpci = getCommuneEpci(term);
    const initialEpci = localEpci || "En cours de recherche...";
    
    // Set immediate state to show the Dashboard structure
    setEpciForced(initialEpci);
    setData({ name: term });
    setViewState(ViewState.RESULT);
    setLoadingStats(true);

    try {
      // 2. Fetch specific stats via Gemini
      const stats = await fetchCommuneStats(term, localEpci);
      
      // Update with full data
      setData(prev => ({
          ...prev,
          ...stats,
          name: term // ensure name stays
      }));
      
      // If gemini found a better EPCI name, use it
      if (stats.epci && stats.epci !== "Nom EPCI complet") {
          setEpciForced(stats.epci);
      }

    } catch (err) {
      console.error(err);
      // If Gemini fails, we still show the dashboard if we had a local EPCI match
      if (!localEpci) {
        setError("Impossible de récupérer les statistiques pour cette commune.");
        setViewState(ViewState.ERROR);
      }
    } finally {
        setLoadingStats(false);
    }
  };

  const handleReset = () => {
    setViewState(ViewState.HOME);
    setData({});
    setEpciForced('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SearchHeader onSearch={handleSearch} isLoading={loadingStats} />

      <main className="flex-grow">
        {viewState === ViewState.HOME && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
             <div className="bg-white rounded-2xl shadow-sm p-12 border border-slate-200">
                <FileSearch className="w-16 h-16 text-brand-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue sur l'outil des marges locales</h3>
                <p className="text-gray-500 max-w-lg mx-auto">
                  Consultez instantanément les référentiels de financement (DDTM, MEL, etc.) pour le logement social dans le Nord (59).
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <span className="block text-brand-600 font-bold text-lg mb-1">01.</span>
                    <span className="text-sm font-medium text-gray-700">Autocomplétion des communes</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                     <span className="block text-brand-600 font-bold text-lg mb-1">02.</span>
                    <span className="text-sm font-medium text-gray-700">Affichage immédiat des aides</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                     <span className="block text-brand-600 font-bold text-lg mb-1">03.</span>
                    <span className="text-sm font-medium text-gray-700">Mise à jour via mode Admin</span>
                  </div>
                </div>
             </div>
          </div>
        )}

        {viewState === ViewState.RESULT && (
          <div className="animate-fade-in">
             <div className="max-w-7xl mx-auto px-4 pt-6">
                <button 
                  onClick={handleReset}
                  className="text-sm text-brand-600 hover:text-brand-800 hover:underline mb-4 inline-flex items-center"
                >
                  &larr; Nouvelle recherche
                </button>
             </div>
             <Dashboard 
                data={data} 
                epciForced={epciForced} 
                loadingStats={loadingStats}
                isAdmin={isAdmin}
             />
          </div>
        )}

        {viewState === ViewState.ERROR && (
          <div className="max-w-2xl mx-auto mt-12 px-4">
             <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h3 className="font-bold">Erreur</h3>
                  <p>{error}</p>
                </div>
             </div>
             <button 
                onClick={handleReset}
                className="mt-6 mx-auto block text-brand-600 font-medium hover:underline"
             >
                Retour à l'accueil
             </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>
            <p>© 2024 Nord Habitat Info.</p>
            <p className="mt-1 text-xs">Les statistiques (Pop, SRU) sont recherchées via Google Search.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
             <AdminLogin 
                isAdmin={isAdmin} 
                onLogin={() => setIsAdmin(true)} 
                onLogout={() => setIsAdmin(false)} 
             />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import React from 'react';
import { DDTM_DATA } from '../data/ddtm2025';
import { FileText, Percent, Home } from 'lucide-react';

const DDTMReference: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-12">
      <div className="bg-gray-800 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Référentiel Départemental (DDTM 59)
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            DDTM 59 - Direction Départementale des Territoires et de la Mer du Nord
          </p>
        </div>
        <div className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Mise à jour</span>
          <span className="font-bold text-green-400">{DDTM_DATA.lastUpdated}</span>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Colonne Gauche : Subventions */}
        <div className="space-y-6">
          
          {/* Subventions État (Bleu) */}
          <div className="border rounded-lg overflow-hidden border-blue-200">
            <div className="bg-blue-100 px-4 py-2 border-b border-blue-200">
              <h4 className="font-bold text-blue-900">Subventions État</h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-blue-800">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {DDTM_DATA.subsidiesState.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{item.type}</td>
                    <td className="px-3 py-2 font-bold text-blue-700">{item.amount}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aides NPNRU (Rose/Violet) */}
          <div className="border rounded-lg overflow-hidden border-pink-200">
            <div className="bg-pink-100 px-4 py-2 border-b border-pink-200">
              <h4 className="font-bold text-pink-900">Aides NPNRU</h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-pink-50 text-pink-800">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {DDTM_DATA.subsidiesNPNRU.map((item, idx) => (
                  <tr key={idx} className="hover:bg-pink-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{item.type}</td>
                    <td className="px-3 py-2 font-bold text-pink-700">{item.amount}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subventions Conseil Départemental (Vert) */}
          <div className="border rounded-lg overflow-hidden border-green-200">
            <div className="bg-green-100 px-4 py-2 border-b border-green-200">
              <h4 className="font-bold text-green-900">Subvention Conseil Départemental (CD)</h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-green-50 text-green-800">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {DDTM_DATA.subsidiesCD.map((item, idx) => (
                  <tr key={idx} className="hover:bg-green-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{item.type}</td>
                    <td className="px-3 py-2 font-bold text-green-700">{item.amount}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{item.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Colonne Droite : Marges et Loyers */}
        <div className="space-y-6">
          
          {/* Marges Locales (Orange) */}
          <div className="border rounded-lg overflow-hidden border-orange-200">
            <div className="bg-orange-100 px-4 py-2 border-b border-orange-200 flex justify-between items-center">
              <h4 className="font-bold text-orange-900 flex items-center gap-2">
                <Percent className="w-4 h-4" /> Marges Locales
              </h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-orange-50 text-orange-800">
                <tr>
                  <th className="px-3 py-2 text-left">Référentiel / Critère</th>
                  <th className="px-3 py-2 text-left w-20">Produit</th>
                  <th className="px-3 py-2 text-left w-20">Marge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {DDTM_DATA.margins.map((item, idx) => (
                  <tr key={idx} className={`hover:bg-orange-50/50 ${item.type.includes('Divers') ? 'bg-green-50/30' : ''}`}>
                    <td className="px-3 py-2 text-gray-700">{item.type}</td>
                    <td className="px-3 py-2 text-xs font-semibold text-gray-500">{item.product}</td>
                    <td className="px-3 py-2 font-bold text-orange-700">{item.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loyers Accessoires (Violet clair) */}
          <div className="border rounded-lg overflow-hidden border-purple-200">
            <div className="bg-purple-100 px-4 py-2 border-b border-purple-200">
              <h4 className="font-bold text-purple-900 flex items-center gap-2">
                <Home className="w-4 h-4" /> Loyers Accessoires
              </h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-purple-50 text-purple-800">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Produit</th>
                  <th className="px-3 py-2 text-left">Loyer Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {DDTM_DATA.accessoryRents.map((item, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/50">
                    <td className="px-3 py-2 text-gray-700">{item.type}</td>
                    <td className="px-3 py-2 text-xs font-semibold text-gray-500">{item.product}</td>
                    <td className="px-3 py-2 font-bold text-purple-700">{item.maxRent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      
      {/* Notes de bas de page */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
        {DDTM_DATA.footnotes.map((note, idx) => (
          <p key={idx}>{note}</p>
        ))}
      </div>
    </div>
  );
};

export default DDTMReference;
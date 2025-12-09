import React, { useState } from 'react';
import { ReferenceData, SubsidyRow, MarginRow, RentRow } from '../types';
import { FileText, Percent, Home, Save, RotateCcw } from 'lucide-react';
import { getAllData, saveAllData } from '../data/referenceData';

interface ReferenceTableProps {
  data: ReferenceData;
  isAdmin: boolean;
  onDataChange: () => void; // Trigger parent refresh
  communeName?: string;
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ data, isAdmin, onDataChange, communeName }) => {
  // Local state for form editing
  const [editData, setEditData] = useState<ReferenceData | null>(null);

  // Initialize edit data when entering editing mode (or when data prop changes)
  React.useEffect(() => {
    if (isAdmin) {
      setEditData(JSON.parse(JSON.stringify(data))); // Deep copy
    } else {
      setEditData(null);
    }
  }, [isAdmin, data.id]);

  const handleSave = () => {
    if (!editData) return;
    const allData = getAllData();
    allData[editData.id] = editData;
    saveAllData(allData);
    onDataChange(); // Notify parent to reload data
    alert("Modifications enregistrées avec succès !");
  };

  const handleReset = () => {
     if(confirm("Voulez-vous annuler vos modifications en cours ?")) {
         setEditData(JSON.parse(JSON.stringify(data)));
     }
  };

  // Helper to render cell content (Text or Input)
  const renderCell = (
    section: keyof ReferenceData, 
    index: number, 
    field: string, 
    value: string,
    isBold: boolean = false
  ) => {
    if (!isAdmin || !editData) {
        return <span className={isBold ? "font-bold" : ""}>{value}</span>;
    }

    return (
      <input 
        type="text" 
        value={value} 
        onChange={(e) => {
            const newData = { ...editData };
            // @ts-ignore - Dynamic access is tricky with TS but valid here
            newData[section][index][field] = e.target.value;
            setEditData(newData);
        }}
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
      />
    );
  };

  // Use either the prop data (view mode) or state data (edit mode)
  const displayData = editData || data;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-8 relative">
      {isAdmin && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2 flex justify-between items-center sticky top-0 z-20">
              <span className="text-yellow-800 font-bold text-sm">⚠️ MODE ÉDITION ACTIF</span>
              <div className="flex gap-2">
                  <button onClick={handleReset} className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-xs px-3 py-1 rounded bg-white border">
                      <RotateCcw className="w-3 h-3"/> Annuler
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded shadow-sm">
                      <Save className="w-3 h-3"/> Enregistrer
                  </button>
              </div>
          </div>
      )}

      <div className="bg-gray-800 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Référentiel : {displayData.name}
          </h3>
          <p className="text-gray-300 text-sm mt-1">
             Les montants ci-dessous s'appliquent pour cette commune.
          </p>
        </div>
        <div className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-600">
          <span className="text-xs text-gray-400 uppercase tracking-wider block">Mise à jour</span>
          <span className="font-bold text-green-400">{displayData.lastUpdated}</span>
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
                  <th className="px-3 py-2 text-left w-32">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {displayData.subsidiesState.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{renderCell('subsidiesState', idx, 'type', item.type)}</td>
                    <td className="px-3 py-2 text-blue-700">{renderCell('subsidiesState', idx, 'amount', item.amount, true)}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{renderCell('subsidiesState', idx, 'condition', item.condition)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subventions EPCI (Orange - Seulement si dispo ex: MEL) */}
          {displayData.subsidiesEPCI && (
            <div className="border rounded-lg overflow-hidden border-orange-200">
                <div className="bg-orange-100 px-4 py-2 border-b border-orange-200">
                <h4 className="font-bold text-orange-900">Aides EPCI ({displayData.name})</h4>
                </div>
                <table className="w-full text-sm">
                <thead className="bg-orange-50 text-orange-800">
                    <tr>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left w-32">Montant</th>
                    <th className="px-3 py-2 text-left">Condition</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-100">
                    {displayData.subsidiesEPCI.map((item, idx) => (
                    <tr key={idx} className="hover:bg-orange-50/50">
                        <td className="px-3 py-2 font-medium text-gray-700">{renderCell('subsidiesEPCI', idx, 'type', item.type)}</td>
                        <td className="px-3 py-2 text-orange-700">{renderCell('subsidiesEPCI', idx, 'amount', item.amount, true)}</td>
                        <td className="px-3 py-2 text-gray-500 text-xs">{renderCell('subsidiesEPCI', idx, 'condition', item.condition)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}

          {/* Aides NPNRU (Rose/Violet) */}
          <div className="border rounded-lg overflow-hidden border-pink-200">
            <div className="bg-pink-100 px-4 py-2 border-b border-pink-200">
              <h4 className="font-bold text-pink-900">Aides NPNRU</h4>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-pink-50 text-pink-800">
                <tr>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left w-32">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {displayData.subsidiesNPNRU.map((item, idx) => (
                  <tr key={idx} className="hover:bg-pink-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{renderCell('subsidiesNPNRU', idx, 'type', item.type)}</td>
                    <td className="px-3 py-2 text-pink-700">{renderCell('subsidiesNPNRU', idx, 'amount', item.amount, true)}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{renderCell('subsidiesNPNRU', idx, 'condition', item.condition)}</td>
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
                  <th className="px-3 py-2 text-left w-32">Montant</th>
                  <th className="px-3 py-2 text-left">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {displayData.subsidiesCD.map((item, idx) => (
                  <tr key={idx} className="hover:bg-green-50/50">
                    <td className="px-3 py-2 font-medium text-gray-700">{renderCell('subsidiesCD', idx, 'type', item.type)}</td>
                    <td className="px-3 py-2 text-green-700">{renderCell('subsidiesCD', idx, 'amount', item.amount, true)}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{renderCell('subsidiesCD', idx, 'condition', item.condition)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Colonne Droite : Marges et Loyers */}
        <div className="space-y-6">
          
          {/* Marges Locales (Orange ou Rouge si absence) */}
          <div className={`border rounded-lg overflow-hidden ${displayData.hasMargins ? 'border-orange-200' : 'border-red-200'}`}>
            <div className={`${displayData.hasMargins ? 'bg-orange-100 border-orange-200' : 'bg-red-50 border-red-200'} px-4 py-2 border-b flex justify-between items-center`}>
              <h4 className={`font-bold ${displayData.hasMargins ? 'text-orange-900' : 'text-red-600'} flex items-center gap-2`}>
                <Percent className="w-4 h-4" /> 
                {displayData.hasMargins ? 'Marges Locales' : 'ABSENCE DE MARGES LOCALES'}
              </h4>
            </div>
            
            {displayData.margins && (
                <table className="w-full text-sm">
                <thead className={`${displayData.hasMargins ? 'bg-orange-50 text-orange-800' : 'bg-red-50 text-red-800'}`}>
                    <tr>
                    <th className="px-3 py-2 text-left">Référentiel / Critère</th>
                    <th className="px-3 py-2 text-left w-20">Produit</th>
                    <th className="px-3 py-2 text-left w-20">Marge</th>
                    </tr>
                </thead>
                <tbody className={`divide-y ${displayData.hasMargins ? 'divide-orange-100' : 'divide-red-100'}`}>
                    {displayData.margins.map((item, idx) => (
                    <tr key={idx} className={`${displayData.hasMargins ? 'hover:bg-orange-50/50' : 'hover:bg-red-50/50'} ${item.type.includes('Divers') ? 'bg-gray-50' : ''}`}>
                        <td className="px-3 py-2 text-gray-700">{renderCell('margins', idx, 'type', item.type)}</td>
                        <td className="px-3 py-2 text-xs font-semibold text-gray-500">{renderCell('margins', idx, 'product', item.product)}</td>
                        <td className="px-3 py-2 font-bold text-gray-700">{renderCell('margins', idx, 'margin', item.margin, true)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
          </div>

          {/* Loyers Accessoires (Violet ou Rouge si absence) */}
          <div className={`border rounded-lg overflow-hidden ${displayData.hasRents ? 'border-purple-200' : 'border-red-200'}`}>
            <div className={`${displayData.hasRents ? 'bg-purple-100 border-purple-200' : 'bg-red-50 border-red-200'} px-4 py-2 border-b`}>
              <h4 className={`font-bold ${displayData.hasRents ? 'text-purple-900' : 'text-red-600'} flex items-center gap-2`}>
                <Home className="w-4 h-4" /> 
                {displayData.hasRents ? 'Loyers Accessoires' : 'ABSENCE DE LOYERS ACCESSOIRES'}
              </h4>
            </div>
            
            {displayData.accessoryRents && (
                <table className="w-full text-sm">
                <thead className={`${displayData.hasRents ? 'bg-purple-50 text-purple-800' : 'bg-red-50 text-red-800'}`}>
                    <tr>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Produit</th>
                    <th className="px-3 py-2 text-left w-24">Loyer Max</th>
                    <th className="px-3 py-2 text-left">Condition(s)</th>
                    </tr>
                </thead>
                <tbody className={`divide-y ${displayData.hasRents ? 'divide-purple-100' : 'divide-red-100'}`}>
                    {displayData.accessoryRents.map((item, idx) => (
                    <tr key={idx} className={displayData.hasRents ? 'hover:bg-purple-50/50' : 'hover:bg-red-50/50'}>
                        <td className="px-3 py-2 text-gray-700">{renderCell('accessoryRents', idx, 'type', item.type)}</td>
                        <td className="px-3 py-2 text-xs font-semibold text-gray-500">{renderCell('accessoryRents', idx, 'product', item.product)}</td>
                        <td className="px-3 py-2 font-bold text-gray-700">{renderCell('accessoryRents', idx, 'maxRent', item.maxRent, true)}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">{renderCell('accessoryRents', idx, 'condition', item.condition || '')}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
          </div>

        </div>
      </div>
      
      {/* Notes de bas de page */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
        {displayData.footnotes.map((note, idx) => (
          <p key={idx}>{note}</p>
        ))}
      </div>
    </div>
  );
};

export default ReferenceTable;
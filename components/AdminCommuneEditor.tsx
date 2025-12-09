
import React, { useState, useMemo } from 'react';
import { getAllCommunesData, saveAllCommunesData, CommuneDbEntry } from '../data/communesDb';
import { Save, X, Search, RotateCcw, Download } from 'lucide-react';

interface AdminCommuneEditorProps {
    onClose: () => void;
}

const AdminCommuneEditor: React.FC<AdminCommuneEditorProps> = ({ onClose }) => {
    const [data, setData] = useState<CommuneDbEntry[]>(getAllCommunesData());
    const [search, setSearch] = useState("");
    const [hasChanges, setHasChanges] = useState(false);

    const filteredData = useMemo(() => {
        if (!search) return data;
        const lower = search.toLowerCase();
        return data.filter(c => c.name.toLowerCase().includes(lower) || c.insee.includes(lower));
    }, [data, search]);

    const handleChange = (index: number, field: keyof CommuneDbEntry, value: any) => {
        // Find the actual index in the full data array if filtered
        const actualItem = filteredData[index];
        const realIndex = data.indexOf(actualItem);
        
        if (realIndex === -1) return;

        const newData = [...data];
        newData[realIndex] = { ...newData[realIndex], [field]: value };
        setData(newData);
        setHasChanges(true);
    };

    const handleSave = () => {
        saveAllCommunesData(data);
        setHasChanges(false);
        alert("Base de données mise à jour avec succès !");
    };

    const handleExport = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `communes_db_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[80vh] m-4 animate-fade-in">
            {/* Header */}
            <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold">Éditeur Base Communes</h3>
                    <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                        {data.length} communes
                    </span>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-1 text-sm border border-gray-600 rounded">
                        <Download className="w-4 h-4"/> Export JSON
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher une commune..." 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                </div>
                
                <div className="flex gap-3">
                     {hasChanges && (
                        <button 
                            onClick={() => {
                                if(confirm("Annuler les modifications ?")) {
                                    setData(getAllCommunesData());
                                    setHasChanges(false);
                                }
                            }}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg bg-white border shadow-sm transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" /> Annuler
                        </button>
                    )}
                    <button 
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg shadow-md transition-all font-bold ${hasChanges ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        <Save className="w-4 h-4" /> Enregistrer
                    </button>
                </div>
            </div>

            {/* Table Scrollable */}
            <div className="flex-grow overflow-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 shadow-sm z-10">
                        <tr>
                            <th className="px-4 py-3 border-b">INSEE</th>
                            <th className="px-4 py-3 border-b">Nom</th>
                            <th className="px-4 py-3 border-b w-64">EPCI</th>
                            <th className="px-4 py-3 border-b w-32">Dir. Terr.</th>
                            <th className="px-4 py-3 border-b w-20 text-center">Pop.</th>
                            <th className="px-4 py-3 border-b w-20 text-center">Zone Acc</th>
                            <th className="px-4 py-3 border-b w-20 text-center">Zone Loc</th>
                            <th className="px-4 py-3 border-b w-20 text-center">SRU %</th>
                            <th className="px-4 py-3 border-b w-20 text-center">Cible %</th>
                            <th className="px-4 py-3 border-b w-24 text-center">Exonérée</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((commune, index) => (
                            <tr key={commune.insee} className="hover:bg-blue-50 group">
                                <td className="px-4 py-2 text-gray-500 font-mono text-xs">{commune.insee}</td>
                                <td className="px-4 py-2 font-bold text-gray-800">{commune.name}</td>
                                <td className="px-4 py-2">
                                    <input 
                                        type="text" 
                                        value={commune.epci} 
                                        onChange={e => handleChange(index, 'epci', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent focus:border-brand-500 focus:outline-none"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input 
                                        type="text" 
                                        value={commune.dirTerr || ''} 
                                        onChange={e => handleChange(index, 'dirTerr', e.target.value)}
                                        className="w-full bg-transparent border-b border-transparent focus:border-brand-500 focus:outline-none text-blue-700 font-medium"
                                        placeholder="-"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input 
                                        type="number" 
                                        value={commune.pop} 
                                        onChange={e => handleChange(index, 'pop', parseInt(e.target.value))}
                                        className="w-20 text-center bg-gray-50 rounded focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select 
                                        value={commune.zoneAcc || ''} 
                                        onChange={e => handleChange(index, 'zoneAcc', e.target.value)}
                                        className="bg-transparent border border-gray-200 rounded px-1 py-0.5 text-xs font-bold text-gray-700"
                                    >
                                        <option value="">-</option>
                                        <option value="A">A</option>
                                        <option value="B1">B1</option>
                                        <option value="B2">B2</option>
                                        <option value="C">C</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <select 
                                        value={commune.zoneLoc || ''} 
                                        onChange={e => handleChange(index, 'zoneLoc', e.target.value)}
                                        className="bg-transparent border border-gray-200 rounded px-1 py-0.5 text-xs font-bold text-gray-700"
                                    >
                                        <option value="">-</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={commune.sruRate ?? ''} 
                                        onChange={e => handleChange(index, 'sruRate', parseFloat(e.target.value))}
                                        className="w-16 text-center border-b border-gray-200 focus:border-brand-500 outline-none"
                                        placeholder="-"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center text-gray-400 text-xs">
                                    {commune.targetRate}%
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={commune.exempt} 
                                        onChange={e => handleChange(index, 'exempt', e.target.checked)}
                                        className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        Aucune commune trouvée pour "{search}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCommuneEditor;

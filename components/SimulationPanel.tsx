
import React, { useState, useEffect } from 'react';
import { ReferenceData, SubsidyRow } from '../types';
import { parseCurrency, formatCurrency } from '../utils/stringHelpers';
import { Calculator, AlertCircle, ChevronDown, ChevronUp, Layers, CheckSquare, Square } from 'lucide-react';

interface SimulationPanelProps {
  referenceData: ReferenceData;
}

interface SimulationLine extends SubsidyRow {
  category: 'STATE' | 'EPCI' | 'CD' | 'NPNRU';
  unitPrice: number;
  quantity: number;
  total: number;
}

// État global des typologies de logements
interface HousingInputs {
  plai: number;
  plai_aa: number;
  plai_adapte: number;
  plai_octave: number;
  plus: number;
  plus_aa: number;
  pls: number;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ referenceData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [includeCD, setIncludeCD] = useState(true); // Option pour inclure/exclure le CD

  // Saisies centralisées
  const [inputs, setInputs] = useState<HousingInputs>({
    plai: 0,
    plai_aa: 0,
    plai_adapte: 0,
    plai_octave: 0,
    plus: 0,
    plus_aa: 0,
    pls: 0
  });

  const [lines, setLines] = useState<SimulationLine[]>([]);

  // Fonction utilitaire pour déterminer la quantité applicable à une ligne de subvention
  const calculateQuantityForLine = (lineType: string, category: string, currentInputs: HousingInputs): number => {
      const type = lineType.toLowerCase();
      
      // --- LOGIQUE D'EXCLUSION ---
      if (category === 'CD' && !includeCD) return 0;

      // --- LOGIQUES SPÉCIFIQUES ---

      // 1. PLAI ADAPTÉ (Règle <3 vs >3)
      if (type.includes("plai adapté")) {
          // Cas Structure / Dégradé
          if (type.includes("structure")) {
              return currentInputs.plai_adapte > 3 ? currentInputs.plai_adapte : 0;
          }
          // Cas Ordinaire / Droit commun (par défaut si pas structure)
          return currentInputs.plai_adapte <= 3 ? currentInputs.plai_adapte : 0;
      }

      // 2. PLAI OCTAVE
      if (type.includes("octave")) {
          return currentInputs.plai_octave;
      }

      // 3. AA (Super Bonus / Mega Bonus)
      // Attention : Certaines lignes "PLAI" génériques englobent aussi les AA, d'autres sont spécifiques.
      
      // Si la ligne spécifie "AA" ou "Super Bonus" ou "Mega Bonus"
      if (type.includes(" aa") || type.includes("-aa") || type.includes("bonus")) {
          if (type.includes("plai")) return currentInputs.plai_aa;
          if (type.includes("plus")) return currentInputs.plus_aa;
          if (type.includes("pls")) return 0; // Rarement de bonus AA sur PLS mais possible
      }

      // --- LOGIQUES GÉNÉRIQUES (Droit commun) ---
      
      // Si la ligne est une ligne générique (ex: "CD PLAI", "Subvention PLAI"), 
      // elle doit souvent sommer le PLAI droit commun + PLAI AA + Octave (si pas de ligne dédiée).
      // Pour simplifier dans ce simulateur, on va essayer de matcher au plus précis.

      // CD PLAI (Générique Département) : Prend souvent tout le PLAI
      if (category === 'CD' && type === "cd plai") {
          return currentInputs.plai + currentInputs.plai_aa + currentInputs.plai_octave;
      }
      if (category === 'CD' && type === "cd plus") {
          return currentInputs.plus + currentInputs.plus_aa;
      }
      if (category === 'CD' && type === "cd pls") {
          return currentInputs.pls;
      }

      // Pour l'État et EPCI, on sépare généralement mieux
      if (type.includes("plai")) {
          // Si c'est juste "PLAI" ou "PLAI - Droit Commun" sans mention AA/Octave/Adapté
          if (!type.includes("aa") && !type.includes("octave") && !type.includes("adapté")) {
              return currentInputs.plai;
          }
      }

      if (type.includes("plus")) {
           if (!type.includes("aa")) {
               return currentInputs.plus;
           }
      }

      if (type.includes("pls")) {
          return currentInputs.pls;
      }

      return 0;
  };

  // Recalcul des lignes quand les inputs ou les options changent
  useEffect(() => {
    const newLines: SimulationLine[] = [];

    const processRows = (rows: SubsidyRow[] | undefined, category: 'STATE' | 'EPCI' | 'CD' | 'NPNRU') => {
      if (!rows) return;
      rows.forEach(row => {
        const unitPrice = parseCurrency(row.amount);
        const quantity = calculateQuantityForLine(row.type, category, inputs);
        
        newLines.push({
          ...row,
          category,
          unitPrice,
          quantity,
          total: quantity * unitPrice
        });
      });
    };

    processRows(referenceData.subsidiesState, 'STATE');
    processRows(referenceData.subsidiesEPCI, 'EPCI');
    processRows(referenceData.subsidiesCD, 'CD');
    processRows(referenceData.subsidiesNPNRU, 'NPNRU');

    setLines(newLines);
  }, [referenceData, inputs, includeCD]);

  // Handler pour changer les inputs globaux
  const handleInputChange = (field: keyof HousingInputs, value: string) => {
      const val = parseInt(value) || 0;
      setInputs(prev => ({ ...prev, [field]: val }));
  };

  // Handler pour override manuel dans le tableau (optionnel, mais pratique)
  const handleManualLineChange = (index: number, val: string) => {
    const qty = parseInt(val) || 0;
    setLines(prev => {
      const newLines = [...prev];
      newLines[index] = {
        ...newLines[index],
        quantity: qty,
        total: qty * newLines[index].unitPrice
      };
      return newLines;
    });
  };

  const totals = {
    STATE: lines.filter(l => l.category === 'STATE').reduce((acc, curr) => acc + curr.total, 0),
    EPCI: lines.filter(l => l.category === 'EPCI').reduce((acc, curr) => acc + curr.total, 0),
    CD: lines.filter(l => l.category === 'CD').reduce((acc, curr) => acc + curr.total, 0),
    NPNRU: lines.filter(l => l.category === 'NPNRU').reduce((acc, curr) => acc + curr.total, 0),
  };

  const grandTotal = totals.STATE + totals.EPCI + totals.CD + totals.NPNRU;

  if (!isOpen) {
      return (
          <div className="mt-8 flex justify-center">
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-bold transition-transform hover:scale-105"
            >
                <Calculator className="w-5 h-5" />
                Simuler un projet (Calculateur)
                <ChevronDown className="w-4 h-4" />
            </button>
          </div>
      );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden animate-fade-in">
      <div className="bg-brand-600 px-6 py-4 flex justify-between items-center text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Simulateur de Projet
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-brand-100 hover:text-white">
            <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6">
        {/* SECTION SAISIE GLOBALE */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-600" /> 
                    1. Définissez votre programme (Nombre de logements)
                </h4>
                
                {/* Option CD */}
                <button 
                    onClick={() => setIncludeCD(!includeCD)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${includeCD ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white text-gray-500 border-gray-300'}`}
                >
                    {includeCD ? <CheckSquare className="w-4 h-4"/> : <Square className="w-4 h-4"/>}
                    Inclure aides Département
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InputBox label="PLAI (Droit commun)" value={inputs.plai} onChange={(v) => handleInputChange('plai', v)} color="blue" />
                <InputBox label="PLAI Adapté" value={inputs.plai_adapte} onChange={(v) => handleInputChange('plai_adapte', v)} color="indigo" sub="(Règle auto <3 ou >3)" />
                <InputBox label="PLAI AA (Super Bonus)" value={inputs.plai_aa} onChange={(v) => handleInputChange('plai_aa', v)} color="purple" />
                <InputBox label="PLAI Octave" value={inputs.plai_octave} onChange={(v) => handleInputChange('plai_octave', v)} color="cyan" />
                
                <div className="hidden md:block col-span-4 h-px bg-gray-200 my-1"></div>

                <InputBox label="PLUS (Droit commun)" value={inputs.plus} onChange={(v) => handleInputChange('plus', v)} color="orange" />
                <InputBox label="PLUS AA (Mega Bonus)" value={inputs.plus_aa} onChange={(v) => handleInputChange('plus_aa', v)} color="red" />
                <InputBox label="PLS" value={inputs.pls} onChange={(v) => handleInputChange('pls', v)} color="green" />
            </div>
        </div>

        {/* TABLES RESULTATS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <SubTable category="STATE" title="2. Subventions État" color="blue" lines={lines} onChange={handleManualLineChange} />
                <SubTable category="EPCI" title={`3. Aides ${referenceData.name}`} color="orange" lines={lines} onChange={handleManualLineChange} />
            </div>
            <div className="space-y-6">
                 {/* Le tableau CD s'affiche grisé ou caché si désactivé */}
                 <div className={!includeCD ? "opacity-50 grayscale pointer-events-none" : ""}>
                    <SubTable category="CD" title="4. Aides Département (CD)" color="green" lines={lines} onChange={handleManualLineChange} />
                 </div>
                 
                 <SubTable category="NPNRU" title="5. Aides NPNRU (Si éligible)" color="pink" lines={lines} onChange={handleManualLineChange} />
                 
                 {/* Grand Total Card */}
                 <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg mt-6 sticky bottom-4">
                     <h4 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-2">Total Estimé des Subventions</h4>
                     <div className="text-4xl font-bold text-green-400 mb-4">{formatCurrency(grandTotal)}</div>
                     
                     <div className="space-y-2 text-sm border-t border-gray-700 pt-4">
                         <div className="flex justify-between">
                             <span>État</span>
                             <span>{formatCurrency(totals.STATE)}</span>
                         </div>
                         <div className="flex justify-between">
                             <span>EPCI ({referenceData.name})</span>
                             <span>{formatCurrency(totals.EPCI)}</span>
                         </div>
                         <div className={`flex justify-between ${!includeCD ? 'text-gray-600 line-through' : ''}`}>
                             <span>Département</span>
                             <span>{formatCurrency(totals.CD)}</span>
                         </div>
                         <div className="flex justify-between">
                             <span>NPNRU</span>
                             <span>{formatCurrency(totals.NPNRU)}</span>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <p>Calcul automatique basé sur les typologies saisies. Vous pouvez modifier manuellement les quantités dans les tableaux si nécessaire.</p>
        </div>
      </div>
    </div>
  );
};

// Petit composant pour les cases de saisie
const InputBox = ({ label, value, onChange, color, sub }: any) => {
    const colorClasses: any = {
        blue: 'focus:ring-blue-500 text-blue-900 bg-blue-50 border-blue-200',
        indigo: 'focus:ring-indigo-500 text-indigo-900 bg-indigo-50 border-indigo-200',
        purple: 'focus:ring-purple-500 text-purple-900 bg-purple-50 border-purple-200',
        cyan: 'focus:ring-cyan-500 text-cyan-900 bg-cyan-50 border-cyan-200',
        orange: 'focus:ring-orange-500 text-orange-900 bg-orange-50 border-orange-200',
        red: 'focus:ring-red-500 text-red-900 bg-red-50 border-red-200',
        green: 'focus:ring-emerald-500 text-emerald-900 bg-emerald-50 border-emerald-200',
    };
    const c = colorClasses[color] || colorClasses.blue;

    return (
        <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide truncate" title={label}>{label}</label>
            <input 
                type="number" 
                min="0"
                value={value || ''}
                placeholder="0"
                onChange={(e) => onChange(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-lg font-bold outline-none transition-all shadow-sm ${c}`}
            />
            {sub && <span className="text-[10px] text-gray-400 mt-1 italic">{sub}</span>}
        </div>
    );
};

const SubTable = ({ category, title, color, lines, onChange }: any) => {
    const categoryLines = lines.map((l: SimulationLine, idx: number) => ({...l, originalIndex: idx})).filter((l: SimulationLine) => l.category === category);
    
    if (categoryLines.length === 0) return null;

    const colorClasses: any = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-200' },
        green: { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
        pink: { bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-200' },
    };
    const c = colorClasses[color];

    return (
        <div className={`border rounded-lg overflow-hidden ${c.border}`}>
            <div className={`${c.bg} px-4 py-2 border-b ${c.border}`}>
                <h4 className={`font-bold ${c.text}`}>{title}</h4>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-gray-500 text-xs text-left">
                        <th className="px-3 py-1">Type de Subvention</th>
                        <th className="px-3 py-1 text-right">Montant U.</th>
                        <th className="px-3 py-1 text-center w-20">Qté</th>
                        <th className="px-3 py-1 text-right">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {categoryLines.map((line: any) => (
                        <tr key={line.originalIndex} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                                <div className="font-medium text-gray-700">{line.type}</div>
                                <div className="text-[10px] text-gray-400 truncate max-w-[200px]" title={line.condition}>{line.condition}</div>
                            </td>
                            <td className="px-3 py-2 text-right whitespace-nowrap text-gray-600">
                                {formatCurrency(line.unitPrice)}
                            </td>
                            <td className="px-3 py-2">
                                {/* Input grisé pour montrer que c'est calculé, mais modifiable si besoin */}
                                <input 
                                    type="number" 
                                    min="0"
                                    value={line.quantity || ''}
                                    placeholder="0"
                                    onChange={(e) => onChange(line.originalIndex, e.target.value)}
                                    className="w-16 border border-gray-200 bg-gray-50 text-gray-600 rounded text-center py-1 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none transition-colors"
                                />
                            </td>
                            <td className="px-3 py-2 text-right font-bold text-gray-800">
                                {line.total > 0 ? formatCurrency(line.total) : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SimulationPanel;

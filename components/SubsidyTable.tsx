import React from 'react';
import { Subsidy } from '../types';
import { Info, Euro } from 'lucide-react';

interface SubsidyTableProps {
  subsidies: Subsidy[];
}

const SubsidyTable: React.FC<SubsidyTableProps> = ({ subsidies }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-8">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Euro className="w-5 h-5 text-brand-600" />
          Aides & Marges Locales (Détail)
        </h3>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">Données estimatives</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Estimé</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détail Marge Locale (EPCI/Dept)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subsidies.map((subsidy, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-brand-900">{subsidy.housingType}</div>
                  <div className="text-xs text-gray-500 mt-1 max-w-[150px] truncate" title={subsidy.description}>{subsidy.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {subsidy.amountEstimate}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                    <span>{subsidy.localAid}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 italic">
                  {subsidy.eligibility}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubsidyTable;

import React from 'react';
import { Sparkles } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  alert?: boolean;
  isAiGenerated?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subValue, icon, alert = false, isAiGenerated = false }) => {
  return (
    <div className={`relative bg-white rounded-xl shadow-md p-6 border-l-4 ${alert ? 'border-red-500' : 'border-brand-500'} flex items-start justify-between overflow-hidden group`}>
      {isAiGenerated && (
          <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-2 py-1 rounded-bl-lg text-[10px] font-bold uppercase flex items-center gap-1 border-b border-l border-blue-100" title="Donnée estimée par Intelligence Artificielle">
              <Sparkles className="w-3 h-3" /> IA
          </div>
      )}
      
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        <p className={`mt-1 text-2xl font-bold ${isAiGenerated ? 'text-blue-900' : 'text-gray-900'}`}>{value}</p>
        {subValue && <p className="mt-1 text-sm text-gray-600">{subValue}</p>}
      </div>
      {icon && <div className="text-brand-600 p-2 bg-brand-50 rounded-lg mt-2">{icon}</div>}
    </div>
  );
};

export default StatsCard;

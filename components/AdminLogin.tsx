import React, { useState } from 'react';
import { Lock, Unlock, X } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  onLogout: () => void;
  isAdmin: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onLogout, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '1920') {
      onLogin();
      setIsOpen(false);
      setCode('');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isAdmin) {
      return (
          <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm">
              <Unlock className="w-4 h-4" /> Mode Admin Actif (Déconnexion)
          </button>
      )
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm"
        title="Accès Administrateur"
      >
        <Lock className="w-4 h-4" /> Admin
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-gray-800">Accès Administrateur</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-sm text-gray-600 mb-4">Entrez le code de sécurité pour modifier les tableaux de référence.</p>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code d'accès"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none"
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2">Code incorrect.</p>}
              <div className="mt-6 flex justify-end">
                <button 
                  type="submit" 
                  className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;

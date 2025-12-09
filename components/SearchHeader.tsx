import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { searchCommunes } from '../data/communes';

interface SearchHeaderProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.length > 1) {
      const results = searchCommunes(val);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    onSearch(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      onSearch(searchTerm);
    }
  };

  return (
    <div className="bg-gradient-to-r from-brand-700 to-brand-900 py-16 px-4 sm:px-6 lg:px-8 text-white shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Marges Locales & Habitat 59
        </h1>
        <p className="text-xl text-brand-100 mb-8">
          Retrouvez les zonages, données SRU et aides locales (EPCI, Département) pour toutes les communes du Nord.
        </p>

        <div ref={wrapperRef} className="relative max-w-xl mx-auto z-50">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <MapPin className="absolute left-4 w-6 h-6 text-gray-400 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                placeholder="Entrez le nom d'une commune (ex: Pérenchies...)"
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 bg-white shadow-xl focus:ring-4 focus:ring-brand-500/50 focus:outline-none transition-all text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-full transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </div>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full bg-white mt-2 rounded-xl shadow-2xl overflow-hidden text-left border border-gray-100">
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-6 py-3 hover:bg-brand-50 text-gray-800 cursor-pointer border-b last:border-0 border-gray-50 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

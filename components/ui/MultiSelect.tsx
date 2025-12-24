'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDownIcon, CheckIcon, XIcon } from '@/components/icons';

export interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  error?: string;
  placeholder?: string;
}

export default function MultiSelect({
  label,
  options,
  selectedIds,
  onChange,
  error,
  placeholder = 'Select options...',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = useCallback(
    (id: string) => {
      onChange(selectedIds.includes(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id]);
    },
    [selectedIds, onChange]
  );

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all flex items-center justify-between`}
      >
        <span className={selectedIds.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
          {selectedIds.length === 0 ? placeholder : `${selectedIds.length} selected`}
        </span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-dark-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${isSelected ? 'bg-gray-50' : ''}`}
              >
                <span className="text-gray-900">{option.label}</span>
                {isSelected && <CheckIcon className="w-5 h-5 text-[#FF6B35]" />}
              </button>
            );
          })}
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <span
              key={option.id}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700"
            >
              {option.label}
              <button
                type="button"
                onClick={() => toggleOption(option.id)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import Input from '@/components/ui/Input';
import { SearchIcon } from '@/components/icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search coaches...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <div className="relative">
      <Input type="text" placeholder={placeholder} value={query} onChange={handleChange} className="pl-12 mt-2" />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <SearchIcon className="w-5 h-5 text-gray-500 mt-2" />
      </div>
    </div>
  );
}

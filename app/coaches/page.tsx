'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Container from '@/components/layout/Container';
import PageHeader from '@/components/ui/PageHeader';
import DataState from '@/components/ui/DataState';
import SearchBar from '@/components/coaches/SearchBar';
import CoachCard from '@/components/coaches/CoachCard';
import { Coach } from '@/lib/types';

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/coaches')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch coaches');
        return res.json();
      })
      .then((data) => setCoaches(data.coaches))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load coaches'))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback((query: string) => setSearchQuery(query), []);

  const filteredCoaches = useMemo(() => {
    if (!searchQuery.trim()) return coaches;
    const q = searchQuery.toLowerCase();
    return coaches.filter(
      (c) => c.name.toLowerCase().includes(q) || c.speciality.toLowerCase().includes(q) || c.sport.toLowerCase().includes(q)
    );
  }, [coaches, searchQuery]);

  return (
    <>
      <PageHeader
        badge="COACHES"
        title="Find Your Coach"
        description="Browse our team of expert coaches and find the perfect match for your training needs."
      />

      <div className="texture-dots bg-[#FAFAFA]">
        <Container>
          <section className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </section>

          <section className="pb-16">
            <DataState
              loading={loading}
              error={error}
              data={filteredCoaches}
              emptyText="No coaches found."
              skeletonType="coach"
              skeletonCount={6}
            >
              {(data) => (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {data.map((coach) => (
                    <CoachCard key={coach.id} coach={coach} />
                  ))}
                </div>
              )}
            </DataState>
          </section>
        </Container>
      </div>
    </>
  );
}

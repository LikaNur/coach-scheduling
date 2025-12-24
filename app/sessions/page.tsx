'use client';

import { useEffect, useState, useMemo } from 'react';
import Container from '@/components/layout/Container';
import PageHeader from '@/components/ui/PageHeader';
import DataState from '@/components/ui/DataState';
import SessionCard from '@/components/sessions/SessionCard';
import { SessionWithSlot, Coach, Athlete } from '@/lib/types';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<SessionWithSlot[]>([]);
  const [coaches, setCoaches] = useState<Map<string, Coach>>(new Map());
  const [athletes, setAthletes] = useState<Map<string, Athlete>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetch('/api/sessions'), fetch('/api/coaches'), fetch('/api/athletes')])
      .then(async ([sessionsRes, coachesRes, athletesRes]) => {
        if (!sessionsRes.ok || !coachesRes.ok || !athletesRes.ok) throw new Error('Failed to fetch data');
        const [sessionsData, coachesData, athletesData] = await Promise.all([sessionsRes.json(), coachesRes.json(), athletesRes.json()]);
        setSessions(sessionsData.sessions);
        setCoaches(new Map(coachesData.coaches.map((c: Coach) => [c.id, c])));
        setAthletes(new Map(athletesData.athletes.map((a: Athlete) => [a.id, a])));
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load sessions'))
      .finally(() => setLoading(false));
  }, []);

  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [sessions]
  );

  return (
    <>
      <PageHeader
        badge="SESSIONS"
        title="Upcoming Sessions"
        description="View and manage all scheduled training sessions."
      />

      <div className="texture-lanes bg-[#FAFAFA]">
        <Container>
          <section className="pb-16">
            <DataState
              loading={loading}
              error={error}
              data={sortedSessions}
              emptyText="No sessions scheduled yet."
              skeletonType="session"
              skeletonCount={6}
            >
              {(data) => (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {data.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      coach={coaches.get(session.coachId)}
                      athletes={session.athleteIds.map((id) => athletes.get(id)).filter((a): a is Athlete => !!a)}
                    />
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

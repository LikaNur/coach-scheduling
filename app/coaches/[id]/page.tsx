'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/layout/Container';
import CoachProfile from '@/components/coaches/CoachProfile';
import SlotList from '@/components/slots/SlotList';
import SessionForm from '@/components/sessions/SessionForm';
import { SkeletonProfile, SkeletonGrid } from '@/components/ui/Skeleton';
import { Coach, Slot } from '@/lib/types';

export default function CoachDetailPage() {
  const { id: coachId } = useParams() as { id: string };
  const router = useRouter();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoachData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/coaches/${coachId}`);
      if (response.status === 404) {
        router.push('/coaches');
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch coach');
      const data = await response.json();
      setCoach(data.coach);
      setSlots(data.slots || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coach');
    } finally {
      setLoading(false);
    }
  }, [coachId, router]);

  useEffect(() => {
    if (coachId) fetchCoachData();
  }, [coachId, fetchCoachData]);

  if (loading) {
    return (
      <>
        <div className="section-hero">
          <Container>
            <section className="pt-10 pb-8 md:pt-12">
              <SkeletonProfile />
            </section>
          </Container>
        </div>
        <div className="texture-grid bg-[#FAFAFA]">
          <Container>
            <section className="py-8">
              <div className="mb-6">
                <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
              </div>
              <SkeletonGrid count={3} type="slot" />
            </section>
          </Container>
        </div>
      </>
    );
  }

  if (error || !coach) {
    return (
      <div className="texture-grid bg-[#FAFAFA] min-h-[60vh]">
        <Container>
          <div className="py-16 text-center">
            <p className="text-red-500">Error: {error || 'Coach not found'}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <div className="section-hero">
        <Container>
          <section className="pt-10 pb-8 md:pt-12">
            <CoachProfile coach={coach} />
          </section>
        </Container>
      </div>

      <div className="texture-grid bg-[#FAFAFA]">
        <Container>
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Availability</h2>
              <p className="text-gray-600 text-sm">View available time slots for booking sessions.</p>
            </div>
            <SlotList slots={slots} />
          </section>
        </Container>
      </div>

      <div className="texture-dots bg-[#F5F5F5]">
        <Container>
          <section className="py-8 pb-16">
            <SessionForm coachId={coach.id} slots={slots} onSessionCreated={fetchCoachData} />
          </section>
        </Container>
      </div>
    </>
  );
}

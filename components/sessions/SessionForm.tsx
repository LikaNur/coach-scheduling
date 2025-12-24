'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import MultiSelect, { Option } from '@/components/ui/MultiSelect';
import { Slot, Athlete } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface SessionFormProps {
  coachId: string;
  slots: Slot[];
  onSessionCreated?: () => void;
}

export default function SessionForm({ coachId, slots, onSessionCreated }: SessionFormProps) {
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [selectedAthleteIds, setSelectedAthleteIds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/athletes')
      .then((res) => res.json())
      .then((data) => setAthletes(data.athletes))
      .catch((err) => console.error('Error fetching athletes:', err));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(false);

      if (!selectedSlotId) {
        setError('Please select an available time slot');
        return;
      }

      if (selectedAthleteIds.length === 0) {
        setError('Please select at least one athlete');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            coachId,
            slotId: selectedSlotId,
            athleteIds: selectedAthleteIds,
            notes: notes.trim() || undefined,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create session');

        setSelectedSlotId('');
        setSelectedAthleteIds([]);
        setNotes('');
        setSuccess(true);
        onSessionCreated?.();
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create session');
      } finally {
        setLoading(false);
      }
    },
    [coachId, selectedSlotId, selectedAthleteIds, notes, onSessionCreated]
  );

  const availableSlots = useMemo(() => slots.filter((slot) => slot.status === 'available'), [slots]);
  const athleteOptions: Option[] = useMemo(
    () => athletes.map((a) => ({ id: a.id, label: `${a.name} (${a.sport})` })),
    [athletes]
  );

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Session</h2>
        <p className="text-gray-600">Select an available time slot and assign athletes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Time Slot</label>
          {availableSlots.length === 0 ? (
            <p className="text-gray-600 text-sm">No available slots for this coach.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {availableSlots.map((slot) => {
                const { date, time } = formatDateShort(slot.start);
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedSlotId === slot.id ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <p className="text-gray-900 font-medium">{date}</p>
                    <p className="text-gray-600 text-sm">{time}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <MultiSelect
          label="Select Athletes"
          options={athleteOptions}
          selectedIds={selectedAthleteIds}
          onChange={setSelectedAthleteIds}
          error={error && selectedAthleteIds.length === 0 ? error : undefined}
          placeholder="Choose athletes for this session..."
        />

        <Input
          label="Notes (Optional)"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
        />

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-700 text-sm">Session created successfully!</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button type="submit" variant="primary" disabled={loading || availableSlots.length === 0} className="w-full">
          {loading ? 'Creating...' : 'Create Session'}
        </Button>
      </form>
    </Card>
  );
}

import Card from '@/components/ui/Card';
import { SessionWithSlot, Coach, Athlete } from '@/lib/types';
import { formatDateLong, pluralize } from '@/lib/utils';

interface SessionCardProps {
  session: SessionWithSlot;
  coach?: Coach;
  athletes?: Athlete[];
}

export default function SessionCard({ session, coach, athletes = [] }: SessionCardProps) {
  const { date, time } = formatDateLong(session.slot?.start || session.createdAt);
  const sessionAthletes = athletes.filter((a) => session.athleteIds.includes(a.id));

  return (
    <Card>
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Date & Time</p>
            <p className="text-gray-900 font-semibold">{date}</p>
            <p className="text-gray-600 text-sm">{time}</p>
          </div>
        </div>

        {coach && (
          <div className="mb-3">
            <p className="text-sm text-gray-500 mb-1">Coach</p>
            <p className="text-[#FF6B35] font-medium">{coach.name}</p>
            <p className="text-gray-600 text-sm">{coach.speciality}</p>
          </div>
        )}

        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">Athletes</p>
          <p className="text-gray-900 font-medium">
            {session.athleteIds.length} {pluralize(session.athleteIds.length, 'athlete')}
          </p>
          {sessionAthletes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {sessionAthletes.map((athlete) => (
                <span key={athlete.id} className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700">
                  {athlete.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {session.notes && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Notes</p>
            <p className="text-gray-700 text-sm">{session.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

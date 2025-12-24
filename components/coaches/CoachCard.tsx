import Link from 'next/link';
import Card from '@/components/ui/Card';
import { ClockIcon } from '@/components/icons';
import { Coach } from '@/lib/types';

interface CoachCardProps {
  coach: Coach;
}

export default function CoachCard({ coach }: CoachCardProps) {
  return (
    <Link href={`/coaches/${coach.id}`}>
      <Card hover className="h-full">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{coach.name}</h3>
          <p className="text-[#FF6B35] text-sm font-medium mb-1">{coach.speciality}</p>
          <p className="text-gray-600 text-sm">{coach.sport}</p>
        </div>
        <div className="flex items-center text-gray-500 text-xs">
          <ClockIcon className="w-4 h-4 mr-1" />
          {coach.timezone}
        </div>
      </Card>
    </Link>
  );
}

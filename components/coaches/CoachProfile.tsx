import Badge from '@/components/ui/Badge';
import { Coach } from '@/lib/types';

interface CoachProfileProps {
  coach: Coach;
}

const PROFILE_FIELDS = [
  { key: 'speciality', label: 'Speciality', accent: true },
  { key: 'sport', label: 'Sport', accent: false },
  { key: 'timezone', label: 'Timezone', accent: false },
] as const;

export default function CoachProfile({ coach }: CoachProfileProps) {
  return (
    <div>
      <Badge className="mb-4">COACH PROFILE</Badge>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{coach.name}</h1>
      <div className="space-y-3">
        {PROFILE_FIELDS.map((field) => (
          <div key={field.key}>
            <p className="text-sm text-gray-500 mb-1">{field.label}</p>
            <p className={`text-lg ${field.accent ? 'text-[#FF6B35] font-medium' : 'text-gray-700'}`}>
              {coach[field.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

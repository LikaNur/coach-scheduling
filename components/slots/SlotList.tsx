import { Slot } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface SlotListProps {
  slots: Slot[];
  selectedSlotId?: string;
  onSelectSlot?: (slotId: string) => void;
}

export default function SlotList({ slots, selectedSlotId, onSelectSlot }: SlotListProps) {
  const availableSlots = slots.filter((slot) => slot.status === 'available');

  if (availableSlots.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-500">No available time slots at the moment.</p>
        <p className="text-gray-400 text-sm mt-1">Check back later for new availability.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {availableSlots.map((slot) => {
        const { date, time } = formatDateShort(slot.start);
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelectSlot?.(slot.id)}
            className="text-left cursor-pointer"
          >
            <Card className={selectedSlotId === slot.id ? 'border-[#FF6B35] bg-orange-50' : 'hover:border-gray-300'}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">Available</span>
              </div>
              <p className="text-gray-900 font-medium mb-1">{date}</p>
              <p className="text-gray-600 text-sm">{time}</p>
            </Card>
          </button>
        );
      })}
    </div>
  );
}

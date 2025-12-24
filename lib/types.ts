export type SlotStatus = 'available' | 'booked';

export interface Coach {
  id: string;
  name: string;
  speciality: string;
  sport: string;
  timezone: string;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  squad: string;
}

export interface Slot {
  id: string;
  coachId: string;
  start: string;
  end: string;
  status: SlotStatus;
}

export interface Session {
  id: string;
  coachId: string;
  slotId: string;
  athleteIds: string[];
  notes?: string;
  createdAt: string;
}

export interface SessionWithSlot extends Session {
  slot?: Slot | null;
}

export interface SeedData {
  coaches: Coach[];
  athletes: Athlete[];
  availability: Slot[];
  sessions: Session[];
}

export interface CreateSessionResult {
  success: boolean;
  session?: Session;
  error?: string;
}

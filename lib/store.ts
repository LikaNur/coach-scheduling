import { Coach, Athlete, Slot, Session, SeedData, CreateSessionResult } from './types';
import seedData from '@/data/seed.json';

class DataStore {
  private coaches: Map<string, Coach> = new Map();
  private athletes: Map<string, Athlete> = new Map();
  private slots: Map<string, Slot> = new Map();
  private sessions: Map<string, Session> = new Map();

  constructor() {
    this.loadSeedData();
  }

  private loadSeedData(): void {
    const data = seedData as SeedData;
    data.coaches.forEach((coach) => this.coaches.set(coach.id, coach));
    data.athletes.forEach((athlete) => this.athletes.set(athlete.id, athlete));
    data.availability.forEach((slot) => this.slots.set(slot.id, slot));
    data.sessions.forEach((session) => this.sessions.set(session.id, session));
  }

  getCoaches(): Coach[] {
    return Array.from(this.coaches.values());
  }

  getCoachById(id: string): Coach | undefined {
    return this.coaches.get(id);
  }

  getAthletes(): Athlete[] {
    return Array.from(this.athletes.values());
  }

  getAthleteById(id: string): Athlete | undefined {
    return this.athletes.get(id);
  }

  getSlotsByCoachId(coachId: string): Slot[] {
    return Array.from(this.slots.values()).filter((slot) => slot.coachId === coachId);
  }

  getSlotById(id: string): Slot | undefined {
    return this.slots.get(id);
  }

  getSessions(): Session[] {
    return Array.from(this.sessions.values());
  }

  getSessionById(id: string): Session | undefined {
    return this.sessions.get(id);
  }

  createSession(
    coachId: string,
    slotId: string,
    athleteIds: string[],
    notes?: string
  ): CreateSessionResult {
    const slot = this.getSlotById(slotId);
    
    if (!slot) {
      return { success: false, error: 'Slot not found' };
    }

    if (slot.coachId !== coachId) {
      return { success: false, error: 'Slot does not belong to this coach' };
    }

    if (slot.status !== 'available') {
      return { success: false, error: 'Slot is already booked' };
    }

    if (!athleteIds?.length) {
      return { success: false, error: 'At least one athlete must be selected' };
    }

    const invalidAthlete = athleteIds.find((id) => !this.getAthleteById(id));
    if (invalidAthlete) {
      return { success: false, error: `Athlete ${invalidAthlete} not found` };
    }

    const session: Session = {
      id: `session_${Date.now()}`,
      coachId,
      slotId,
      athleteIds,
      notes,
      createdAt: new Date().toISOString(),
    };

    slot.status = 'booked';
    this.sessions.set(session.id, session);

    return { success: true, session };
  }
}

const globalForStore = globalThis as unknown as { dataStore: DataStore | undefined };

export function getStore(): DataStore {
  if (!globalForStore.dataStore) {
    globalForStore.dataStore = new DataStore();
  }
  return globalForStore.dataStore;
}

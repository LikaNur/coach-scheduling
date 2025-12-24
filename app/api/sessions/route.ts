import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET() {
  try {
    const store = getStore();
    const sessions = store.getSessions();

    const enrichedSessions = sessions.map((session) => ({
      ...session,
      slot: store.getSlotById(session.slotId) || null,
    }));

    return NextResponse.json({ sessions: enrichedSessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coachId, slotId, athleteIds, notes } = body;

    if (!coachId || !slotId || !athleteIds || !Array.isArray(athleteIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: coachId, slotId, athleteIds' },
        { status: 400 }
      );
    }

    const store = getStore();
    const result = store.createSession(coachId, slotId, athleteIds, notes);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ session: result.session }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

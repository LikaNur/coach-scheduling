import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const store = getStore();
    const coachId = request.nextUrl.searchParams.get('coachId');

    if (!coachId) {
      return NextResponse.json({ error: 'coachId parameter is required' }, { status: 400 });
    }

    const slots = store.getSlotsByCoachId(coachId);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}

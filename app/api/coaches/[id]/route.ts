import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const store = getStore();
    const coach = store.getCoachById(id);

    if (!coach) {
      return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
    }

    const slots = store.getSlotsByCoachId(id);
    return NextResponse.json({ coach, slots });
  } catch (error) {
    console.error('Error fetching coach:', error);
    return NextResponse.json({ error: 'Failed to fetch coach' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const store = getStore();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');

    let coaches = store.getCoaches();

    if (search) {
      const searchLower = search.toLowerCase();
      coaches = coaches.filter(
        (coach) =>
          coach.name.toLowerCase().includes(searchLower) ||
          coach.speciality.toLowerCase().includes(searchLower) ||
          coach.sport.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({ coaches });
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return NextResponse.json({ error: 'Failed to fetch coaches' }, { status: 500 });
  }
}

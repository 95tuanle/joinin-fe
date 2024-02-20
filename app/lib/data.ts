import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';
import { CustomSession } from '@/app/lib/definitions';

export async function fetchUpcomingEvents() {
  noStore();
  try {
    const session = (await auth()) as CustomSession;
    const response = await fetch(
      `${process.env.JOININ_BE_API_URL}/events/upcoming`,
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      },
    );
    return await response.json();
  } catch (error) {
    console.error('Fail to fetch upcoming events:', error);
    throw new Error('Failed to fetch upcoming events.');
  }
}

export async function fetchJoinedEvents() {
  noStore();
  try {
    const session = (await auth()) as CustomSession;
    const response = await fetch(
      `${process.env.JOININ_BE_API_URL}/events/joined`,
      {
        headers: { Authorization: `Bearer ${session.access_token}` },
      },
    );
    return await response.json();
  } catch (error) {
    console.error('Fail to fetch joined events:', error);
    throw new Error('Failed to fetch joined events.');
  }
}

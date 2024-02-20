'use server';

import { CustomSession } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  startAt: z.string().transform((str) => new Date(str).getUTCMilliseconds),
  endAt: z.string().transform((str) => new Date(str).getUTCMilliseconds),
});

export async function getAllEvent() {
  const session = (await auth()) as CustomSession;
  const token = session.access_token;
  if (!token) {
    console.error('No token');
    return;
  }
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/event`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.error('Failed to fetch all event:', await res.json());
    return { message: 'Failed to fetch all event' };
  }
  return res.json();
}

export async function deleteEvent(eventId: String) {
  const session = (await auth()) as CustomSession;
  const token = session.access_token;
  if (!token) {
    console.error('No token');
    return;
  }
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/event/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.error('Failed to fetch all event:', await res.json());
    return { message: 'Failed to fetch all event' };
  }
  console.log('delete scessfully');
  revalidatePath('/home/event');
  return;
}

export async function joinEvent(eventId: String) {
  const session = (await auth()) as CustomSession;
  const token = session.access_token;

  if (!token) {
    console.error('No token');
    return;
  }

  const res = await fetch(
    `${process.env.JOININ_BE_API_URL}/event/${eventId}/join`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    },
  );

  if (!res.ok) {
    console.error('Failed to join event:', await res.json());
    return { message: 'Failed to Join' };
  }

  console.log('Join scessfully');
  return;
}

export async function quitEvent(eventId: String) {
  const session = (await auth()) as CustomSession;
  const token = session.access_token;

  if (!token) {
    console.error('No token');
    return;
  }

  const res = await fetch(
    `${process.env.JOININ_BE_API_URL}/event/${eventId}/quit`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    },
  );

  if (!res.ok) {
    console.error('Failed to join event:', await res.json());
    return { message: 'Failed to Join' };
  }

  console.log('Join scessfully');
  return;
}

export async function createEvent(formData: FormData) {
  try {
    const session = (await auth()) as CustomSession;
    const token = session.access_token;
    console.log('formData', formData);

    const parsedData = CreateEventSchema.safeParse({
      name: formData.get('title'),
      description: formData.get('description'),
      venue: formData.get('location'),
      startDate: formData.get('startAt'),
      endDate: formData.get('endAt'),
    });

    if (!parsedData.success) {
      console.dir(parsedData.error.format());
    }
    console.dir(formData);
    const res = await fetch(`${process.env.JOININ_BE_API_URL}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        location: formData.get('location'),
        startAt: formData.get('startAt'),
        endAt: formData.get('endAt'),
      }),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
    }
    console.log(error);
    console.error('fail to create event');
  }
  redirect('/home/event');
}

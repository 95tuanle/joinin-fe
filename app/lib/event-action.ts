'use server';

import { CustomSession } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type Event = {
  _id: String;
  eventName: String;
  eventDesc: String;
  eventVenue: String;
  eventStartDate: Date;
  eventEndDate: Date;
  eventOwner: String;
  eventparticipant: Array<String>;
};

const CreateEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  venue: z.string(),
  startDate: z.string().transform((str) => new Date(str).toISOString()),
  endDate: z.string().transform((str) => new Date(str).toISOString()),
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
      name: formData.get('eventName'),
      description: formData.get('eventDesc'),
      venue: formData.get('eventVenue'),
      startDate: formData.get('eventStartDate'),
      endDate: formData.get('eventEndDate'),
    });

    if (!parsedData.success) {
      console.dir(parsedData.error.format());
    }

    const res = await fetch(`${process.env.JOININ_BE_API_URL}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.get('eventName'),
        description: formData.get('eventDesc'),
        venue: formData.get('eventVenue'),
        startDate: formData.get('eventStartDate'),
        endDate: formData.get('eventEndDate'),
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

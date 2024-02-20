'use client';

import { getEventDetail, updateEvent } from '@/app/lib/event-action';
import UpdateEventForm from '@/components/UpdateEventForm';
import { Event } from '@/app/lib/definitions';

export default async function Page({ params }: { params: { slug: string } }) {
  const event: Event = await getEventDetail(params.slug);

  console.log(event);
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1 className="text-3xl">Modify Event</h1>
      <UpdateEventForm event={event} />
    </div>
  );
}

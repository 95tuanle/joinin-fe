import UpdateEventForm from '@/components/UpdateEventForm';
import { getEventDetail } from '@/app/lib/event-action';
import { Event } from '@/app/lib/definitions';

export default async function Page({ params }: { params: { slug: string } }) {
  const event: Event = await getEventDetail(params.slug);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1 className="text-3xl">Modify Event</h1>
      <UpdateEventForm
        id={event._id}
        title={event.title}
        description={event.description}
        location={event.location}
        startAt={event.startAt}
        endAt={event.endAt}
      />
    </div>
  );
}

import { AntonyEvent } from '@/app/lib/definitions';
import { getAllEvent } from '@/app/lib/event-action';
import EventCard from '@/components/EventCard';

export default async function Page() {
  const events: Array<AntonyEvent> | { message: string } = await getAllEvent();
  let contents;
  if (typeof events === 'object' && 'message' in events) {
    contents = <div> {events.message} </div>;
  } else {
    contents = events.map((event) => (
      <EventCard key={event._id} event={event} />
    ));
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-10">
      {contents}
    </main>
  );
}

import { AntonyEvent } from '@/app/lib/definitions';
import { getMyEvent } from '@/app/lib/event-action';
import EventCard from '@/components/EventCard';

export default async function Page() {
  const events: Array<AntonyEvent> | { message: string } = await getMyEvent();
  let contents;
  if (typeof events === 'object' && 'message' in events) {
    contents = <div> {events.message} </div>;
  } else {
    contents = events.map((event) => (
      <EventCard key={event._id} event={event} />
    ));
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-10 p-12">
      <div>
        <p className="text-4xl font-black text-gray-900 dark:text-white">
          Manage Event
        </p>
      </div>
      <div className="w-full grid grid-cols-1 gap-4 justify-between md:grid-cols-2 lg:grid-cols-3">
        {contents}
      </div>
    </main>
  );
}

import { auth } from '@/auth';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { CustomSession, Event } from '@/app/lib/definitions';
import { getAllEvent } from '@/app/lib/event-action';
import Link from 'next/link';
import EventCard from '@/components/EventCard';

export default async function Page() {
  const session = (await auth()) as CustomSession;
  const events: Array<Event> | { message: string } = await getAllEvent();
  let contents;
  if (typeof events === 'object' && 'message' in events) {
    contents = <div> {events.message} </div>;
  } else {
    contents = events.map((event) => (
      // <div
      //   key={event._id.toString()}
      //   className="relative mx-6 flex w-full flex-col space-y-2.5 border border-gray-50 rounded-md"
      // >
      //   <div className="text-black flex-1 rounded-lg px6 pb-4 pt-8 text-white space-y-2.5">
      //     <div className="text-center">
      //       <h1 className="text-4xl"> {event.title} </h1>
      //     </div>
      //     <div className="p-6 space-y-2">
      //       <div className="m-4">
      //         <p className="text-lg"> {event.description}</p>
      //       </div>
      //       <div className="flex flex-row items-center space-x-2">
      //         <CiLocationOn />
      //         <p> {event.location} </p>
      //       </div>
      //       <div className="flex flex-row items-center space-x-2">
      //         <CiCalendar />
      //         <p>
      //           {' '}
      //           {event.startAt.toString()} - {event.endAt.toString()}
      //         </p>
      //       </div>
      //       <div className="flex flex-col items-center">
      //         {event.organizer === session._id ||
      //         event.participants.includes(session._id || 'undefined') ? (
      //           <p>Joined!</p>
      //         ) : (
      //           <button className="bg-green-600 p-4 rounded-lg min-w-24">
      //             I&apos;m In!
      //           </button>
      //         )}
      //         {event.organizer === session._id && (
      //           <ActionButton eventId={event._id} actionType="DELETE" />
      //         )}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <EventCard event={event} />
    ));
  }

  return (
    <main className="flex flex-col items-center justify-center space-y-10">
      {contents}
      <Link
        href={'/home/event/create'}
        className="w-full items-center px-3 py-2 text-sm font-medium text-center text-white focus:ring-4 focus:outline-none bg-green-600 hover:bg-green-700 focus:ring-green-800"
      >
        <button>Create My Event</button>
      </Link>
    </main>
  );
}

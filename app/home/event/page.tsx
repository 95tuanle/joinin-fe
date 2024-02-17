import { auth } from '@/auth';
import { CiCalendar, CiLocationOn } from 'react-icons/ci';
import { CustomSession } from '@/app/lib/definitions';

type Event = {
  _id: String;
  eventName: String;
  eventDesc: String;
  eventVenue: String;
  eventStartDate: Date;
  eventEndDate: Date;
};

async function getAllEvent() {
  const session = (await auth()) as CustomSession;
  const res = await fetch(`${process.env.JOININ_BE_API_URL}/event`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (!res.ok) {
    console.error('Failed to fetch all event:', await res.json());
    return { message: 'Failed to fetch all event' };
  }
  return res.json();
}

export default async function Page() {
  const events: Array<Event> | { message: string } = await getAllEvent();
  let contents;
  if (typeof events === 'object' && 'message' in events) {
    contents = <div> {events.message} </div>;
  } else {
    contents = events.map((event) => (
      <div
        key={event._id.toString()}
        className="relative mx-6 flex w-full flex-col space-y-2.5 border border-gray-50 rounded-md"
      >
        <div className="text-black flex-1 rounded-lg px6 pb-4 pt-8 text-white space-y-2.5">
          <div className="text-center">
            <h1 className="text-4xl"> {event.eventName} </h1>
          </div>
          <div className="p-6 space-y-2">
            <div className="m-4">
              <p className="text-lg"> {event.eventDesc}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <CiLocationOn />
              <p> {event.eventVenue} </p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <CiCalendar />
              {/*<p> {event.eventStartDate.toLocaleDateString()} - {event.eventEndDate.toLocaleDateString()}</p>*/}
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-green-600 p-4 rounded-lg min-w-24">
                I&apos;m In!
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {contents}
      <button className="bg-green-600 w-full min-h-14">Create My Event</button>
    </main>
  );
}

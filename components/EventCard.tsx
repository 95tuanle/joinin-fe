import { Event } from '@/app/lib/definitions';
import ActionButton from '@/components/ActionButton';
import { CustomSession } from '@/app/lib/definitions';
import { auth } from '@/auth';

interface IProps {
  event: Event;
}

function unixTimestampToLocalDateTime(unixTimestamp: number) {
  // Create a new Date object with the Unix timestamp
  const localDate = new Date(unixTimestamp);

  // Return the local date and time string
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  return localDate.toLocaleString(undefined, options);
}

export default async function EventCard({ event }: IProps) {
  const session = (await auth()) as CustomSession;
  const startAtLocalDateTime = unixTimestampToLocalDateTime(event.startAt);
  const endAtLocalDateTime = unixTimestampToLocalDateTime(event.endAt);
  return (
    <div
      key={event._id}
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {event.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {event.description}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {event.location}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {startAtLocalDateTime}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {endAtLocalDateTime}
      </p>
      <div className="flex flex-col space-y-2.5">
        {event.organizer === session._id ||
        event.participants.includes(session._id || 'undefined') ? (
          <button className="cursor-not-allowed opacity-50 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
            Joined
          </button>
        ) : (
          <button className="items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            I&apos;m In!
          </button>
        )}
        {event.organizer === session._id && (
          <ActionButton eventId={event._id} actionType="EDIT" />
        )}
      </div>
    </div>
  );
}

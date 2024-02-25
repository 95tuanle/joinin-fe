import { CustomSession, Event } from '@/app/lib/definitions';
import ActionButton from '@/components/ActionButton';
import { auth } from '@/auth';
import { CiCalendar } from 'react-icons/ci';

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
      className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
      <div className="flex flex-row items-center space-x-2">
        <CiCalendar />
        <p>Start At</p>
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {startAtLocalDateTime}
      </p>
      <div className="flex flex-row items-center space-x-2">
        <CiCalendar />
        <p>End At</p>
      </div>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {endAtLocalDateTime}
      </p>
      <div className="flex flex-col space-y-2.5">
        {Action(event, session)}
        {event.organizer === session._id && (
          <ActionButton eventId={event._id} actionType="EDIT" />
        )}
      </div>
    </div>
  );
}

function Action(event: Event, session: CustomSession) {
  if (event.participants.includes(session._id || 'undefined')) {
    return <ActionButton actionType={'QUIT'} eventId={event._id} />;
  }

  if (
    !event.participants.includes(session._id || 'undefined') &&
    event.organizer !== session._id
  ) {
    return <ActionButton actionType={'JOIN'} eventId={event._id} />;
  }
}

import { fetchEventById } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utilities';
import { User } from '@/app/lib/definitions';

export default async function EventDetail({ _id }: { _id: string }) {
  try {
    const event = await fetchEventById(_id);
    return (
      <div className="text-black rounded-md bg-gray-50 mt-6 p-4 w-full max-w-sm">
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm leading-none">{event.description}</p>
          <p className="flex gap-1 text-sm">{event.location}</p>
          <div className="grid gap-0.5 text-sm">
            <p>Starts: {formatDateToLocal(event.startAt)}</p>
            <p>Ends: {formatDateToLocal(event.endAt)}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <p className="font-medium">
              {event.organizer.firstName + ' ' + event.organizer.lastName}
            </p>
          </div>
          <div className="grid gap-0.5 text-sm">
            <p>Participants:</p>
            <ul className="grid gap-1 pl-4">
              {event.participants.map((participant: User) => (
                <li key={participant._id}>
                  {participant.firstName + ' ' + participant.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch event by id:', error);
    return <div>Failed to fetch event by id.</div>;
  }
}

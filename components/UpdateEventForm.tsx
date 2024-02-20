import { updateEvent } from '@/app/lib/event-action';
import { Event } from '@/app/lib/definitions';
import Link from 'next/link';
import ActionButton from './ActionButton';

interface IProps {
  event: Event;
}

export default function UpdateEventForm({ event }: IProps) {
  return (
    <form action={updateEvent} className="max-w-sm mx-auto">
      <div className="mb-5">
        <input
          required
          type="text"
          name="id"
          value={event._id}
          className="hidden"
        />
        <label className="block mb-2 text-sm font-medium text-white">
          Title
        </label>
        <input
          required
          type="text"
          name="title"
          value={event.title}
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          Description
        </label>
        <textarea
          required
          name="description"
          value={event.description}
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          Location
        </label>
        <input
          required
          type="text"
          name="location"
          value={event.location}
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          Start At
        </label>
        <input
          required
          type="datetime-local"
          name="startAt"
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          End At
        </label>
        <input
          required
          type="datetime-local"
          name="endAt"
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col space-y-2.5">
        <button
          type="submit"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Update
        </button>
        <ActionButton actionType="DELETE" eventId={event._id} />
        <Link
          href={'/home/event/'}
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800"
        >
          <button type="button">Back</button>
        </Link>
      </div>
    </form>
  );
}

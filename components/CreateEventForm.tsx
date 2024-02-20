import { createEvent } from '@/app/lib/event-action';

export default function CreateEventForm() {
  return (
    <form action={createEvent} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          Title
        </label>
        <input
          required
          type="text"
          name="title"
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">
          Description
        </label>
        <textarea
          required
          name="description"
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
          className="block w-full p-4 border rounded-lg text-base bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Create
      </button>
    </form>
  );
}

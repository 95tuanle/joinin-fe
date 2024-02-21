import CreateEventForm from '@/components/CreateEventForm';

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1 className="text-4xl font-black text-gray-900 dark:text-white">
        Create Event
      </h1>
      <CreateEventForm />
    </div>
  );
}

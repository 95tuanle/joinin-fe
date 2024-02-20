import CreateEventForm from '@/components/CreateEventForm';

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-10">
      <h1 className="text-3xl">Create Your Event!</h1>
      <CreateEventForm />
    </div>
  );
}

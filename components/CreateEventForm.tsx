import { createEvent } from '@/app/lib/event-action';

export default function CreateEventForm() {
  return (
    <form action={createEvent}>
      <label>Event Name</label>
      <input required name="eventName" />
      <label>Description</label>
      <input required name="eventDesc" />
      <label>Event Venue</label>
      <input required name="eventVenue" />
      <label>Start Date</label>
      <input required type="datetime-local" name="eventStartDate" />
      <label>End Date</label>
      <input required type="datetime-local" name="eventEndDate" />
      <button type="submit">Create</button>
    </form>
  );
}

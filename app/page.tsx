import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

export default function Page() {
  return (
    <section>
      <h1 className="text-center"> The hub for Every dev <br/> Event You can not Miss</h1>
      <p className="text-center mt-5">Hackthons, Meetups, and Conferences </p>

      <ExploreBtn /> 

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
         {events.map((event) => (
          <li key={event.title}>
            <EventCard {...event} />
          </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

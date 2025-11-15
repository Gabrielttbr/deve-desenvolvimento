export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Conf 2025",
    image: "/images/event1.png",
    slug: "react-conf-2025",
    location: "Las Vegas, Nevada",
    date: "May 22-23, 2025",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "Next.js Global Conf",
    image: "/images/event2.png",
    slug: "nextjs-global-conf",
    location: "San Francisco, California",
    date: "June 12-13, 2025",
    time: "10:00 AM - 6:00 PM",
  },
  {
    title: "TypeScript Summit 2025",
    image: "/images/event3.png",
    slug: "typescript-summit-2025",
    location: "Seattle, Washington",
    date: "July 8-9, 2025",
    time: "8:30 AM - 4:30 PM",
  },
  {
    title: "JavaScript Nation",
    image: "/images/event4.png",
    slug: "javascript-nation",
    location: "Austin, Texas",
    date: "August 19-20, 2025",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "Web Development Expo",
    image: "/images/event5.png",
    slug: "web-development-expo",
    location: "New York, New York",
    date: "September 15-16, 2025",
    time: "10:00 AM - 6:00 PM",
  },
  {
    title: "DevOps Days Conference",
    image: "/images/event6.png",
    slug: "devops-days-conference",
    location: "Portland, Oregon",
    date: "October 22-23, 2025",
    time: "9:00 AM - 5:00 PM",
  },
];

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Premier League Tournament",
    date: "2025-02-15",
    time: "10:00 AM",
    location: "Main Field",
    category: "Football",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    description: "Join us for an exciting football tournament featuring top teams from across Accra.",
  },
  {
    id: 2,
    title: "Basketball Championship",
    date: "2025-02-20",
    time: "2:00 PM",
    location: "Basketball Court",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
    description: "Witness intense basketball action as teams compete for the championship title.",
  },
  {
    id: 3,
    title: "Youth Football League",
    date: "2025-02-25",
    time: "9:00 AM",
    location: "Main Field",
    category: "Football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    description: "Supporting the next generation of football talent in our youth league.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            Stay updated with our latest tournaments, championships, and special events.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Link href="/book">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Past Notable Events Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-8">
              Past Notable Events
            </h2>
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-primary-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold mb-4">
                    November 2023
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    2023 NFL Flag Accra Championship
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Hosted the prestigious NFL Flag Accra Championship with 16 primary school teams 
                    competing. The event was part of the NFL Africa initiative and featured the 
                    Philadelphia Eagles mascot SWOOP. Nima 2 School won the championship and 
                    represented Ghana at the 2024 Pro Bowl Games in the United States.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.myjoyonline.com/nfl-flag-champions-crowned-in-ghana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-semibold underline"
                    >
                      Read Full Article →
                    </a>
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/ak4H8qtUInI"
                    title="2023 NFL Flag Accra Championship at B Woodinn Sports Complex"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}


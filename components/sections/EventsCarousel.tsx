"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const events = [
  {
    id: 1,
    title: "Premier League Tournament",
    date: "2025-02-15",
    time: "10:00 AM",
    location: "Main Field",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    category: "Football",
  },
  {
    id: 2,
    title: "Basketball Championship",
    date: "2025-02-20",
    time: "2:00 PM",
    location: "Basketball Court",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
    category: "Basketball",
  },
  {
    id: 3,
    title: "Youth Football League",
    date: "2025-02-25",
    time: "9:00 AM",
    location: "Main Field",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    category: "Football",
  },
];

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on the action. Book your spot today.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {events.map((event, index) => {
                if (index !== currentIndex) return null;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Card hover={false} className="h-full border-0 shadow-2xl">
                      <div className="relative h-full flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/2 h-64 md:h-full">
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
                        <CardContent className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 bg-white">
                          <h3 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                            {event.title}
                          </h3>
                          <div className="space-y-4 mb-6">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-5 h-5 mr-3 text-primary-500" />
                              <span className="font-medium">
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="ml-2">{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <Link href="/book" className="flex-1">
                              <Button className="w-full" size="lg">
                                Book Now
                              </Button>
                            </Link>
                            <Link href="/events" className="flex-1">
                              <Button variant="outline" className="w-full" size="lg">
                                View All
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            aria-label="Previous event"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            aria-label="Next event"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


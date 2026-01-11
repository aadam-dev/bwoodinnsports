"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const facilities = [
  {
    id: 1,
    name: "Main Football Field",
    description: "Professional-grade football field with seating for 400 and standing capacity for 990.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    capacity: "1,390 guests",
    features: ["Professional turf", "Floodlights", "Seating area"],
  },
  {
    id: 2,
    name: "Basketball Court",
    description: "Indoor basketball court perfect for tournaments and training sessions.",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
    capacity: "200 spectators",
    features: ["Indoor court", "Scoreboard", "Changing rooms"],
  },
  {
    id: 3,
    name: "Event Space",
    description: "Versatile event space for ceremonies, conferences, and special occasions.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    capacity: "500 guests",
    features: ["Flexible layout", "Sound system", "Catering area"],
  },
];

export default function FacilitiesPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            Our Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            World-class facilities designed for athletes and events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{facility.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{facility.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{facility.capacity}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/facilities">
            <Button size="lg" variant="outline" className="group">
              View All Facilities
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


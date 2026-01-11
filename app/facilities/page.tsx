import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, MapPin, Clock } from "lucide-react";

const facilities = [
  {
    name: "Main Football Field",
    description: "Professional-grade football field with artificial turf, perfect for tournaments and training.",
    capacity: "1,390 guests (400 seated, 990 standing)",
    features: [
      "Professional artificial turf",
      "Floodlight system",
      "Seating area for 400",
      "Standing area for 990",
      "Scoreboard",
      "Changing rooms",
    ],
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
  },
  {
    name: "Basketball Court",
    description: "Indoor basketball court with professional flooring and equipment.",
    capacity: "200 spectators",
    features: [
      "Indoor court",
      "Professional flooring",
      "Scoreboard",
      "Changing rooms",
      "Seating area",
    ],
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80",
  },
  {
    name: "Event Space",
    description: "Versatile event space for ceremonies, conferences, and special occasions.",
    capacity: "500 guests",
    features: [
      "Flexible layout",
      "Sound system",
      "Catering area",
      "Parking available",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            Our Facilities
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            World-class facilities designed for athletes, events, and unforgettable experiences.
          </p>

          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <Card key={index} hover={false} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[400px]">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 md:p-12">
                    <CardTitle className="text-3xl mb-4">{facility.name}</CardTitle>
                    <p className="text-gray-600 mb-6 text-lg">{facility.description}</p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Users className="w-5 h-5 mr-3 text-primary-500" />
                        <span className="font-medium">{facility.capacity}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}


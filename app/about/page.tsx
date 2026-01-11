import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            About B Woodinn Sports Complex
          </h1>
          <div className="prose prose-lg max-w-4xl">
            <p className="text-xl text-gray-600 mb-8">
              B Woodinn Sports Complex is a premier sports venue located in Adenta, Accra, Ghana.
              We provide world-class facilities for football tournaments, basketball events, and
              special occasions.
            </p>
            <p className="text-gray-700 mb-6">
              With a capacity of 1,390 guests (400 seated, 990 standing), our complex is designed
              to host a variety of events from local tournaments to major championships. Our
              state-of-the-art facilities and professional management ensure every event is a success.
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mt-12 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              To provide exceptional sports facilities and event hosting services that bring
              communities together and promote athletic excellence in Ghana.
            </p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mt-12 mb-6">
              Notable Events & Partnerships
            </h2>
            <div className="bg-primary-50 rounded-xl p-8 mb-8 border border-primary-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">NFL</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    2023 NFL Flag Accra Championship
                  </h3>
                  <p className="text-gray-700 mb-4">
                    B Woodinn Sports Complex was proud to host the prestigious 2023 NFL Flag Accra Championship, 
                    part of the NFL Africa initiative. Sixteen primary school teams from across Accra competed 
                    in this international flag football tournament, with Nima 2 School emerging as back-to-back 
                    champions. The event featured the Philadelphia Eagles mascot SWOOP and showcased our 
                    world-class facilities to an international audience.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.youtube.com/watch?v=ak4H8qtUInI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch Video
                    </a>
                    <a
                      href="https://www.myjoyonline.com/nfl-flag-champions-crowned-in-ghana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mt-12 mb-6">
              Our Services
            </h2>
            <p className="text-gray-700 mb-4">
              B Woodinn Sports Complex offers a comprehensive range of services for sports and events:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-8">
              <li>Soccer Fiesta</li>
              <li>Party Hosting</li>
              <li>Naming Ceremonies</li>
              <li>Funeral Services</li>
              <li>Wedding Receptions</li>
              <li>Conference Hall Rental</li>
              <li>Other Special Events</li>
            </ul>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mt-12 mb-6">
              Why Choose Us
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Premier location in Adenta, Accra</li>
              <li>Professional-grade facilities</li>
              <li>Experienced event management team</li>
              <li>Flexible booking options</li>
              <li>Excellent customer service</li>
            </ul>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}


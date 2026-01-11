"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";
import Modal from "@/components/ui/Modal";
import { motion } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    alt: "Football field",
    category: "Venue",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
    alt: "Basketball court",
    category: "Venue",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    alt: "Football match",
    category: "Events",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    alt: "Event space",
    category: "Venue",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    alt: "Sports action",
    category: "Events",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    alt: "Basketball game",
    category: "Events",
  },
];

const categories = ["All", "Venue", "Events"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Header />
      <Section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Explore our facilities and events through our photo gallery.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-semibold">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        size="xl"
      >
        {selectedImage && (
          <img
            src={galleryImages.find((img) => img.id === selectedImage)?.src}
            alt={galleryImages.find((img) => img.id === selectedImage)?.alt}
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>

      <Footer />
    </main>
  );
}


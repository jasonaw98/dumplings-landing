"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";

const locations = [
  {
    name: "Madam Yan Bukit Beruang Food Court, Melaka",
    address:
      "Stall No. 9 LOT 4427, Jalan Delima 12, Taman Bukit Melaka, Bukit Beruang, 75450 Melaka",
    hours: "Mon-Sun: 11am - 10pm",
    googlemap: "https://maps.app.goo.gl/EHznMcbmivZ7N6Zb9",
  },
  {
    name: "Newton Food Court Melaka Raya",
    address: "277, Jln Parameswara, 75000 Melaka",
    hours: "Mon-Sat: 11am - 10pm",
    googlemap: "https://maps.app.goo.gl/i759h81BRjdWF5aF8",
  },
];

export function LocationsSection() {
  return (
    <section id="locations" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-gray-600">
            Come visit us at one of our cozy spots!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-orange-50 p-8 rounded-3xl flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {loc.name}
              </h3>
              <p className="text-gray-600 mb-2">{loc.address}</p>
              <p className="text-orange-600 font-medium">{loc.hours}</p>
              <Link
                href={loc.googlemap}
                target="_blank"
                className="text-orange-600 font-medium flex items-center gap-2 pt-2"
              >
                <svg viewBox="0 0 92.3 132.3" className="size-8">
                  <path
                    fill="#1a73e8"
                    d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
                  />
                  <path
                    fill="#ea4335"
                    d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
                  />
                  <path
                    fill="#4285f4"
                    d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"
                  />
                  <path
                    fill="#fbbc04"
                    d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"
                  />
                  <path
                    fill="#34a853"
                    d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"
                  />
                  <script />
                </svg>
                View on Google Maps
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";

const menuItems = [
  {
    id: 1,
    name: "Classic Steamed Bao",
    description: "Fluffy white buns filled with juicy pork and aromatics.",
    price: "$6.50",
    image: "/dumpling-1.png",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Crispy Gyoza Friends",
    description: "Pan-fried to golden perfection with a savory veggie mix.",
    price: "$7.00",
    image: "/dumpling-2.png",
    color: "bg-yellow-50",
  },
  {
    id: 3,
    name: "Happy Soup Dumplings",
    description: "Delicate skin wrapping rich broth and premium meat.",
    price: "$8.50",
    image: "/dumpling-3.png",
    color: "bg-red-50",
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Bestsellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These little guys are popular for a reason. Try the crowd favorites!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ${item.color} group hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative h-48 w-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  {item.price}
                </span>
                <Button className="bg-gray-900 text-white rounded-full hover:bg-orange-500 transition-colors">
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

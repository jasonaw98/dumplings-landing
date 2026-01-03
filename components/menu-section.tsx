"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";

const bestsellers = [
  {
    id: 1,
    name: "Shrimp",
    description: "Beet root skin wrap with shrimp with chicken fillings",
    price: 25.5,
    image: "/fillings/shrimp.png",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Cabbage",
    description: "Spinach skin wrap with cabbage with chicken fillings",
    price: 18.5,
    image: "/fillings/cabbage.png",
    color: "bg-gray-50",
  },
  {
    id: 3,
    name: "Mushroom",
    description: "Pumpkin skin wrap with mushroom with chicken fillings",
    price: 23.5,
    image: "/fillings/mushroom.png",
    color: "bg-red-50",
  },
];

const others = [
  {
    id: 1,
    name: "Leek",
    description: "Carrot skin wrap with leek with chicken fillings",
    price: 18.5,
    image: "/fillings/leek.png",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Corn",
    description: "Pumpkin skin wrap with corn with chicken fillings",
    price: 18.5,
    image: "/fillings/corn.png",
    color: "bg-red-50",
  },
];

export function MenuSection() {
  const { addToCart } = useCart();

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
          {bestsellers.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ${item.color} group hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative h-48 w-full mb-8 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="object-contain scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600 mb-6">12 Pieces per pack</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  RM {(item.price).toFixed(2)}
                </span>
                <Button
                  className="bg-gray-900 text-white rounded-full hover:bg-orange-500 transition-colors"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

         <div className="text-center my-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Other Fillings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try other fillings that we have!
          </p>
        </div>

        <div className="grid grid-cols-1 md:flex justify-center gap-8">
          {others.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ${item.color} group hover:shadow-xl transition-all duration-300 md:max-w-1/3`}
            >
              <div className="relative h-48 w-full mb-8 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600 mb-6">12 Pieces per pack</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  RM {(item.price).toFixed(2)}
                </span>
                <Button
                  className="bg-gray-900 text-white rounded-full hover:bg-orange-500 transition-colors"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";

interface MenuCardProps {
  item: {
    id: number;
    price: number;
    image: string;
    color: string;
    popular?: boolean;
  };
  index: number;
  translations: {
    name: string;
    description: string;
    ingredients: string[];
    addToCart: string;
    pieces: string;
  };
  className?: string;
}

export function MenuCard({
  item,
  index,
  translations,
  className = "",
}: MenuCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`rounded-3xl p-8 ${item.color} group hover:shadow-xl transition-all duration-300 h-full flex flex-col ${className}`}
    >
      <div className="relative h-48 w-full mb-8 group-hover:scale-110 transition-transform duration-300">
        {item.popular && (
          <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg z-10">
            Popular
          </span>
        )}
        <Image
          src={item.image}
          alt={translations.name}
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain scale-105"
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {translations.name}
      </h3>
      <p className="text-gray-600 grow">{translations.description}</p>
      <div className="flex flex-wrap gap-2 py-4">
        {translations.ingredients.map((ingredient) => (
          <p
            key={ingredient}
            className="text-gray-800 bg-blue-100 rounded-full px-2 py-1 text-sm whitespace-nowrap"
          >
            {ingredient}
          </p>
        ))}
      </div>
      <p className="text-gray-600 mb-6">{translations.pieces}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-orange-600">
          RM {item.price.toFixed(2)}
        </span>
        <Button
          className="bg-gray-900 text-white rounded-full hover:bg-orange-500 transition-colors"
          onClick={() =>
            addToCart({
              id: item.id,
              name: translations.name,
              price: item.price,
              image: item.image,
            })
          }
        >
          {translations.addToCart}
        </Button>
      </div>
    </motion.div>
  );
}

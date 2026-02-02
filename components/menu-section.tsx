"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";

const bestsellers = [
  {
    id: 1,
    name: "Shrimp",
    description:
      "A crowd-pleaser with extra bite. Juicy shrimp blended with seasoned chicken and spring onions for a rich, savoury filling that’s full of umami.",
    ingredients: ["Shrimp", "Chicken", "Spring Onions"],
    price: 25.5,
    image: "/fillings/shrimp.png",
    color: "bg-blue-50",
    popular: true,
  },
  {
    id: 2,
    name: "Cabbage",
    description:
      "A classic comfort favourite. Fresh cabbage mixed with fragrant spring onions and tender chicken, wrapped in a delicate skin. Light, juicy, and incredibly satisfying.",
    ingredients: ["Cabbage", "Chicken", "Spring Onions"],
    price: 18.5,
    image: "/fillings/cabbage.png",
    color: "bg-gray-50",
    popular: false,
  },
  {
    id: 3,
    name: "Mushroom",
    description:
      "Earthy, savoury, and deeply flavourful. A blend of mushrooms and black fungus mixed with chicken, perfect for mushroom lovers.",
    ingredients: ["Mushroom", "Black Fungus", "Chicken"],
    price: 23.5,
    image: "/fillings/mushroom.png",
    color: "bg-red-50",
    popular: true,
  },
  {
    id: 4,
    name: "Leek",
    description:
      "Simple, aromatic, and well-balanced. Fresh leeks paired with chicken for a clean, fragrant flavour that’s light yet satisfying.",
    ingredients: ["Leek", "Chicken"],
    price: 18.5,
    image: "/fillings/leek.png",
    color: "bg-purple-50",
    popular: false,
  },
  {
    id: 5,
    name: "Corn",
    description:
      "Naturally sweet and comforting. Fresh corn kernels combined with chicken for a soft, juicy filling with a subtle crunch in every bite.",
    ingredients: ["Corn", "Chicken"],
    price: 18.5,
    image: "/fillings/corn.png",
    color: "bg-amber-50",
    popular: false,
  },
];

export function MenuSection() {
  const { addToCart } = useCart();

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Varieties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These little guys are popular for a reason. Try the crowd favorites!
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {bestsellers.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ${item.color} group hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative h-48 w-full mb-8 group-hover:scale-110 transition-transform duration-300">
                {item.popular && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg">
                    Popular
                  </span>
                )}
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
              <div className="flex items-center gap-2 py-2">
                {item.ingredients.map((ingredient) => (
                  <p
                    key={ingredient}
                    className="text-gray-800 bg-blue-100 rounded-full px-2 py-1 text-sm"
                  >
                    {ingredient}
                  </p>
                ))}
              </div>
              <p className="text-gray-600 mb-6">12 Pieces per pack</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  RM {item.price.toFixed(2)}
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

        <div className="grid grid-cols-1 md:flex justify-center gap-8 mt-8">
          {bestsellers.slice(3).map((item, index) => (
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
              <div className="flex items-center gap-2 py-2">
                {item.ingredients.map((ingredient) => (
                  <p
                    key={ingredient}
                    className="text-gray-800 bg-blue-100 rounded-full px-2 py-1 text-sm"
                  >
                    {ingredient}
                  </p>
                ))}
              </div>
              <p className="text-gray-600 mb-6">12 Pieces per pack</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  RM {item.price.toFixed(2)}
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

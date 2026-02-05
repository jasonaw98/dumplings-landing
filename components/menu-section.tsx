"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { menuText } from "@/lib/translate-map";

const bestsellers = [
  {
    id: 1,
    price: 25.5,
    image: "/fillings/shrimp.png",
    color: "bg-blue-50",
    popular: true,
  },
  {
    id: 2,
    price: 18.5,
    image: "/fillings/cabbage.png",
    color: "bg-gray-50",
    popular: false,
  },
  {
    id: 3,
    price: 23.5,
    image: "/fillings/mushroom.png",
    color: "bg-red-50",
    popular: true,
  },
  {
    id: 4,
    price: 18.5,
    image: "/fillings/leek.png",
    color: "bg-purple-50",
    popular: false,
  },
  {
    id: 5,
    price: 18.5,
    image: "/fillings/corn.png",
    color: "bg-amber-50",
    popular: false,
  },
];

const uiText = {
  en: {
    title: "Our Varieties",
    subtitle: "These little guys are popular for a reason.",
    addToCart: "Add to Cart",
    pieces: "12 Pieces per pack",
  },
  bm: {
    title: "Pilihan Kami",
    subtitle: "Pilihan kegemaran ramai.",
    addToCart: "Tambah ke Troli",
    pieces: "12 Keping setiap pek",
  },
};


export function MenuSection() {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const textLang = menuText[language];
  const uiTextLang = uiText[language];

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {uiTextLang.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {uiTextLang.subtitle}
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
                  alt={textLang[item.id].name}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {textLang[item.id].name}
              </h3>
              <p className="text-gray-600">{textLang[item.id].description}</p>
              <div className="flex items-center gap-2 py-2">
                {textLang[item.id].ingredients.map((ingredient) => (
                  <p
                    key={ingredient}
                    className="text-gray-800 bg-blue-100 rounded-full px-2 py-1 text-sm"
                  >
                    {ingredient}
                  </p>
                ))}
              </div>
              <p className="text-gray-600 mb-6">{uiTextLang.pieces}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  RM {item.price.toFixed(2)}
                </span>
                <Button
                  className="bg-gray-900 text-white rounded-full hover:bg-orange-500 transition-colors"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: textLang[item.id].name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  {uiTextLang.addToCart}
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
                  alt={textLang[item.id].name}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {textLang[item.id].name}
              </h3>
              <p className="text-gray-600">{textLang[item.id].description}</p>
              <div className="flex items-center gap-2 py-2">
                {textLang[item.id].ingredients.map((ingredient) => (
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
                      name: textLang[item.id].name,
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

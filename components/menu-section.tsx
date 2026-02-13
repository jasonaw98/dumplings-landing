"use client";

import { useLanguage } from "@/lib/language-context";
import { menuText } from "@/lib/translate-map";
import { MenuCard } from "./menu-card";

const bestsellers = [
  {
    id: 1,
    new_price: 24.9,
    old_price: 25.9,
    image: "/fillings/shrimp.png",
    color: "bg-blue-50",
    popular: true,
  },
  {
    id: 2,
    new_price: 17.9,
    old_price: 18.9,
    image: "/fillings/cabbage.png",
    color: "bg-gray-50",
    popular: false,
  },
  {
    id: 3,
    new_price: 22.9,
    old_price: 23.9,
    image: "/fillings/mushroom.png",
    color: "bg-red-50",
    popular: true,
  },
  {
    id: 4,
    new_price: 17.9,
    old_price: 18.9,
    image: "/fillings/leek.png",
    color: "bg-purple-50",
    popular: false,
  },
  {
    id: 5,
    new_price: 17.9,
    old_price: 18.9,
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
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {bestsellers.slice(0, 3).map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              translations={{
                ...textLang[item.id],
                addToCart: uiTextLang.addToCart,
                pieces: uiTextLang.pieces,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex justify-center gap-8 mt-8 items-stretch">
          {bestsellers.slice(3).map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              translations={{
                ...textLang[item.id],
                addToCart: uiTextLang.addToCart,
                pieces: uiTextLang.pieces,
              }}
              className="lg:max-w-md w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

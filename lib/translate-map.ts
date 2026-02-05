type Lang = "en" | "bm";

export const menuText: Record<Lang, Record<number, {
    name: string;
    description: string;
    ingredients: string[];
}>> = {
    en: {
        1: {
            name: "Shrimp",
            description:
                "A crowd-pleaser with extra bite. Juicy shrimp blended with seasoned chicken and spring onions for a rich, savoury filling that’s full of umami.",
            ingredients: ["Shrimp", "Chicken", "Spring Onions"],
        },
        2: {
            name: "Cabbage",
            description:
                "A classic comfort favourite. Fresh cabbage mixed with fragrant spring onions and tender chicken, wrapped in a delicate skin. Light, juicy, and incredibly satisfying.",
            ingredients: ["Cabbage", "Chicken", "Spring Onions"],
        },
        3: {
            name: "Mushroom",
            description:
                "Earthy, savoury, and deeply flavourful. A blend of mushrooms and black fungus mixed with chicken, perfect for mushroom lovers.",
            ingredients: ["Mushroom", "Black Fungus", "Chicken"],
        },
        4: {
            name: "Leek",
            description:
                "Simple, aromatic, and well-balanced. Fresh leeks paired with chicken for a clean, fragrant flavour that’s light yet satisfying.",
            ingredients: ["Leek", "Chicken"],
        },
        5: {
            name: "Corn",
            description:
                "Naturally sweet and comforting. Fresh corn kernels combined with chicken for a soft, juicy filling with a subtle crunch in every bite.",
            ingredients: ["Corn", "Chicken"],
        },
    },
    bm: {
        1: {
            name: "Udang",
            description:
                "Gabungan sempurna udang dan ayam. Inti berjus dengan rasa savoury dan umami, sesuai untuk pencinta makanan laut.",
            ingredients: ["Udang", "Ayam", "Daun Bawang"],
        },
        2: {
            name: "Kubis",
            description:
                "Pilihan klasik yang digemari ramai. Kubis segar dicampur dengan daun bawang dan ayam yang lembut, menghasilkan inti yang ringan, berjus dan seimbang rasanya.",
            ingredients: ["Kubis", "Ayam", "Daun Bawang"],
        },
        3: {
            name: "Cendawan",
            description:
                "Beraroma dan penuh rasa. Campuran cendawan dan fungus hitam bersama ayam menghasilkan inti yang kaya dan menyelerakan.",
            ingredients: ["Cendawan", "Fungus Hitam", "Ayam"],
        },
        4: {
            name: "Kucai",
            description:
                "Ringkas tetapi penuh aroma. Kucai segar dipadankan dengan ayam untuk rasa yang ringan, harum dan memuaskan.",
            ingredients: ["Kucai", "Ayam"],
        },
        5: {
            name: "Jagung",
            description:
                "Manis semula jadi daripada jagung segar digabungkan dengan ayam, memberikan rasa lembut, berjus dan sedikit rangup dalam setiap gigitan.",
            ingredients: ["Jagung", "Ayam"],
        },
    },
};

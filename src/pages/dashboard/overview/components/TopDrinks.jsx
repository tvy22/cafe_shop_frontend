import React from "react";

export default function TopDrinks() {
  const drinks = [
    {
      rank: 1,
      name: "Matcha Cloud Latte",
      sold: 64,
      price: "$5.75",
      image:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=200&q=80",
    },
    {
      rank: 2,
      name: "Caramel Cold Brew",
      sold: 48,
      price: "$4.50",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=200&q=80",
    },
    {
      rank: 3,
      name: "Classic Flat White",
      sold: 38,
      price: "$4.25",
      image:
        "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=200&q=80",
    },
    {
      rank: 4,
      name: "Iced Lavender Latte",
      sold: 21,
      price: "$5.25",
      image:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=200&q=80",
    },
    {
      rank: 5,
      name: "Espresso Tonic",
      sold: 15,
      price: "$4.75",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-card border border-cream/80 h-full">
      <h2 className="text-h2 font-bold text-coffee mb-4">Top Selling Drinks</h2>

      <div className="space-y-3">
        {drinks.map((drink) => (
          <div
            key={drink.name}
            className="flex items-center justify-between rounded-2xl p-2 hover:bg-cream/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-4 text-center text-body font-bold text-caramel">
                {drink.rank}
              </span>
              <img
                src={drink.image}
                alt={drink.name}
                className="size-11 rounded-xl object-cover border border-cream/50"
              />
              <div>
                <h4 className="text-body font-bold text-coffee leading-snug">
                  {drink.name}
                </h4>
                <p className="text-meta text-coffee/60 font-medium">
                  {drink.sold} sold • {drink.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
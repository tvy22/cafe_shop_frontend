import React from "react";
import { drinks } from "../../../../data/topSellingDrinks";

export default function TopDrinks() {

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
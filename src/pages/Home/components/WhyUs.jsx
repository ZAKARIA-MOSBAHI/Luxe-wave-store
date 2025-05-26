import { BadgeCheck, Container, RefreshCcw } from "lucide-react";
import React from "react";

const benefits = [
  {
    name: "Obsessively Curated",
    description:
      "Shop the new luxury featuring the best of the best in Design, Style, and Art",
    icon: <RefreshCcw className="size-12" />,
  },
  {
    name: "Sellers You Can Trust",
    description:
      "Access our exclusive community of trusted sellers, hand-picked by our team.",
    icon: <BadgeCheck className="size-12" />,
  },
  {
    name: "Shipping Tailored to You",
    description:
      "We take extra care with your orders with custom shipping options and premium, white glove service offerings.",
    icon: <Container className="size-12" />,
  },
];
export default function WhyUs() {
  return (
    <div className="space-y-12 my-20 px-4 md:px-6 text-center py-20 bg-black text-white">
      <h2 className="text-3xl font-bold tracking-tight">Why Choose Us.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {benefits.map((benefit, index) => (
          <div
            className="flex max-w-[300px] min-h-[200px] w-full flex-col items-center gap-4"
            key={benefit.name + index}
          >
            {benefit.icon}
            <div>
              <h3 className="font-medium tracking-tight">{benefit.name}</h3>
              <p className=" text-zinc-400">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

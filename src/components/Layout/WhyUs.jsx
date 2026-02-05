import { BadgeCheck, Container, RefreshCcw } from "lucide-react";

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
    <section className="space-y-12 md:px-6 text-center mt-10 md:mt-14 lg:mt-16">
      <h3 className="typography-h3">Why Choose Us.</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        {benefits.map((benefit, index) => (
          <div
            className="flex max-w-[300px] min-h-[200px] w-full flex-col items-center gap-4"
            key={benefit.name + index}
          >
            {benefit.icon}
            <div>
              <h6 className="typography-h6">{benefit.name}</h6>
              <p className=" text-zinc-400 typography-p">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

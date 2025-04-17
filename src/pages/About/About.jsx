import {
  ArrowRight,
  Award,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Shirt,
  User,
} from "lucide-react";
import { Separator } from "../../admin/components/ui/Separator";
import aboutUsImg from "../../assets/client/images/about_us.jpg";
import JuliaChen from "../../assets/client/images/team_member_2.jpg";
import MarcusBlackwood from "../../assets/client/images/team_member_3.jpg";
import JamesKim from "../../assets/client/images/team_member_1.jpg";
import ElenaMartinez from "../../assets/client/images/team_member_4.jpg";
const Team = [
  {
    name: "Julia Chen",
    role: "Co-Founder & Creative Director",
    image: JuliaChen,
  },
  {
    name: "Marcus Blackwood",
    role: "Co-Founder & Design Lead",
    image: MarcusBlackwood,
  },
  {
    name: "James Kim",
    role: "Sustainability Manager",
    image: JamesKim,
  },
  {
    name: "Elena Martinez",
    role: "Head of Production",
    image: ElenaMartinez,
  },
];
const About = () => {
  return (
    <div className="container max-w-5xl py-12 md:py-20">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            About LuxeWave
          </h1>
          <p className="text-zinc-600 text-lg md:text-xl max-w-3xl mx-auto">
            Crafting elegance through minimalist designs since 2018
          </p>
          <div className="flex justify-center">
            <Separator className="w-24 bg-zinc-900 h-[2px]" />
          </div>
        </section>

        {/* Brand Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-zinc-600 text-lg">
              Founded in 2018, LuxeWave began as a passion project between two
              fashion designers who shared a vision for timeless elegance
              through minimalist design. What started as a small collection
              quickly evolved into a brand known for its commitment to quality
              fabrics and sustainable manufacturing processes.
            </p>
            <p className="text-zinc-600 text-lg">
              Today, LuxeWave stands at the intersection of luxury and
              accessibility, creating pieces that transcend seasonal trends and
              become staples in our customers' wardrobes.
            </p>
            <p className="text-zinc-600 text-lg">
              Our design philosophy draws inspiration from architectural
              minimalism, focusing on clean lines, thoughtful proportions, and
              high-quality materials. Each garment goes through extensive
              development to ensure perfect fit, comfort, and longevity.
            </p>
            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center font-medium hover:underline"
              >
                Connect with us <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="rounded-md">
            <img
              src={aboutUsImg}
              alt="About LuxeWave"
              className="object-contain w-full h-full rounded-md"
            />
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Our Principles
            </div>
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              These core principles guide every decision we make, from design to
              delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-md space-y-4">
              <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Shirt className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="font-semibold text-xl">Quality</h3>
              <p className="text-zinc-500">
                We source only the finest materials and work with skilled
                artisans to create garments that stand the test of time.
              </p>
              <ul className="space-y-2 text-zinc-500">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Premium fabrics from ethical sources
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Detailed craftsmanship
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Rigorous quality control
                </li>
              </ul>
            </div>
            <div className="p-8 border rounded-md space-y-4">
              <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="font-semibold text-xl">Sustainability</h3>
              <p className="text-zinc-500">
                Every design decision is made with environmental impact in mind,
                from fabric selection to packaging.
              </p>
              <ul className="space-y-2 text-zinc-500">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Eco-friendly materials
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Reduced waste production
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Ethical manufacturing
                </li>
              </ul>
            </div>
            <div className="p-8 border rounded-md space-y-4">
              <div className="bg-zinc-900/10 rounded-full w-12 h-12 flex items-center justify-center">
                <Award className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="font-semibold text-xl">Transparency</h3>
              <p className="text-zinc-500">
                We believe in open communication about our practices, pricing,
                and the people who make our clothes.
              </p>
              <ul className="space-y-2 text-zinc-500">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Clear pricing breakdown
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Supply chain visibility
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-1 w-1 rounded-full bg-zinc-900"></div>
                  Regular impact reporting
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Our People
            </div>
            <h2 className="text-3xl font-bold">Meet The Team</h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              The passionate individuals behind LuxeWave.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Team.map((member) => (
              <div className="text-center" key={member.name}>
                <div className="bg-zinc-100 aspect-square rounded-md mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-zinc-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="py-12">
          <div className="bg-zinc-100 p-12 rounded-md text-center space-y-6">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-zinc-500 text-xl max-w-3xl mx-auto italic">
              "To create thoughtfully designed clothing that inspires confidence
              through simplicity, while championing ethical production and
              timeless style over fleeting trends."
            </p>
            <p className="font-medium text-lg">— Julia & Marcus, Founders</p>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-12">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1 bg-zinc-100 text-sm font-medium rounded-full">
              Our Progress
            </div>
            <h2 className="text-3xl font-bold">Key Milestones</h2>
          </div>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 font-bold text-2xl">2018</div>
              <div className="w-full md:w-3/4 border-l-0 md:border-l-2 md:pl-8 space-y-2">
                <h3 className="font-semibold text-xl">LuxeWave Founded</h3>
                <p className="text-zinc-500">
                  Julia and Marcus launched the first collection of 12 essential
                  pieces from a small studio in New York.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 font-bold text-2xl">2020</div>
              <div className="w-full md:w-3/4 border-l-0 md:border-l-2 md:pl-8 space-y-2">
                <h3 className="font-semibold text-xl">
                  Sustainable Materials Pledge
                </h3>
                <p className="text-zinc-500">
                  Committed to using at least 85% sustainable materials across
                  all collections.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 font-bold text-2xl">2021</div>
              <div className="w-full md:w-3/4 border-l-0 md:border-l-2 md:pl-8 space-y-2">
                <h3 className="font-semibold text-xl">First Flagship Store</h3>
                <p className="text-zinc-500">
                  Opened our first physical store in New York's Fashion
                  District.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 font-bold text-2xl">2023</div>
              <div className="w-full md:w-3/4 border-l-0 md:border-l-2 md:pl-8 space-y-2">
                <h3 className="font-semibold text-xl">
                  Carbon Neutral Operations
                </h3>
                <p className="text-zinc-500">
                  Achieved carbon-neutral status across all operations and
                  manufacturing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Join Our Journey</h2>
            <p className="text-zinc-600 text-lg max-w-xl mx-auto">
              Follow us on social media to stay updated on our latest
              collections and sustainability initiatives.
            </p>
            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-zinc-900/90"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default About;

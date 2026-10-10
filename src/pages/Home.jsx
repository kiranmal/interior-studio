import {
  ArrowRight,
  ArrowUpRight,
  Home as HomeIcon,
  Building2,
  ChefHat,
  BedDouble,
} from "lucide-react";

import { Link } from "react-router-dom";

import HeroBanner from "../components/HeroBanner";
import CostCalculator from "../components/CostCalculator";

import Stats from "../components/Stats";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Gallery from "../components/Gallery";
import About from "../components/About";
import Process from "../components/Process";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Contact from "../components/Contact";

function Home() {
  const services = [
    {
      icon: HomeIcon,
      title: "Home Interiors",
      text: "Beautiful and practical interiors designed around your lifestyle.",
    },
    {
      icon: Building2,
      title: "Office Interiors",
      text: "Professional workspaces designed for productivity and comfort.",
    },
    {
      icon: ChefHat,
      title: "Modular Kitchens",
      text: "Smart kitchen layouts with modern storage and elegant finishes.",
    },
    {
      icon: BedDouble,
      title: "Bedroom Design",
      text: "Comfortable bedrooms designed for a calm and relaxing experience.",
    },
  ];

  return (
    <main>
      <HeroBanner />

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f6b4d]">
              What We Do
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight text-[#17382b] sm:text-5xl">
              Interior solutions for
              <span className="text-[#1f6b4d]"> every space.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              From complete home interiors to individual rooms and workspaces,
              we design spaces around the way you live and work.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-[#fbfaf7] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#b8d1c1] hover:shadow-xl hover:shadow-[#174d39]/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf3ed] text-[#174d39] transition duration-500 group-hover:rotate-6 group-hover:bg-[#174d39] group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.text}
                  </p>

                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1f6b4d] transition hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Stats />

      <CostCalculator />

      <Services />

      <Projects />

      <Gallery />

      <About />

      <Process />

      <Team />

      <Testimonials />

      <FAQ />

      <CTA />

      <Contact />
    </main>
  );
}

export default Home;
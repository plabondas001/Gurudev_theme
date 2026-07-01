import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaHeadset, FaAward, FaUsers, FaArrowRight } from "react-icons/fa6";
import { TbTruckDelivery as TruckIcon } from "react-icons/tb";
import logo from "/Img/logo/ge_main_logo.png";
import { useConfig } from "../context/ConfigContext";

const About = () => {
  const { config } = useConfig();
  const websiteName = config?.website_name || "Gurudeb Enterprise";
  const logoUrl = config?.logo_light || config?.dashboard_logo || logo;
  const nameParts = websiteName.split(" ");
  const firstName = nameParts[0] || "Gurudeb";
  const restName = nameParts.slice(1).join(" ") || "Enterprise";

  return (
    <>
      {/* Inline keyframes for premium animations matching Contact page */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .6s ease-out both; }
        
        .delay-1    { animation-delay: .1s; }
        .delay-2    { animation-delay: .2s; }
        .delay-3    { animation-delay: .3s; }
        .delay-4    { animation-delay: .4s; }

        .card-hover {
          transition: transform .2s ease, box-shadow .15s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="bg-gray-50/30 min-h-screen">
        {/* ── Hero Banner ── */}
        <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] text-white py-16 md:py-24 relative overflow-hidden">
          {/* Decorative dynamic glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="w-full px-4 md:px-8 max-w-6xl mx-auto relative z-10 text-center fade-in-up">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] mb-4">
              About Gurudeb Enterprise
            </span>
            <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              Empowering Bangladesh With <span className="text-[#FBBC05]">Smart Technology</span>
            </h1>
            <p className="font-medium text-lg md:text-xl text-gray-200/90 leading-relaxed max-w-3xl mx-auto">
              We are dedicated to bridging the gap between innovative smart gadgets and tech enthusiasts across Bangladesh, ensuring trust, authenticity, and unparalleled customer service.
            </p>
          </div>
        </div>

        {/* ── Brand Story Section ── */}
        <div className="w-full px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-up delay-1">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our Journey
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                A commitment to excellence, transparency, and authentic tech.
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Founded on the pillars of reliability and passion, Gurudeb Enterprise has quickly grown to become Bangladesh's most trusted online destination for authentic smartphones and modern digital accessories. 
              </p>
              <p className="text-gray-600 leading-relaxed">
                We understand that technology isn't just about utility—it's about enhancing your life, simplifying your work, and creating joy. That's why we source every single product directly from authorized brand channels.
              </p>
              <div className="pt-4">
                <a href="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  Explore Our Collection <FaArrowRight size={14} />
                </a>
              </div>
            </div>
            
            <div className="relative fade-in-up delay-2">
              {/* Visual Glassmorphic Branding Banner */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10 rounded-3xl -rotate-2 scale-105 animate-pulse" />
              <div className="relative bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-xl space-y-6 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start items-center gap-3">
                  <img src={logoUrl} alt={`${websiteName} Logo`} className="h-14 w-auto object-contain" />
                  <span className="text-left">
                    <span className="block text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                      {firstName}
                    </span>
                    <span className="block text-lg font-extrabold text-primary leading-tight">
                      {restName}
                    </span>
                  </span>
                </div>
                <blockquote className="text-lg font-medium text-gray-700 italic">
                  "We don't just sell gadgets. We build connections, support aspirations, and deliver a simple, smarter future to every household in Bangladesh."
                </blockquote>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  — Nandan Saha, Founder
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overview Statistics ── */}
        <div className="w-full px-4 md:px-8 py-16 bg-gray-100/50 border-y border-gray-200/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Our Footprint
            </h2>
            <h3 className="text-center text-3xl font-extrabold mb-12 text-gray-900">
              Gurudeb Enterprise by the Numbers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-1 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <FaAward size={20} />
                </div>
                <p className="font-extrabold text-4xl md:text-5xl text-primary mb-2">500+</p>
                <p className="font-bold text-gray-800 text-lg">Curated Smart Products</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Directly sourced, guaranteed authentic laptops, mobile phones, & smart accessories.</p>
              </div>
              
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-2 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <FaUsers size={20} />
                </div>
                <p className="font-extrabold text-4xl md:text-5xl text-primary mb-2">10,000+</p>
                <p className="font-bold text-gray-800 text-lg">Happy Customers</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">Tech enthusiasts across Bangladesh who rely on us for their daily smart solutions.</p>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-3 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <IoShieldCheckmarkSharp size={20} />
                </div>
                <p className="font-extrabold text-4xl md:text-5xl text-primary mb-2">5★</p>
                <p className="font-bold text-gray-800 text-lg">Average Rating</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">An exceptional track record of positive reviews, delivery speeds, and customer support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Choose Us ── */}
        <div className="w-full px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Why Choose Us
            </h2>
            <h3 className="text-center text-3xl font-extrabold mb-12 text-gray-900">
              The Gurudeb Enterprise Standard
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <IoShieldCheckmarkSharp size={26} />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">100% Original Products</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Zero duplicates. All items undergo rigorous quality checks and are backed by official brand warranties.
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <TruckIcon size={26} />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Express Fast Delivery</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Safe delivery within 24 hours inside Dhaka, and reliable nationwide shipping within 3 to 5 business days.
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm card-hover fade-in-up delay-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <FaHeadset size={26} />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Dedicated 24/7 Support</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our support team is online and prepared to answer your questions, resolve order issues, and guide your tech purchases.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vision Banner ── */}
        <div className="w-full px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary to-[#25573c] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl shadow-primary/20 fade-in-up delay-2">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-4">
              <h2 className="font-bold text-3xl md:text-4xl mb-4">Our Vision & Mission</h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                "To make authentic smart technology accessible to everyone, and to empower the digital transformation of households and businesses across Bangladesh by being a trustable hub for original, top-tier innovations."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ── Dental SVG Icons ─────────────────────────────────────────────────────────

function CosmeticIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24">
      {/* Radial dashes around tooth */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 42, r2 = 52;
        const x1 = 60 + r1 * Math.cos(angle);
        const y1 = 60 + r1 * Math.sin(angle);
        const x2 = 60 + r2 * Math.cos(angle);
        const y2 = 60 + r2 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#5B4FCF" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={i % 2 === 0 ? "0" : "3 2"}
          />
        );
      })}
      {/* Tooth body */}
      <path
        d="M60 28c-7 0-14 5-14 13 0 4 1.5 7 3 10.5C50.5 55 51 62 51 67c0 5 2.5 10 9 10s9-5 9-10c0-5 .5-12 2-15.5 1.5-3.5 3-6.5 3-10.5 0-8-7-13-14-13z"
        stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function OrthodonticsIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24">
      {/* Horizontal wire */}
      <line x1="18" y1="58" x2="102" y2="58" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bracket box */}
      <rect x="48" y="48" width="24" height="20" rx="3" fill="#5B4FCF" />
      {/* Tooth */}
      <path
        d="M60 25c-7 0-14 5-14 13 0 4 1.5 7 3 10.5C50.5 52 51 59 51 64c0 5 2.5 10 9 10s9-5 9-10c0-5 .5-12 2-15.5 1.5-3.5 3-6.5 3-10.5 0-8-7-13-14-13z"
        stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function OralHygieneIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24">
      {/* Tooth */}
      <path
        d="M55 35c-7 0-14 5-14 13 0 4 1.5 7 3 10.5C45.5 62 46 69 46 74c0 5 2.5 10 9 10s9-5 9-10c0-5 .5-12 2-15.5 1.5-3.5 3-6.5 3-10.5 0-8-7-13-14-13z"
        stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      {/* Spray nozzle */}
      <rect x="72" y="28" width="22" height="12" rx="4" fill="#5B4FCF" />
      <line x1="72" y1="34" x2="64" y2="34" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Spray dots */}
      <circle cx="61" cy="42" r="2" fill="#5B4FCF" opacity="0.7" />
      <circle cx="56" cy="47" r="1.5" fill="#5B4FCF" opacity="0.5" />
      <circle cx="65" cy="46" r="1.5" fill="#5B4FCF" opacity="0.5" />
    </svg>
  );
}

function DentalTreatmentIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24">
      {/* Tooth */}
      <path
        d="M60 28c-7 0-14 5-14 13 0 4 1.5 7 3 10.5C50.5 55 51 62 51 67c0 5 2.5 10 9 10s9-5 9-10c0-5 .5-12 2-15.5 1.5-3.5 3-6.5 3-10.5 0-8-7-13-14-13z"
        stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      {/* Drill tool */}
      <line x1="80" y1="25" x2="65" y2="42" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
      <rect x="80" y="18" width="16" height="10" rx="3" fill="#5B4FCF" />
      <circle cx="65" cy="43" r="3" fill="#5B4FCF" />
    </svg>
  );
}

function TeethWhiteningIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24">
      {/* Tooth */}
      <path
        d="M60 30c-7 0-14 5-14 13 0 4 1.5 7 3 10.5C50.5 57 51 64 51 69c0 5 2.5 9 9 9s9-4 9-9c0-5 .5-12 2-15.5 1.5-3.5 3-6.5 3-10.5 0-8-7-13-14-13z"
        stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        fill="white"
      />
      {/* Sparkles */}
      <path d="M85 30 L87 25 L89 30 L94 32 L89 34 L87 39 L85 34 L80 32 Z" fill="#5B4FCF" opacity="0.8" />
      <path d="M78 50 L79.5 46 L81 50 L85 51.5 L81 53 L79.5 57 L78 53 L74 51.5 Z" fill="#5B4FCF" opacity="0.5" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Cosmetic Dentistry",
    description:
      "Lorem ipsum dolor sit amet, diument consectetur adipiscing elit.",
    icon: <CosmeticIcon />,
    href: "#",
  },
  {
    id: 2,
    title: "Orthodontics",
    description:
      "Lorem ipsum dolor sit amet, diument consectetur adipiscing elit.",
    icon: <OrthodonticsIcon />,
    href: "#",
  },
  {
    id: 3,
    title: "Oral Hygiene",
    description:
      "Lorem ipsum dolor sit amet, diument consectetur adipiscing elit.",
    icon: <OralHygieneIcon />,
    href: "#",
  },
  {
    id: 4,
    title: "Dental Treatment",
    description:
      "Lorem ipsum dolor sit amet, diument consectetur adipiscing elit.",
    icon: <DentalTreatmentIcon />,
    href: "#",
  },
  {
    id: 5,
    title: "Teeth Whitening",
    description:
      "Lorem ipsum dolor sit amet, diument consectetur adipiscing elit.",
    icon: <TeethWhiteningIcon />,
    href: "#",
  },
];

// ── useScrollReveal hook ──────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── ServiceCard ───────────────────────────────────────────────────────────────

function ServiceCard({ service, index, visible }) {
  return (
    <div
      className="flex-shrink-0 w-72 bg-white rounded-3xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      {/* Icon area */}
      <div className="w-full h-40 bg-[#EEEEF8] rounded-2xl flex items-center justify-center">
        {service.icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {service.description}
        </p>
        <a
          href={service.href}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors mt-1 inline-block"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

// ── ServicesSection (main export) ────────────────────────────────────────────

/**
 * ServicesSection
 *
 * Props:
 *   badge          – string shown in the pill above heading  (default "Our Services")
 *   heading        – main heading text
 *   buttonLabel    – CTA button label
 *   onBooking      – CTA button onClick handler
 *   services       – array of { id, title, description, icon, href }
 *   className      – extra classes on the outer section
 */
export default function ServicesSection({
  badge = "Our Services",
  heading = "Our team of dentists can help with a variety of dental services",
  buttonLabel = "Book an Appointment",
  onBooking,
  services = DEFAULT_SERVICES,
  className = "",
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className={`relative bg-[#F5F5FB] py-20 overflow-hidden ${className}`}
    >
      {/* Decorative ghost letter */}
      <div
        className="pointer-events-none absolute -right-8 -top-10 text-[220px] font-black text-indigo-100 select-none leading-none"
        aria-hidden
      >
        S
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Header row ── */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="flex flex-col gap-3">
            {/* Badge pill */}
            <span className="inline-flex self-start items-center px-4 py-1.5 rounded-full border border-indigo-200 bg-white text-indigo-600 text-sm font-semibold">
              {badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-snug max-w-lg">
              {heading}
            </h2>
          </div>

          <button
            onClick={onBooking}
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-indigo-200"
          >
            {buttonLabel}
          </button>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

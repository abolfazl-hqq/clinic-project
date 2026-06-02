import { Mail, Clock, Tooth } from "lucide-react";

// ── sub-components ──────────────────────────────────────────────────────────

function IconBadge({ children }) {
  return (
    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-3xl bg-primary flex items-center justify-center shadow-lg">
      {children}
    </div>
  );
}

function Divider() {
  return <div className="hidden md:block w-px self-stretch bg-(--border) mx-3" />;
}

// ── ContactUs ────────────────────────────────────────────────────────────────

function ContactUs({
  phone = "۰۲۱-۵۵۷۹۳",
  email = "contact@dentalic.com",
  bookingLabel = "رزرو وقت",
  onBooking,
}) {
  return (
    <div className="flex items-start gap-3 md:gap-6 flex-1 py-3 px-3 sm:px-4 md:py-8 md:px-8 min-w-0">
      <IconBadge>
        <Mail className="w-7 h-7 text-[var(--primary-foreground)]" strokeWidth={2} />
      </IconBadge>
      <div className="min-w-0 flex-1">
        <p className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">تماس با ما</p>
        <p className="text-base md:text-lg text-[var(--muted)]">{phone}</p>
        <p className="text-base md:text-lg text-[var(--muted)] mb-3">{email}</p>
        <button
          onClick={onBooking}
          className="text-base font-semibold text-[var(--primary)] hover:text-[var(--foreground)] transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          {bookingLabel}
        </button>
      </div>
    </div>
  );
}

// ── OpenHours ────────────────────────────────────────────────────────────────

function OpenHours({
  hours = [
    { days: "دوشنبه تا جمعه", time: "۸:۰۰ تا ۱۷:۰۰" },
    { days: "شنبه", time: "۹:۰۰ تا ۱۵:۳۰" },
    { days: "بقیه روزها", time: "۹:۰۰ تا ۱۵:۰۰" },
  ],
}) {
  return (
    <div className="flex items-start gap-3 md:gap-6 flex-1 py-3 px-3 sm:px-4 md:py-8 md:px-8 min-w-0">
      <IconBadge>
        <Clock className="w-7 h-7 text-[var(--primary-foreground)]" strokeWidth={2} />
      </IconBadge>
      <div className="min-w-0 flex-1">
        <p className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">ساعات کاری</p>
        {hours.map(({ days, time }) => (
          <p key={days} className="text-base md:text-lg text-[var(--foreground)]/85">
            <span className="font-semibold text-[var(--primary)]">{days}</span>
            {": "}
            {time}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Services ─────────────────────────────────────────────────────────────────

// Simple tooth SVG since lucide-react doesn't ship a Tooth icon
function ToothIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C9.5 2 7 4 7 7c0 1.5.5 3 1 4.5C8.5 13 9 16 9 18c0 2 1 4 3 4s3-2 3-4c0-2 .5-5 1-6.5C16.5 10 17 8.5 17 7c0-3-2.5-5-5-5z" />
    </svg>
  );
}

function Services({
  items = ["دندانپزشکی زیبایی", "ایمپلنت دندان", "سفید کردن دندان"],
}) {
  return (
    <div className="flex items-start gap-3 md:gap-6 flex-1 py-3 px-3 sm:px-4 md:py-8 md:px-8 min-w-0">
      <IconBadge>
        <ToothIcon className="w-7 h-7 text-[var(--primary-foreground)]" />
      </IconBadge>
      <div className="min-w-0 flex-1">
        <p className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-2">خدمات</p>
        {items.map((item) => (
          <p key={item} className="text-base md:text-lg text-[var(--muted)]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── DentalInfoBar (main export) ───────────────────────────────────────────────

/**
 * DentalInfoBar
 *
 * Props:
 *   contact  – props forwarded to <ContactUs>
 *   hours    – props forwarded to <OpenHours>
 *   services – props forwarded to <Services>
 *   className – extra Tailwind classes for the outer wrapper
 *
 * Example:
 *   <DentalInfoBar
 *     contact={{ phone: "(123) 456-7890", email: "hello@clinic.com" }}
 *     hours={{ hours: [{ days: "Mon–Fri", time: "9 AM – 6 PM" }] }}
 *     services={{ items: ["Orthodontics", "Root Canals"] }}
 *   />
 */
export default function DentalInfoBar({
  contact = {},
  hours = {},
  services = {},
  className = "",
}) {
  return (
    <div
      className={`w-full bg-[var(--background)] rounded-[2rem] shadow-2xl border border-[var(--border)] overflow-hidden ${className}`}
    >
      <div className="flex flex-col md:flex-row text-base md:text-lg gap-4 md:gap-0">
        <ContactUs {...contact} />
        <Divider />
        <OpenHours {...hours} />
        <Divider />
        <Services {...services} />
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Search,
  Hospital,
  ClipboardPlus,
  Headphones,
  ArrowRight,
  Home,
  CalendarDays,
  HeartPulse,
} from "lucide-react";

export default function NotFound() {
  return (
    <main dir="rtl" lang="fa" className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16">
        {/* soft background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(93,79,255,0.08)] via-[var(--background)] to-[rgba(93,79,255,0.16)] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <h1 className="text-[140px] leading-none font-bold text-blue-950">
              404
            </h1>

            <h2 className="text-3xl font-semibold text-[var(--foreground)] mt-5">
              <span className="text-[var(--primary)]">وای!</span> این صفحه تحت درمانه.
            </h2>

            <p className="mt-5 text-[var(--muted)] max-w-md text-lg leading-8">
              صفحه‌ای که دنبال آن هستید ممکن است حذف شده باشد یا به بخش دیگری
              منتقل شده باشد.
            </p>

            {/* heartbeat line */}
            <div className="w-72 h-10 mt-8">
              <svg viewBox="0 0 300 50">
                <path
                  d="M0 25h80l15-20 20 40 20-40 20 20h145"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
              </svg>
            </div>


            <div className="mt-8 bg-[var(--background)] rounded-2xl shadow-sm border border-[color:var(--border)] p-5 max-w-md flex gap-4">
              <div className="bg-[rgba(93,79,255,0.12)] p-3 rounded-full">
                <HeartPulse className="text-[var(--primary)]" />
              </div>

              <p className="text-[var(--foreground)]">
                نگران نباشید، تیم ما اینجا است تا شما را در مسیر درست همراهی کند.
              </p>
            </div>


            <div className="flex gap-4 mt-8 flex-col sm:flex-row">

              <Link href="/" className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-[#4b42d1] transition">
                <Home size={18}/>
                بازگشت به صفحه اصلی
              </Link>


              <Link href="/appointment" className="border border-[color:var(--border)] text-[var(--primary)] px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[rgba(93,79,255,0.08)] transition">
                <CalendarDays size={18}/>
                رزرو نوبت
              </Link>

            </div>

          </div>



          {/* Doctor Illustration */}
          <div className="relative flex justify-center">

            <div className="absolute w-[420px] h-[420px] bg-[rgba(93,79,255,0.12)] rounded-full blur-3xl opacity-60"/>

            <div className="relative">

              <div className="bg-[var(--background)] rounded-[40px] shadow-xl p-8 w-[360px]">

                <div className="w-32 h-32 bg-[rgba(93,79,255,0.12)] rounded-full mx-auto flex items-center justify-center text-6xl">
                  👨‍⚕️
                </div>

                <div className="mt-5 text-center">

                  <h3 className="font-semibold text-xl text-[var(--foreground)]">
                    دستیار پزشکی
                  </h3>

                  <p className="text-[var(--muted)] mt-2">
                    ما شما را دوباره به مسیر سلامت بازمی‌گردانیم.
                  </p>

                </div>


                <div className="mt-6 space-y-3">

                  {[
                    "پذیرش",
                    "مشاوره",
                    "داروخانه",
                    "خروج",
                  ].map((item) => (
                    <div
                      key={item}
                      className="bg-[rgba(93,79,255,0.08)] text-[var(--primary)] rounded-lg px-4 py-2"
                    >
                      {item}
                    </div>
                  ))}

                </div>

              </div>


            </div>

          </div>

        </div>

      </section>




      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-center text-2xl font-semibold text-[var(--foreground)]">
          می‌توانید یکی از این گزینه‌ها را امتحان کنید
        </h2>


        <div className="grid md:grid-cols-4 gap-6 mt-10">


          {[
            {
              icon: Search,
              title:"پیدا کردن پزشک",
              text:"پزشکان مورد اعتماد را جستجو و نوبت بگیرید."
            },
            {
              icon: Hospital,
              title:"بیمارستان‌ها",
              text:"بهترین بیمارستان‌ها و مراکز درمانی را کشف کنید."
            },
            {
              icon: ClipboardPlus,
              title:"پکیج‌های سلامت",
              text:"پکیج‌های مراقبت پیشگیرانه برای سلامتی بهتر."
            },
            {
              icon: Headphones,
              title:"پشتیبانی",
              text:"تیم ما ۲۴ ساعته آماده پاسخگویی است."
            }
          ].map((card)=>{

            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-[var(--background)] border border-[color:var(--border)] rounded-3xl p-7 text-center shadow-sm hover:shadow-lg transition"
              >

                <div className="mx-auto w-16 h-16 rounded-full bg-[rgba(93,79,255,0.12)] flex items-center justify-center">
                  <Icon className="text-[var(--primary)]"/>
                </div>


                <h3 className="mt-5 font-semibold text-[var(--foreground)] text-lg">
                  {card.title}
                </h3>

                <p className="text-[var(--muted)] mt-3 text-sm leading-6">
                  {card.text}
                </p>


                <ArrowRight className="mx-auto mt-5 text-[var(--primary)]"/>

              </div>
            )

          })}

        </div>

      </section>



      {/* Support box */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="rounded-3xl bg-[rgba(93,79,255,0.08)] border border-[color:var(--border)] p-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <div>

            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              هنوز کمک لازم دارید؟
            </h3>

            <p className="text-[var(--muted)] mt-2">
              تیم پشتیبانی ما همیشه آماده پاسخگویی است.
            </p>

            <p className="mt-3 text-[var(--primary)] font-semibold">
              ☎ ۰۲۱-۵۵۷۹۳
            </p>

          </div>


          <button className="border border-[color:var(--primary)] px-6 py-3 rounded-xl text-[var(--primary)] hover:bg-[rgba(93,79,255,0.08)] transition">
            ارتباط با ما
          </button>

        </div>

      </section>

    </main>
  );
}
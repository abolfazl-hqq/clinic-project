import DoctorSearch from "@/components/DoctorSearch";
import BackgroundRing from "@/components/BackgroundRing";

export default function Doctors() {
  return (
    <main className="bg-[#fafafa] min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">

          {/* main gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef0ff] via-[#f7f8ff] to-white" />

          {/* left circle */}
          <BackgroundRing
            size={120}
            thickness={20}
            opacity={0.65}
            className="left-20 top-20 z-0"
          />

          {/* right large circle */}
          <BackgroundRing
            size={340}
            thickness={45}
            opacity={0.65}
            className="right-[-130px] top-20 z-0"
          />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28">

          <h1 className="text-center text-5xl font-bold text-[#1b1b1b] mb-14">
            پیدا کردن پزشک متخصص شما
          </h1>

          <DoctorSearch />

        </div>
      </section>

    </main>
  );
}
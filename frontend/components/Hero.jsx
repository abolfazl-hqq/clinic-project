import React from 'react';
import Image from 'next/image';
import DentalInfoBar from './DentalInfo';

const HeroSection = () => {
  return (

    <div className="relative pb-24">

      {/* ── Hero ── */}
      <div className="relative flex flex-col md:flex-row min-h-screen overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />

        {/* Left Side */}
        <div className="relative flex-1 gap-2 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/40 to-transparent" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            یک <span className='text-primary font-black'> کلینیک حرفه ای</span> <br />
            به ما اعتماد کنید
          </h1>

          <p className="text-muted text-lg mb-8 max-w-md">
            ارائه بهترین خدمات پزشکی، دندان پزشکی، اضطراری و زیبایی
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-primary text-primary-foreground shadow px-8 py-3 rounded-2xl text-lg font-medium transition-all duration-300 hover:-translate-y-1">
              رزرو نوبت
            </button>
            <button className="shadow text-primary text-lg px-8 py-3 rounded-2xl font-medium transition-all duration-300 hover:-translate-y-1">
              جستجوی خدمات
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 relative">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              alt='clinic-photo'
              src={'/clinic_photo.jpg'}
              className='w-full h-full object-cover'
              height={100}
              width={800}
              loading='eager'
            />
          </div>
        </div>
      </div>

      {/* ── Floating InfoBar — sits half inside hero, half outside ── */}
      <div className="absolute lg:bottom-25 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-6xl z-20">
        <DentalInfoBar />
      </div>

    </div>
  );
};

export default HeroSection;

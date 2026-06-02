"use client"
import React, { useRef } from 'react';

const servicesData = [
  {
    id: 1,
    title: 'پزشک عمومی',
    description: 'تشخیص و درمان بیماری های عمومی',
  },
  {
    id: 2,
    title: 'گوش، حلق و بینی',
    description: 'تنفسی آسوده و راحت با متخصصین ما',
  },
  {
    id: 3,
    title: 'پوست و مو',
    description: 'مراقبت‌های پیشگیری و تمیز‌کاری حرفه‌ای پوست و مو برای سلامت بهتر',
  },
  {
    id: 4,
    title: 'اورولوژی',
    description: 'درمان‌های متنوع برای حفاظت و بازگرداندن سلامت جنسی خود',
  },
  {
    id: 5,
    title: 'دندانپزشکی',
    description: 'ارائه بهترین خدمات جهت زیبایی دندان و لبخند شما با تیم متخصص و با تجربه',
  },
];

export default function ServicesSlider() {
  const sliderRef = useRef(null);

  // A single function to handle both left and right clicks
  const scroll = (direction) => {
    if (sliderRef.current) {
      // Adjust this number to change how far it scrolls per click
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full lg:mt-24 py-16 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-1.5 mb-4 text-indigo-600 bg-indigo-50 rounded-full text-sm font-semibold border border-indigo-100">
              خدمات ما
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              تیم پزشکی ما برای انواع مختلف خدمات پزشکی آماده است
            </h2>
          </div>
          <button className="whitespace-nowrap px-6 py-3 bg-[#5C45FD] hover:bg-[#4b37d8] text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200">
            رزرو نوبت
          </button>
        </div>

        {/* Slider Section */}
        <div className="relative">
          
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 hover:scale-105 transition-transform"
            aria-label="اسکرول به راست"
          >
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scroll Container */}
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden -ms-overflow-style-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {servicesData.map((service) => (
              <div 
                key={service.id} 
                className="snap-start shrink-0 w-[280px] md:w-[320px] rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group"
              >
                {/* Card Top / Icon Area */}
                <div className="h-40 bg-[#F4F5FF] flex items-center justify-center p-6 transition-colors group-hover:bg-[#ebeeff]">
                   {/* Placeholder Tooth Icon using basic SVG */}
                  <svg className="w-16 h-16 text-[#1E1B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4" />
                  </svg>
                </div>

                {/* Card Bottom / Text Area */}
                <div className="p-6 bg-white flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <a href="#" className="text-[#5C45FD] font-semibold text-sm hover:underline flex items-center gap-1">
                    بیشتر بدانید
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 hover:scale-105 transition-transform"
            aria-label="اسکرول به چپ"
          >
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function DoctorsFilters({ filters, specialties, onFiltersChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      specialty: "",
      city: "",
      gender: "",
      visit_type: "",
      search: "",
    });
  };

  return (
    <aside className="overflow-hidden rounded-2xl bg-white shadow-sm lg:sticky lg:top-6 lg:h-fit lg:self-start">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-5 lg:hidden"
      >
        <h3 className="text-xl font-bold">فیلترها</h3>
        <span className="text-blue-600">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} p-5 pt-0 lg:block lg:p-5`}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="hidden text-xl font-bold lg:block">فیلترها</h3>
          <button type="button" className="text-sm text-red-500" onClick={clearFilters}>
            حذف همه فیلترها
          </button>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">تخصص</label>
          <input
            value={filters.specialty}
            onChange={(e) => updateFilter("specialty", e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="مثلاً ارتوپدی"
            list="specialty-options"
          />
          <datalist id="specialty-options">
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.name} />
            ))}
          </datalist>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">شهر</label>
          <input
            value={filters.city}
            onChange={(e) => updateFilter("city", e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="مثلاً تهران"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">جنسیت پزشک</label>
          <select
            value={filters.gender}
            onChange={(e) => updateFilter("gender", e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="">هر دو</option>
            <option value="male">آقا</option>
            <option value="female">خانم</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">نوع ویزیت</label>
          <select
            value={filters.visit_type}
            onChange={(e) => updateFilter("visit_type", e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          >
            <option value="">همه</option>
            <option value="in_person">حضوری</option>
            <option value="online">آنلاین</option>
            <option value="both">هر دو</option>
          </select>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          برای جستجوی دقیق‌تر، نام پزشک را در صفحه نوبت‌دهی وارد کنید.
        </div>
      </div>
    </aside>
  );
}
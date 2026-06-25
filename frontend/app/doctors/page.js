"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DoctorsFilters from "@/components/DoctorsFilters";
import DoctorsList from "@/components/DoctorsList";
import API from "@/lib/api";

export default function DoctorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  const filters = useMemo(() => ({
    specialty: searchParams.get("specialty") || "",
    city: searchParams.get("city") || "",
    gender: searchParams.get("gender") || "",
    visit_type: searchParams.get("visit_type") || "",
    search: searchParams.get("search") || "",
  }), [searchParams]);

  useEffect(() => {
    let ignore = false;

    const loadDoctors = async () => {
      setLoading(true);
      setError(null);

      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.specialty) params["specialty__name__icontains"] = filters.specialty;
      if (filters.city) params["city__icontains"] = filters.city;
      if (filters.gender) params.gender = filters.gender;
      if (filters.visit_type) params.visit_type = filters.visit_type;

      try {
        const res = await API.get("/specialties/doctors/", { params });
        if (!ignore) {
          setDoctors(res.data?.results || res.data || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load doctors", err);
          setError(err);
          setDoctors([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadDoctors();

    return () => {
      ignore = true;
    };
  }, [filters]);

  useEffect(() => {
    let ignore = false;

    API.get("/specialties/")
      .then((res) => {
        if (!ignore) setSpecialties(res.data || []);
      })
      .catch((err) => {
        if (!ignore) console.error("Failed to load specialties", err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleFiltersChange = (nextFilters) => {
    const params = new URLSearchParams();

    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const query = params.toString();
    router.replace(query ? `/doctors?${query}` : "/doctors");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f5f6f8]">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 rounded-xl bg-white p-4 text-center text-sm text-gray-600 shadow-sm">
          پیشنهاد می‌کنیم با بررسی و مقایسه اطلاعات موجود در صفحه هر پزشک،
          مناسب‌ترین گزینه را انتخاب کنید.
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
          <span className="font-medium">مرتب سازی بر اساس:</span>
          <button className="text-blue-600">پیشنهادی</button>
          <button className="text-gray-500">محبوب‌ترین</button>
          <button className="text-gray-500">نزدیک‌ترین نوبت آزاد</button>
          <button className="text-gray-500">بیشترین نوبت موفق</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <DoctorsFilters
            filters={filters}
            specialties={specialties}
            onFiltersChange={handleFiltersChange}
          />
          <DoctorsList doctors={doctors} loading={loading} error={error} />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, MapPin, Search } from "lucide-react";
import DoctorCard from "./DoctorCard";
import API from "@/lib/api";

const genderOptions = [
  { value: "", label: "همه" },
  { value: "female", label: "خانم" },
  { value: "male", label: "آقا" },
];

const visitTypeOptions = [
  { value: "", label: "همه" },
  { value: "in_person", label: "حضوری" },
  { value: "online", label: "آنلاین" },
  { value: "both", label: "هر دو" },
];

export default function DoctorSearch() {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialty: "",
    city: "",
    gender: "",
    visitType: "",
    search: "",
  });

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const { data } = await API.get("/specialties/");
        setSpecialties(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Failed to load specialties", error);
      }
    };

    fetchSpecialties();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (filters.search) params.append("search", filters.search);
        if (filters.specialty) params.append("specialty__id", filters.specialty);
        if (filters.city) params.append("city", filters.city);
        if (filters.gender) params.append("gender", filters.gender);
        if (filters.visitType) params.append("visit_type", filters.visitType);

        const { data } = await API.get(`/specialties/doctors/${params.toString() ? `?${params.toString()}` : ""}`);
        const doctorsData = Array.isArray(data) ? data : data.results || [];

        setDoctors(doctorsData);
        setCities(
          [...new Set(doctorsData.map((doctor) => doctor.city).filter(Boolean))].sort()
        );
      } catch (error) {
        console.error("Failed to load doctors", error);
        setDoctors([]);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filters.city, filters.gender, filters.search, filters.specialty, filters.visitType]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ specialty: "", city: "", gender: "", visitType: "", search: "" });
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="xl:col-span-2">
            <label className="font-semibold mb-3 block">جستجو</label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={filters.search}
                onChange={(event) => handleFilterChange("search", event.target.value)}
                placeholder="نام پزشک یا تخصص"
                className="border rounded-xl h-12 px-4 pr-10 w-full outline-none focus:border-[#5E5CE6]"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold mb-3 block">تخصص</label>
            <div className="relative">
              <select
                value={filters.specialty}
                onChange={(event) => handleFilterChange("specialty", event.target.value)}
                className="border rounded-xl h-12 px-4 pr-3 w-full appearance-none outline-none bg-white focus:border-[#5E5CE6]"
              >
                <option value="">همه تخصص‌ها</option>
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="font-semibold mb-3 block">مکان</label>
            <div className="relative">
              <select
                value={filters.city}
                onChange={(event) => handleFilterChange("city", event.target.value)}
                className="border rounded-xl h-12 px-4 pr-3 w-full appearance-none outline-none bg-white focus:border-[#5E5CE6]"
              >
                <option value="">همه شهرها</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="font-semibold mb-3 block">جنسیت</label>
            <div className="flex rounded-xl overflow-hidden border h-12">
              {genderOptions.map((option) => {
                const isActive = filters.gender === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleFilterChange("gender", option.value)}
                    className={`flex-1 text-sm transition ${
                      isActive ? "bg-[#5E5CE6] text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-semibold mb-3 block">نوع ویزیت</label>
            <div className="relative">
              <select
                value={filters.visitType}
                onChange={(event) => handleFilterChange("visitType", event.target.value)}
                className="border rounded-xl h-12 px-4 pr-3 w-full appearance-none outline-none bg-white focus:border-[#5E5CE6]"
              >
                {visitTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-[#5E5CE6] font-semibold"
          >
            پاک کردن فیلترها
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <h2 className="text-2xl font-bold text-[#1b1b1b]">پزشکان</h2>
        <span className="text-sm text-gray-500">
          {loading ? "در حال بارگذاری..." : `${doctors.length} پزشک`}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16 mt-6 bg-white rounded-2xl shadow-sm">
          <Loader2 className="animate-spin text-[#5E5CE6]" size={28} />
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500 mt-6">
          هیچ پزشکی با این فیلترها پیدا نشد.
        </div>
      )}
    </>
  );
}
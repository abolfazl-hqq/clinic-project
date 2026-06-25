import DoctorCard from "./DoctorCard";

export default function DoctorsList({ doctors = [], loading = false, error = null }) {
  if (loading) {
    return <div className="rounded-2xl bg-white p-6 text-center text-gray-500">در حال بارگذاری پزشکان...</div>;
  }

  if (error) {
    return <div className="rounded-2xl bg-white p-6 text-center text-red-500">خطا در بارگذاری پزشکان.</div>;
  }

  if (!doctors.length) {
    return <div className="rounded-2xl bg-white p-6 text-center text-gray-500">هیچ پزشکی با این فیلترها یافت نشد.</div>;
  }

  return (
    <div className="space-y-5">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
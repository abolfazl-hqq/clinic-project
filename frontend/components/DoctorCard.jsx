import Image from "next/image";

export default function DoctorCard({ doctor }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="p-6">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="shrink-0">
            <Image
              src={doctor.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80"}
              alt={doctor.user_full_name || "پزشک"}
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {doctor.user_full_name || "دکتر"}
                </h2>
                <p className="mt-1 text-gray-500">{doctor.specialty_name || "تخصص نامشخص"}</p>
              </div>
              <button className="text-sm font-medium text-gray-600">مشاهده پروفایل</button>
            </div>

            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <span className="text-gray-600">{doctor.city || "شهر نامشخص"}</span>
              <span className="text-blue-600">{doctor.experience_years ? `${doctor.experience_years} سال سابقه` : "سابقه ثبت نشده"}</span>
              <span className="text-green-600">{doctor.consultation_fee ? `${Number(doctor.consultation_fee).toLocaleString("fa")} تومان` : "هزینه ثبت نشده"}</span>
            </div>

            <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {doctor.clinic_name ? `کلینیک: ${doctor.clinic_name}` : "پزشک مورد تایید است."}
            </div>

            <div className="mb-3 text-gray-600">{doctor.address || "آدرس مطب ثبت نشده است."}</div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-gray-500">
                {doctor.visit_type === "online"
                  ? "ویزیت آنلاین"
                  : doctor.visit_type === "in_person"
                    ? "ویزیت حضوری"
                    : "ویزیت حضوری و آنلاین"}
              </div>
              <button className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
                نوبت مطب بگیرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
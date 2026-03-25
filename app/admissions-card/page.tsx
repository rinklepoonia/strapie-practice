
import Link from "next/link";
import { getAdmission } from "../utils/api/apiList";
import AdmissionCard from "../components/admission-card/AdmissionCard";
/* eslint-disable @typescript-eslint/no-explicit-any */
const page = async () => {
  const admission = await getAdmission();
  
  // Extract data array safely. Strapi sometimes nests it under data, or it might be the response directly.
  const admissionList = Array.isArray(admission?.data) 
    ? admission.data 
    : Array.isArray(admission) 
      ? admission 
      : [];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admissions Directory</h1>
        <p className="text-gray-500 mt-2">View and manage all student admission records.</p>
      </div>
      
      {admissionList.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-500">No admission records found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           
          {admissionList.map((item: any) => {
            // Strapi v5 uses documentId instead of id
            const cardData = item.attributes || item;
            return (
              <Link href={`/admissions-card/${item.documentId}`} key={item.documentId || Math.random()}>
                <AdmissionCard data={cardData} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;

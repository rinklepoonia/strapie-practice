import { getAdmission } from "../../utils/api/apiList";
import Link from "next/link";
import React from "react";

export default async function AdmissionDetailPage(props: { params: Promise<{ documentId: string }> }) {
  const params = await props.params;
  const { documentId } = params;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let data: any = null;
  try {
    const response = await getAdmission(documentId);
    // Handle typical Strapi v4/v5 response patterns
    data = response?.data
  } catch (error) {
    console.error("Failed to load admission:", error);
  }
    console.log(data , 'checkdata')
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="p-8 text-center mt-12 bg-gray-50 rounded-2xl max-w-2xl mx-auto border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admission Record Not Found</h2>
        <p className="text-gray-500 mt-2">The record you are looking for does not exist or fetch failed.</p>
        <Link href="/admissions-card" className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 pb-12 px-4 sm:px-6">
      {/* Navigation & Header */}
      <div className="mb-6 flex justify-between items-center print:hidden">
        <Link href="/admissions-card" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium">
          &larr; Back to Admissions
        </Link>
      </div>

      {/* Main Print Container */}
      <div className="bg-white border border-gray-300 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:border-none print:my-0">
        
        {/* Header */}
        <div className="bg-blue-600 px-8 py-8 flex justify-between items-center text-white print:bg-blue-600 print:-webkit-print-color-adjust-exact">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider">Admission Record</h1>
            <p className="opacity-90 mt-1 text-base">Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
          </div>
          <button
            className="hidden sm:block cursor-pointer bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition print:hidden"
          >
            Press Ctrl+P to Print
          </button>
        </div>

        <div className="px-8 mt-10 space-y-10 text-gray-800 pb-10">
          {/* Student Details Section */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-6 text-gray-900">Student Profile</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-36 h-36 bg-gray-50 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
                {data.studentImage ? (
                  <img src={data.studentImage} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-blue-500 opacity-60">
                    {(data.firstName?.[0] || 'S').toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 w-full mt-2">
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">First Name</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data.firstName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Last Name</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data.lastName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Date of Birth</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data.dob || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Gender</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900 capitalize">{data.gender || 'N/A'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Guardian Details Section */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-6 text-gray-900">Guardian Information</h2>

            {data?.guardian?.other?.fullName ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Guardian Name</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data.guardian.other.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Relation</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data.guardian.other.relation}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Father&apos;s Name</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data?.guardian?.fatherName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Mother&apos;s Name</p>
                  <p className="font-semibold text-xl mt-1 text-gray-900">{data?.guardian?.motherName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Father&apos;s Qualification</p>
                  <p className="font-semibold text-lg mt-1 text-gray-800">{data?.guardian?.fatherQualification || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Mother&apos;s Qualification</p>
                  <p className="font-semibold text-lg mt-1 text-gray-800">{data?.guardian?.MotherQualification || 'N/A'}</p>
                </div>
              </div>
            )}
          </section>

          {/* Address Section */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-3 mb-6 text-gray-900">Address Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Village / Street</p>
                <p className="font-semibold text-xl mt-1 text-gray-900">{data?.address?.village || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">District</p>
                <p className="font-semibold text-xl mt-1 text-gray-900">{data?.address?.district || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">State</p>
                <p className="font-semibold text-xl mt-1 text-gray-900">{data?.address?.state || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Pin Code</p>
                <p className="font-semibold text-xl mt-1 text-gray-900">{data?.address?.PinCode || 'N/A'}</p>
              </div>
            </div>
          </section>

          {/* Footer info for print */}
          <div className="mt-16 pt-16 border-t-2 border-gray-200 flex flex-col sm:flex-row justify-between items-end text-sm text-gray-500 gap-8">
            <div className="w-full sm:w-auto text-center sm:text-left">
              <p>Generated on: {new Date().toLocaleDateString()}</p>
              <p className="mt-1 text-xs">Document ID: {documentId}</p>
            </div>
            <div className="text-center w-full sm:w-auto mt-8 sm:mt-0">
              <div className="border-t-2 border-gray-800 pt-2 px-8 inline-block">
                <p className="font-bold text-gray-800">Authorized Signatory</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

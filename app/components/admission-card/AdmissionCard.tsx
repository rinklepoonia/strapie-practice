import React from 'react';

export interface AdmissionData {
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  studentImage?: string;
  guardian?: {
    fatherName?: string;
    motherName?: string;
    fatherQualification?: string;
    MotherQualification?: string;
    other?: {
      fullName?: string;
      relation?: string;
    };
  };
  address?: {
    village?: string;
    district?: string;
    state?: string;
    PinCode?: string;
  };
}

interface AdmissionCardProps {
  data?: AdmissionData;
}

const AdmissionCard: React.FC<AdmissionCardProps> = ({ data }) => {
  if (!data) return <div className="p-4 text-center">No admission data provided.</div>;

  const handlePrint = () => {
    window.print();
  };
  console.log("DATA:", data);

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white border border-gray-300 shadow-lg rounded-xl overflow-hidden print:shadow-none print:border-none print:my-0 pb-8">
      {/* Header */}
      <div className="bg-blue-600 px-8 py-6 flex justify-between items-center text-white print:bg-blue-600 print:-webkit-print-color-adjust-exact">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wider">Admission Record</h1>
          <p className="opacity-90 mt-1 text-sm">Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}</p>
        </div>
        <button 
          onClick={handlePrint}
          className= "cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-100 transition print:hidden shadow-sm"
        >
          Print Record
        </button>
      </div>

      <div className="px-8 mt-8 space-y-8 text-gray-800">
        
        {/* Student Details Section */}
        <section>
          <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-gray-900">Student Profile</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
              {data?.studentImage ? (
                <img src={data.studentImage} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">First Name</p>
                <p className="font-semibold text-lg">{data.firstName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Last Name</p>
                <p className="font-semibold text-lg">{data.lastName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
                <p className="font-semibold text-lg">{data.dob || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Gender</p>
                <p className="font-semibold text-lg">{data.gender || 'N/A'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guardian Details Section */}
        <section>
          <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-gray-900">Guardian Information</h2>
          
          {data?.guardian?.other?.fullName ? (
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
               <div>
                  <p className="text-sm text-gray-500 font-medium">Guardian Name</p>
                  <p className="font-semibold text-lg">{data.guardian.other.fullName}</p>
               </div>
               <div>
                  <p className="text-sm text-gray-500 font-medium">Relation</p>
                  <p className="font-semibold text-lg">{data.guardian.other.relation}</p>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-6 gap-x-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Father's Name</p>
                <p className="font-semibold text-lg">{data?.guardian?.fatherName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mother's Name</p>
                <p className="font-semibold text-lg">{data?.guardian?.motherName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Father's Qualification</p>
                <p className="font-semibold text-lg">{data?.guardian?.fatherQualification || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mother's Qualification</p>
                <p className="font-semibold text-lg">{data?.guardian?.MotherQualification || 'N/A'}</p>
              </div>
            </div>
          )}
        </section>

        {/* Address Section */}
        <section>
          <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-gray-900">Address Details</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm text-gray-500 font-medium">Village / Street</p>
              <p className="font-semibold text-lg">{data?.address?.village || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">District</p>
              <p className="font-semibold text-lg">{data?.address?.district || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">State</p>
              <p className="font-semibold text-lg">{data?.address?.state || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pin Code</p>
              <p className="font-semibold text-lg">{data?.address?.PinCode || 'N/A'}</p>
            </div>
          </div>
        </section>

        {/* Footer info for print */}
        <div className="mt-12 pt-16 border-t flex justify-between items-end text-sm text-gray-500">
          <div>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-center">
            <p className="border-t border-gray-500 pt-1 px-4 inline-block">Authorized Signatory</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdmissionCard;
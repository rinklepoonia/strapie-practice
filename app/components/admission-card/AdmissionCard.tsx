"use client"

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
  if (!data) return <div className="p-4 text-center text-sm text-gray-500">No data</div>;
           console.log(data)
  const fatherName = data?.guardian?.fatherName;
  const guardianOtherName = data?.guardian?.other?.fullName;
  const guardianDisplay = guardianOtherName || fatherName || 'Unknown';
  const locationDisplay = data?.address?.district ? `${data.address.district}, ${data.address.state}` : 'N/A';

  return (
    <div className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col p-6 gap-5 relative group cursor-pointer">
     
      

      {/* Header Info */}
      <div className="flex items-center gap-5 mt-2">
        <div className="w-16 h-16 bg-blue-50 rounded-full border-4 border-white shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0">
          {data?.studentImage ? (
            <img src={data.studentImage} alt="Student" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600">
              {(data?.firstName?.[0] || 'S').toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-xl text-gray-900 truncate">
            {data?.firstName || 'Unknown'} {data?.lastName || ''}
          </h3>
          <p className="text-sm font-medium text-gray-500 capitalize">{data?.gender || 'N/A'} • {data?.dob || 'N/A'}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-2 border-t border-gray-100 pt-5">
        <div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Guardian</p>
          <p className="text-gray-800 text-sm font-semibold truncate" title={guardianDisplay}>{guardianDisplay}</p>
        </div>
        <div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">Location</p>
          <p className="text-gray-800 text-sm font-semibold truncate" title={locationDisplay}>{locationDisplay}</p>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-1">
        <button className="w-full py-2 bg-gray-50 hover:bg-blue-50 text-blue-600 text-sm font-semibold rounded-xl transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AdmissionCard;

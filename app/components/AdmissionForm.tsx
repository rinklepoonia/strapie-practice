"use client";

import React, { useState } from "react";
import { Input } from "./common/Input";

export default function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  // Convert FormData to object
  const data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log("Form Data:", data);

  // Simulate submission delay
  setTimeout(() => {
    alert("Admission form submitted successfully!");
    form.reset();
    setIsSubmitting(false);
  }, 1000);
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Student Admission Form
          </h2>
          <p className="mt-2 text-blue-100 text-sm">
            Please fill in the details below carefully to complete the registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-8 space-y-12">
          {/* Section 1: Student Information */}
          <section>
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-xl font-bold leading-6 text-gray-900">Student Details</h3>
              <p className="mt-1 text-sm text-gray-500">Essential information about the student.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              <Input required type="text" label="First Name" name="firstName" placeholder="John" />
              <Input required type="text" label="Last Name" name="lastName" placeholder="Doe" />
              <Input required type="text" label="Class" name="class" placeholder="e.g. 10th Grade" />
              <Input required type="date" label="Date of Birth" name="dob" />

              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                <select required id="gender" name="gender" className="mt-2 block w-full rounded-lg border-gray-300 border p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out hover:border-blue-300 bg-white">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="studentImage" className="block text-sm font-semibold text-gray-700">Student Photo</label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex-shrink-0">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <input required type="file" name="studentImage" id="studentImage" accept="image/*" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-lg shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out w-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Guardian Information (Combined with Other Options) */}
          <section>
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-xl font-bold leading-6 text-gray-900">Guardian Details</h3>
              <p className="mt-1 text-sm text-gray-500">Provide details about the student&apos;s parents or primary guardians, including other contacts if applicable.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
              {/* Primary Guardians */}
              <Input required type="text" label="Father's Name" name="fatherName" placeholder="Father's Full Name" />
              <Input required type="text" label="Mother's Name" name="motherName" placeholder="Mother's Full Name" />
              
              <Input type="text" label="Father's Qualification" name="fatherQualification" placeholder="Highest Degree/Education" />
              <Input type="text" label="Mother's Qualification" name="motherQualification" placeholder="Highest Degree/Education" />
              
              <Input type="file" label="Father's Photo" name="fatherImage" accept="image/*" />
              <Input type="file" label="Mother's Photo" name="motherImage" accept="image/*" />

              {/* Other Contact inside Guardian Section */}
              <div className="sm:col-span-2 pt-4 mt-2 border-t border-gray-100">
                <h4 className="text-md font-semibold text-gray-700 mb-4">Other Contact Information (Optional)</h4>
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <Input type="text" label="Full Name" name="otherFullName" placeholder="Optional Contact Name" />
                  <Input type="text" label="Relation" name="relation" placeholder="e.g. Uncle, Aunt, Guardian" />
                  <Input type="file" label="Contact Person Photo" name="otherImage" accept="image/*" className="sm:col-span-2 sm:w-1/2" />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Action */}
          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center items-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting Form...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
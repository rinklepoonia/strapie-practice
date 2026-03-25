import React from "react";
import { getAdmission } from "../utils/api/apiList";
import AdmissionForm from "../components/AdmissionForm";

const page = async () => {
  const admission = await getAdmission();
  console.log(admission.data, "dxfcvbhjkmjhbgfdfgbhnmk")
  return (
    <div>
      
    </div>
  );
};

export default page;

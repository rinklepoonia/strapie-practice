
import { getAdmission } from "../utils/api/apiList";
import AdmissionCard from "../components/admission-card/AdmissionCard";

const page = async () => {
  const admission = await getAdmission();
  console.log(admission.data, "dxfcvbhjkmjhbgfdfgbhnmk")
  return (
    <div>
      <AdmissionCard data={admission.data} />
    </div>
  );
};

export default page;

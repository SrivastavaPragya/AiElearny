import PaymentSuccessPage from "@/components/payments/Sucess";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading payment status...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
};

export default page;

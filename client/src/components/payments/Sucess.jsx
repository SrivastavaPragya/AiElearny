"use client";
import { useEffect, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const token = user?.access;

  const courseId = searchParams.get("course_id");
  // console.log(token);
  // console.log(courseId);

  useEffect(() => {
    const markPurchase = async () => {
      if (!courseId || !token) return;

      try {
        const res = await fetch("http://127.0.0.1:8000/api/mark-purchase/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course_id: courseId }),
        });

        const data = await res.json();
        console.log("✅ Purchase Response:", data);
      } catch (err) {
        console.error("❌ Error marking purchase:", err);
      }
    };

    // 🕐 delay call to wait for context
    const timer = setTimeout(() => {
      markPurchase();
    }, 500); // wait 0.8s before hitting API

    // cleanup if component unmounts before timer completes
    return () => clearTimeout(timer);
  }, [courseId, token]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Your course has been added to your account.</p>
      <button
        className="mt-6 px-6 py-3 bg-[#00ECA3] text-white rounded-lg hover:bg-[#00d18b]"
        onClick={() => router.push("/mycart")}
      >
        Go to Courses
      </button>
    </div>
  );
}

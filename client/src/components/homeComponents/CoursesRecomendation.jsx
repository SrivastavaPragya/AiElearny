"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

const CoursesRecomendation = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // trigger only once
    threshold: 0.5, // when 50% visible
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="py-16 px-20 bg-[url('/violet-pista-curve.webp')] bg-[#fafafa] bg-no-repeat bg-center bg-cover grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {/* 1️⃣ Card */}
        <div
          className={`w-full py-14 flex flex-col justify-center items-center 
            hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem]
            duration-500 hover:shadow-xl cursor-pointer transition-all
            ${inView ? "animate-slide-in-from-left opacity-100" : "opacity-0"}`}
        >
          <div className="w-[4rem] h-[4rem] mb-8">
            <Image
              src="/icons/desktop.webp"
              width={64}
              height={64}
              alt="Desktop icon"
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">1600</h3>
          <p className="font-body font-light text-base">LEARN ANYTHING</p>
        </div>

        {/* 2️⃣ Card */}
        <div
          className={`w-full py-14 flex flex-col justify-center items-center 
            hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem]
            duration-500 hover:shadow-xl cursor-pointer transition-all
            ${
              inView ? "animate-slide-in-from-bottom opacity-100" : "opacity-0"
            }`}
        >
          <div className="w-[4rem] h-[4rem] mb-8">
            <Image
              src="/icons/tests-taken.webp"
              width={64}
              height={64}
              alt="Tests icon"
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">15900</h3>
          <p className="font-body font-light text-base">THAT'S A LOT</p>
        </div>

        {/* 3️⃣ Card */}
        <div
          className={`w-full py-14 flex flex-col justify-center items-center 
            hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem]
            duration-500 hover:shadow-xl cursor-pointer transition-all
            ${inView ? "animate-slide-in-from-top opacity-100" : "opacity-0"}`}
        >
          <div className="w-[4rem] h-[4rem] mb-8">
            <Image
              src="/icons/student-genius.webp"
              width={64}
              height={64}
              alt="Student genius icon"
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">1900</h3>
          <p className="font-body font-light text-base">FUTURE GENIUS</p>
        </div>

        {/* 4️⃣ Card */}
        <div
          className={`w-full py-14 flex flex-col justify-center items-center 
            hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem]
            duration-500 hover:shadow-xl cursor-pointer transition-all
            ${
              inView ? "animate-slide-in-from-right opacity-100" : "opacity-0"
            }`}
        >
          <div className="w-[4rem] h-[4rem] mb-8">
            <Image
              src="/icons/apple.webp"
              width={64}
              height={64}
              alt="Apple icon"
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">250</h3>
          <p className="font-body font-light text-base">
            ALL TRAINED PROFESSIONALS
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesRecomendation;

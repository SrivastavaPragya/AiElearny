"use client";

import { useInView } from "react-intersection-observer";

const CaseStudies = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  return (
    <div ref={ref} className="relative w-full border-b pb-[4rem]">
      {/* Top Grid */}
      <div className="grid grid-cols-2">
        <div className="bg-[#6A7CF0] flex flex-col justify-center items-end px-[5rem] py-[3rem]">
          <p className="text-white font-bold text-xl tracking-wide">
            Get to know what is best for you
          </p>
          <p className="text-white font-medium mt-2 cursor-pointer hover:text-[#00ECA3] duration-300">
            View Categories
          </p>
        </div>
        <div className="bg-[#00ECA3] flex flex-col justify-center items-start px-[5rem] py-[3rem]">
          <p className="text-white font-bold text-xl tracking-wide">
            Get to know what is best for you
          </p>
          <p className="text-white font-medium mt-2 cursor-pointer hover:text-[#6A7CF0] duration-300">
            View Collection
          </p>
        </div>
      </div>

      {/* Section Title */}
      <div>
        <div className="py-16 text-center overflow-hidden">
          <h1 className="text-4xl font-extrabold mt-3 mb-5">
            A New Era in Online Education
          </h1>
          <p className="text-base font-extralight tracking-wider">
            CASE STUDIES FOR YOU
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-2 justify-items-center gap-10">
          {/* Case Study 1 */}
          <div
            className={`${inView && "animate-slide-in-from-bottom"} opacity-0`}
          >
            <div className="w-[35rem] h-[20rem] rounded-lg flex justify-center items-center bg-center bg-cover relative bg-[url('https://img.youtube.com/vi/2JroEREiBLw/maxresdefault.jpg')] overflow-hidden">
              <div className="flex-col cursor-default w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <a
                  href="https://www.youtube.com/watch?v=2JroEREiBLw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-7xl font-light text-[#00ECA3] hover:text-[#6A7CF0]">
                    play_circle
                  </span>
                </a>
                <p className="text-white font-bold text-lg hover:text-[#6A7CF0] duration-300">
                  View Video
                </p>
              </div>
            </div>
            <p className="text-xl font-extrabold mx-2 mt-4">
              eEducation as Interpretation
            </p>
            <button className="outline-none border-none text-lg mx-2 my-1 text-[#00ECA3] font-semibold hover:text-[#6A7CF0] duration-300">
              View Case Study
            </button>
          </div>

          {/* Case Study 2 */}
          <div
            className={`${inView && "animate-slide-in-from-bottom"} opacity-0`}
          >
            <div className="w-[35rem] h-[20rem] rounded-lg flex justify-center items-center bg-center bg-cover relative bg-[url('https://img.youtube.com/vi/tz82ola3oy0/maxresdefault.jpg')] overflow-hidden">
              <div className="flex-col w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <a
                  href="https://www.youtube.com/watch?v=tz82ola3oy0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-7xl font-light text-[#00ECA3] hover:text-[#6A7CF0]">
                    play_circle
                  </span>
                </a>
                <p className="text-white font-bold text-lg hover:text-[#6A7CF0] duration-300">
                  View Video
                </p>
              </div>
            </div>
            <p className="text-xl font-extrabold mx-2 mt-4">
              Creating a Better Study Environment
            </p>
            <button className="outline-none border-none text-lg mx-2 my-1 text-[#00ECA3] font-semibold hover:text-[#6A7CF0] duration-300">
              View Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;

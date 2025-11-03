"use client";

import { useEffect, useState, useContext } from "react";
import CourseCard from "@/components/CourseCard";
import { UserContext } from "../context/UserContext";

const ITEMS_PER_PAGE = 6;

const MyCourseList = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.access) return; // ensure token exists
      setLoading(true);

      try {
        const res = await fetch("http://127.0.0.1:8000/api/my-courses/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        console.log(data);

        setCourses(data); // assume API returns array of purchased courses
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]); // refetch if user changes (login/logout)

  if (!user) {
    return (
      <p className="px-8 py-4 text-red-500">
        Please login to see your courses.
      </p>
    );
  }

  if (loading) {
    return <p className="px-8 py-4">Loading your courses...</p>;
  }

  if (courses.length === 0) {
    return <p className="px-8 py-4">No courses purchased yet.</p>;
  }

  return (
    <div className="px-[8rem] py-[4rem]">
      <p className="mx-4 font-heading text-lg">
        Showing {startIndex + 1}-{startIndex + selectedCourses.length} of{" "}
        {courses.length} results:
      </p>

      <div className="w-full my-5 gap-8 mx-2 grid grid-cols-3">
        {selectedCourses.map((item) => {
          const course = item.course; // extract inner course object
          return (
            <div
              key={item.id}
              className="w-full h-[33rem] rounded-2xl overflow-hidden border shadow-md hover:shadow-2xl hover:rounded-sm duration-300 hover:border-4 hover:border-[#00ECA3] cursor-pointer"
            >
              <div className="w-full h-[14rem] object-cover object-center relative">
                <img
                  src="/course_image11.jpg"
                  className="w-full h-full rounded-b-xl"
                  alt={course.title}
                />
                <p className="absolute bottom-[-1.5rem] right-5 bg-[#00ECA3] w-[5rem] h-[5rem] rounded-full flex items-center justify-center text-white font-body font-medium text-lg shadow-lg">
                  ${course.price}
                </p>
              </div>

              <div className="px-[2rem] pt-[2.5rem]">
                <hr />
                <h2 className="font-heading font-bold text-xl my-4">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
                <hr />

                <div className="flex items-center justify-between my-5">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden"
                      src="/icons/teacher1.png"
                      alt="Instructor"
                    />
                    <p className="font-heading font-medium text-base hover:text-[#00ECA3] cursor-pointer">
                      David Lee
                    </p>
                  </div>

                  <div className="flex gap-2 items-center hover:text-[#00ECA3] cursor-pointer">
                    <p className="font-heading font-medium text-base ">
                      Know Details
                    </p>
                    <span className="material-symbols-outlined">
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === i + 1
                ? "bg-[#00ECA3] text-white"
                : "bg-white text-black border"
            }`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyCourseList;

"use client";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const ITEMS_PER_PAGE = 6;

const AllCoursesList = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = user?.access;
  // console.log(user);
  // console.log(token);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBuyNow = async (courseId) => {
    if (!token) return alert("Please login first");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/create-checkout-session/${courseId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Failed to initiate checkout");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during checkout");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/courses/", {
          method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="px-8 py-4">Loading courses...</p>;
  }

  if (courses.length === 0) {
    return <p className="px-8 py-4">No courses available yet.</p>;
  }

  return (
    <div className="px-[8rem] py-[4rem]">
      <p className="mx-4 font-heading text-lg">
        Showing {startIndex + 1}-{startIndex + selectedCourses.length} of{" "}
        {courses.length} results:
      </p>

      <div className="w-full my-5 gap-8 mx-2 grid grid-cols-3">
        {selectedCourses.map((course) => (
          <div
            key={course.id}
            className="w-full h-[33rem] rounded-2xl overflow-hidden border shadow-md hover:shadow-2xl hover:rounded-sm duration-300 hover:border-4 hover:border-[#00ECA3] cursor-pointer"
          >
            <div className="w-full h-[14rem] object-cover object-center relative">
              <img
                src="/course_image11.jpg"
                className="w-full h-full rounded-b-xl"
                alt={course.title}
              />
              <p className="absolute bottom-[-1.5rem] right-5 bg-[#00ECA3] w-[5rem] h-[5rem] rounded-full flex items-center justify-center text-white font-body font-medium text-lg shadow-lg">
                ₹{course.price}
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
                  <button
                    className="font-heading font-medium text-base"
                    onClick={() => handleBuyNow(course.id)}
                  >
                    Buy Now
                  </button>

                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default AllCoursesList;

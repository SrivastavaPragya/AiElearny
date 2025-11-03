import JoinCourse from "@/components/aboutComponents/JoinCourse";
import CommonHero from "@/components/CommonHero";
import AllCoursesList from "@/components/CourseComponent/AllCoursesList";
import MyCourseList from "@/components/CourseComponent/MyCourseList";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-whyus.png"}
        heroHeading={"My Courses List"}
        subHeading={"PURCHASED COURSE LIST"}
      />
      <MyCourseList />
      <JoinCourse />
    </div>
  );
};

export default page;

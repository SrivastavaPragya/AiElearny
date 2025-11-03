import JoinCourse from "@/components/aboutComponents/JoinCourse";
import CommonHero from "@/components/CommonHero";
import AllCoursesList from "@/components/CourseComponent/AllCoursesList";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-whyus.png"}
        heroHeading={"Courses List"}
        subHeading={"COURSE LIST"}
      />
      <AllCoursesList />
      <JoinCourse />
    </div>
  );
};

export default page;

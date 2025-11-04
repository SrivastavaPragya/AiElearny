import Author from "@/components/homeComponents/Author";
import CaseStudies from "@/components/homeComponents/CaseStudies";
import CourseList from "@/components/homeComponents/CourseList";
import CoursesRecomendation from "@/components/homeComponents/CoursesRecomendation";
import Curriculum from "@/components/homeComponents/Curriculum";
import HeroPage from "@/components/homeComponents/Hero";
import JoinCourse from "@/components/homeComponents/JoinCourse";
import LearningPath from "@/components/homeComponents/LearningPath";

import React from "react";

const page = () => {
  return (
    <div>
      <HeroPage />
      <LearningPath />
      <CoursesRecomendation />
      <Curriculum />
      <Author />
      <CourseList />
      <CaseStudies />
      <JoinCourse />
    </div>
  );
};

export default page;

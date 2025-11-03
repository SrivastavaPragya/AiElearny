import { CoursesForU } from "@/components/aboutComponents/CoursesForU";
import { Educations } from "@/components/aboutComponents/Educations";
import JoinCourse from "@/components/aboutComponents/JoinCourse";
import { Options } from "@/components/aboutComponents/Options";
import CommonHero from "@/components/CommonHero";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonHero
        Image={
          "https://elearni.wpenginepowered.com/wp-content/themes/elearni/images/breadcrumb.png"
        }
        heroHeading={"About"}
        subHeading={"ABOUT"}
      />
      <Options />
      <Educations />
      <CoursesForU />
      <JoinCourse />
    </div>
  );
};

export default page;

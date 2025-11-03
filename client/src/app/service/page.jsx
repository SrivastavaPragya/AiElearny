import CommonHero from "@/components/CommonHero";
import JoinCourse from "@/components/homeComponents/JoinCourse";
import AllServices from "@/components/servicesComponents/AllServices";
import ModernTechniques from "@/components/servicesComponents/ModernTechniques";
import SpecialFatures from "@/components/servicesComponents/SpecialFatures";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-services.png"}
        heroHeading={"Services"}
        subHeading={"SERVICES"}
      />
      <AllServices />
      <ModernTechniques />
      <SpecialFatures />
      <JoinCourse />
    </div>
  );
};

export default page;

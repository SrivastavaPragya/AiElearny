import CommonHero from "@/components/CommonHero";
import Details from "@/components/ContactComponent/Details";
import GetInTouch from "@/components/ContactComponent/GetInTouch";
import MyGoogleMap from "@/components/ContactComponent/MyGoogleMap";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-students.png"}
        heroHeading={"Contact"}
        subHeading={"CONTACT"}
      />
      <MyGoogleMap />
      <Details />
      <GetInTouch />
    </div>
  );
};

export default page;

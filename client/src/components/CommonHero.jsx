// import React from "react";

// const CommonHero = () => {
//   return <div>CommonHero</div>;
// };

// export default CommonHero;

const CommonHero = ({ Image, heroHeading, subHeading }) => {
  return (
    <div
      className={`registerHero flex items-end px-[8rem] py-[4rem]`}
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="text-white">
        <h1 className="text-[4rem] font-extrabold ">{heroHeading}</h1>
        <p className={`w-full h-[3px] bg-white rounded-md registerLine`}></p>
        <p className="font-extralight tracking-widest mt-6">
          HOME / {subHeading}
        </p>
      </div>
    </div>
  );
};

export default CommonHero;

"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  faFacebookF,
  faTwitter,
  faVimeoV,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

import { usePathname, useRouter } from "next/navigation";

import Login from "@/components/Login";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SignupModal from "./Signup";
import { UserContext } from "./context/UserContext";
// import { BASE_URL } from "@/config";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const { user, logout } = useContext(UserContext);

  const path = usePathname();
  const router = useRouter();

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignupModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignupModal = () => {
    setSignUpModalOpen(false);
  };

  const logoutHandle = () => {
    setLoggedOut((prev) => !prev);
  };

  const navigateToCart = () => {
    router.push("/mycart");
  };

  return (
    <div className="px-[5rem] py-2 bg-[#222222]">
      <div className="border-b-[.1px] border-[#969696] py-2 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <FontAwesomeIcon
            icon={faGoogle}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faFacebookF}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faTwitter}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faVimeoV}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />
        </div>
      </div>
      <div className="w-full flex justify-between py-3">
        <div className=" w-[8rem] h-auto object-contain object-center flex items-center justify-center">
          <Link href={"/"}>
            <img src="/icons/logo.webp" alt="" className="" />
          </Link>
        </div>

        <ul
          className={`flex gap-1 items-center justify-center navbar relative left-10`}
        >
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 `}
          >
            <p className="duration-300">
              <Link href={"/"}>Home</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 `}
          >
            <p className="duration-300">
              <Link href={"/about"}>About</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 `}
          >
            <p className="duration-300">
              <Link href={"/service"}>Services</Link>
            </p>
          </li>

          {/* <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/whyus" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/whyus"}>Why Us</Link>
            </p>
          </li> */}
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 `}
          >
            <p className="duration-300">
              <Link href={"/courses"}>Courses</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 `}
          >
            <p className="duration-300">
              <Link href={"/contact"}>Contact</Link>
            </p>
          </li>
        </ul>

        <div className="flex gap-5">
          {user ? (
            <div
              className={`flex items-center justify-center gap-2 cursor-pointer duration-200 hover:text-[#00ECA3] ${
                path === "/mycart" ? "text-[#00ECA3]" : "text-white"
              }`}
              onClick={navigateToCart}
            >
              <span className="material-symbols-outlined text-xl">
                shopping_cart
              </span>
              <p className="font-body text-base">My Courses</p>
            </div>
          ) : (
            <>
              <button
                className="flex items-center justify-center text-[#969696] gap-1 hover:text-[#00eda4] hover:shadow-md duration-200"
                onClick={openLoginModal}
              >
                <span className="material-symbols-outlined text-xl text-white transition">
                  lock_open
                </span>
                <p className="font-body font-light text-white transition">
                  Login
                </p>
              </button>
              <button
                onClick={openSignupModal}
                className="flex items-center justify-center gap-1 hover:text-[#00eda4] hover:shadow-md text-white duration-200"
              >
                <span className="material-symbols-outlined text-xl transition">
                  person
                </span>
                <p className="font-body font-light text-base transition">
                  Register
                </p>
              </button>
            </>
          )}
        </div>

        {signUpModalOpen && (
          <SignupModal
            openSignupModal={signUpModalOpen}
            closeSignupModal={closeSignupModal}
          />
        )}
      </div>

      {/* @ts-ignore */}
      <Login isOpen={isLoginOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Header;

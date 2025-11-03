"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

export default function SignupModal({ openSignupModal, closeSignupModal }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);

  if (!openSignupModal) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        username: form.name,
        password: form.password,
      };

      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        login(data);

        localStorage.setItem("user", JSON.stringify(data));

        closeSignupModal();
        router.push("/courses");
      } else {
        toast.error(
          data.detail || "Signup failed. Try again with a different username."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        {/* Close Button */}
        <button
          onClick={closeSignupModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-[#00ECA3]">
              <User className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-[#00ECA3]">
              <Lock className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#00ECA3] hover:bg-[#00d091]"
            } text-white font-medium py-2 rounded-lg transition-all duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-[#00ECA3] font-semibold cursor-pointer hover:underline"
            onClick={() => {
              router.push("/login");
              closeSignupModal();
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </div>,
    document.body
  );
}

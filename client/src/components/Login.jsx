"use client";

import { useState, useContext } from "react";
import { Mail, Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { UserContext } from "../components/context/UserContext";

export default function LoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful! 🎉");

        login(data);
        onClose();
        router.push("/courses");
        setForm({ email: "", password: "" }); // clear form
      } else {
        toast.error(data.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-[#00ECA3]">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                name="email"
                value={form.email}
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
            className={`w-full bg-[#00ECA3] hover:bg-[#00d091] text-white font-medium py-2 rounded-lg transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            className="text-[#00ECA3] font-semibold cursor-pointer hover:underline"
            onClick={() => {
              router.push("/signup");
              onClose();
            }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>,
    document.body
  );
}

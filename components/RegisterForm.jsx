"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }
    if (name.trim() === "") {
      setNameError("Please enter your name");
      return;
    }
    if (email.trim() === "") {
      setEmailError("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Please enter your password");
      return;
    }
    // If all validations pass, submit the form
    setError("");
    // Your form submission logic goes here
    

    

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
      <h1 className="text-xl font-bold my-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          value={name}
          type="text"
          placeholder="Full Name"
        />
        {nameError && (
          <div className="text-red-500 text-sm">{nameError}</div>
        )}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          value={email}
          type="text"
          placeholder="Email"
        />
        {emailError && (
          <div className="text-red-500 text-sm">{emailError}</div>
        )}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          value={password}
          type="password"
          placeholder="Password"
        />
        {passwordError && (
          <div className="text-red-500 text-sm">{passwordError}</div>
        )}
        <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2 rounded-lg">
          Register
        </button>

        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}

        <a className="text-sm mt-3 text-right" href="/">
          Already have an account? <span className="underline">Login</span>
        </a>
      </form>
    </div>
  </div>
  );
}
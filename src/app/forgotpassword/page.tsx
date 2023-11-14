"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const resetPass = async () => {
    try {
      setLoading(true);
      setMessage(true);
      const response = await axios.post("api/users/forgotpassword", {
        email: email,
      });
      console.log("forgot password success", response.data);
      toast.success("Login success");
    } catch (error: any) {
      console.log("Forgot Password failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };
  return (
    <>
      {!message && (
        <input
          placeholder="enter your email here"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      )}
      {!buttonDisabled && !message && (
        <button
          onClick={resetPass}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Reset
        </button>
      )}
      {message && <div>Check your email for the rest link</div>}
    </>
  );
}

"use client";
import React from "react";
import axios from "axios";

function ResetPage() {
    const handleResetPassword = (event: React.FormEvent) => {
      event.preventDefault();
      const token = (event.target as any).token.value;
      const password = (event.target as any).password.value;
      try {
        axios.post("/api/users/reset", {token, password});
      } catch (error: any) {
        console.error(error);
      }
    }

  return (
    <div>
        <h1>Reset Password</h1>
        <hr />
        <form className="flex flex-col items-center justify-center min-h-screen py-2" onSubmit={handleResetPassword}>
            <input
            type="token"
            name="token"
            placeholder="Enter Token"
            className="p-2 border border-gray-400 rounded text-black"
            />
            <input
            type="password"
            name="password"
            placeholder="Confirm new password"
            className="p-2 border border-gray-400 rounded mt-2 text-black"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-2"
            >
            Reset Password
            </button>
        </form>
    </div>
  )
}

export default ResetPage
"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [email, setEmail] = React.useState("");

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    const router = useRouter();
    try {
    axios.get(`/api/users/reset?email=${email}`);
    router.push("/reset");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>profile</h1>
      <hr />
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
      <form className="flex flex-col items-center justify-center py-2" onSubmit={handleResetPassword}>
            <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-400 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-2"
            >
            Reset Password
            </button>
        </form>
    </div>
  );
}

export default Profile;

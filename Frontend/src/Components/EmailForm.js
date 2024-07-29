// src/components/EmailForm.js
import React, { useState } from "react";
import axios from "axios";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/notify", { email });
      alert("Notification request sent!");
    } catch (error) {
      console.error(
        "There was an error sending the email notification!",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-4 h-max">
      <div className="text-lg">Subscribe to Notifications.</div>
      <input
        className="text-2xl text-blue-600 bg-slate-200 p-2 rounded-lg w-full"
        type="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-xl p-3 bg-blue-500 text-white rounded-lg mt-2 items-center"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}

export default EmailForm;

import React, { useRef } from "react";

export default function AddPhone() {
  const form = useRef();

  return (
    <div
      ref={form}
      className="flex flex-col items-center justify-center gap-3 bg-neutralLight px-6 py-8 md:w-screen"
    >
      <label htmlFor="name" className="text-primaryLight w-full">
        Name
        <input
          className="outline-primaryLight mt-1 block w-full items-start rounded bg-neutralLight px-5 py-1.5 placeholder:text-neutral"
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          required
        />
      </label>
      <label htmlFor="email" className="text-primaryLight w-full">
        Email
        <input
          className="outline-primaryLight mt-1 block w-full items-start rounded bg-neutralLight px-5 py-1.5 placeholder:text-neutral"
          type="email"
          placeholder="Email"
          id="email"
          name="user_email"
          required
        />
      </label>
      <label htmlFor="message" className="text-primaryLight w-full">
        Message
        <textarea
          className="outline-primaryLight mt-1 block h-[200px] w-full resize-none items-start rounded bg-neutralLight px-5 py-1.5 placeholder:text-neutral"
          placeholder="Message"
          id="message"
          name="message"
          required
        />
      </label>
      <button
        className="font-header text-neutralLightest w-full rounded bg-gradient-to-t from-[#4E5DB6]/95 to-[#9969C4] py-3 font-extrabold"
        type="submit"
      >
        Send
      </button>
    </div>
  );
}

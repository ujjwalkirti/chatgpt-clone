"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import MessageContainer from "./_components/MessageContainer";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
  });

  //always scroll to latest message
  useEffect(() => {
    const messagesDiv = document.getElementById("messages");
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="px-2 h-screen w-full md:w-4/5 xl:w-3/5 mx-auto flex flex-col justify-center">
      <MessageContainer messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 p-2 bg-gray-600 h-1/5 text-black"
      >
        <textarea
          name="prompt"
          className="w-full border h-[200px] p-2 bg-gray-300"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-black text-white p-2 cursor-pointer rounded-lg font-bold w-1/2"
        >
          Submit
        </button>
      </form>
      {/* list errors if any */}
      {error && <div className="text-red-500 mt-10">{error.message}</div>}
    </div>
  );
}

"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  //always scroll to latest message
  useEffect(() => {
    const messagesDiv = document.getElementById("messages");
    if (messagesDiv) {
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="px-2 h-screen">
      <div id="messages" className="border border-gray-300 p-2 mt-2 mb-3 rounded-sm shadow-lg h-3/5 overflow-y-scroll">
        {messages.map((message) => (
          <div key={message.id} className="p-2 w-auto">
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 p-2 bg-gray-300 h-1/5"
      >
        <textarea
          name="prompt"
          className="w-full bg-white border h-[200px] p-2"
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

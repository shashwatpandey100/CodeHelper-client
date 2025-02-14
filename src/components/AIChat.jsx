import React from "react";
import Markdown from "react-markdown";
import { FaArrowUp } from "react-icons/fa6";

const AIChat = ({ review }) => {
  const markdownContent = typeof review === "string" ? review : "";

  return (
    <div className="h-full w-full p-2 text-[13px] relative">
      {/* {markdownContent && <Markdown>{markdownContent}</Markdown>} */}
      <div className="h-[180px] w-[calc(90%-1rem)] absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/5 rounded-[25px] p-6">
        <textarea
          name=""
          id=""
          placeholder="What question are we solving today?"
          className="h-full w-full bg-transparent resize-none focus:outline-none placeholder:text-[15px] text-[15px]"
        ></textarea>
        <button className="cursor-pointer hover:bg-white/70 bg-white/50 h-[42px] aspect-square rounded-full absolute bottom-4 right-4 flex items-center justify-center text-[#010d18] text-[1.15rem]"><FaArrowUp /></button>
      </div>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[12px] text-white/60">
        AI can make mistakes, check important information.
      </span>
    </div>
  );
};

export default AIChat;

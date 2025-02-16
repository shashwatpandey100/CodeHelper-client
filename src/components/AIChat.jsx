import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import MarkdownRenderer from "./MarkdownRenderer";

const AIChat = ({
  review,
  reviewCode,
  isReviewLoading,
  isIdol,
  question,
  setQuestion,
}) => {
  const markdownContent = typeof review === "string" ? review : "";

  return (
    <div className="h-full w-full p-2 text-[13px] relative flex flex-col items-center">
      <div className="h-[calc(100%-154px-2rem)] w-[calc(90%-1rem)] mt-4 rounded-[25px] overflow-scroll bg-[#021220] relative">
        {isIdol ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full">
            <h2 className="linear-wipe">How can I help you today?</h2>
          </div>
        ) : isReviewLoading ? (
          <div className="linear-wipe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            mimo is evaluating
          </div>
        ) : (
          markdownContent && <MarkdownRenderer content={markdownContent} />
        )}
      </div>
      <div className="h-[154px] w-full absolute bottom-0 flex flex-col py-1 items-center justify-between">
        <div className="h-[118px] w-[calc(90%-1rem)] bg-white/5 rounded-[25px] p-6 relative">
          <textarea
            name="question"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What question are we solving today?"
            className="h-full w-full bg-transparent resize-none focus:outline-none placeholder:text-[15px] text-[15px] text-white/60"
          ></textarea>
          <button
            onClick={reviewCode}
            title="submit"
            className="cursor-pointer hover:bg-white/70 bg-white/30 h-[36px] aspect-square rounded-full absolute bottom-4 right-4 flex items-center justify-center text-[#010d18] text-[1rem]"
          >
            <FaArrowUp />
          </button>
        </div>
        <span className="text-[10px] text-white/60">
          AI can make mistakes, check important information.
        </span>
      </div>
    </div>
  );
};

export default AIChat;

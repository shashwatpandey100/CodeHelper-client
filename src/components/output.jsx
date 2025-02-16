import React from "react";

const Output = ({ output, setOutput, isLoading }) => {
  return (
    <div
      className={`h-[calc(160px-6px)] w-full border-t border-[#1d2b4d65] px-6 py-4 relative ${
        isLoading ? "flex items-center justify-center" : ""
      }`}
    >
      {isLoading ? (
        <div className="loader opacity-40 invert"></div>
      ) : output ? (
        <textarea
          value={output}
          className="text-[14px] text-white/90 font-[300] focus:outline-none w-full h-full bg-transparent resize-none codeFONT"
        />
      ) : (
        <p className="text-[13px] text-white/30 font-[500]">
          <span className="text-[13px]">Click "run" to see the output here.</span>
        </p>
      )}
      <button
      title="clear output"
        onClick={() => setOutput("")}
        className="absolute bottom-[12px] right-[12px] cursor-pointer w-max rounded-md bg-[#5413ab] hover:bg-[#5413ab]/80 text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]"
      >
        Clear
      </button>
    </div>
  );
};

export default Output;

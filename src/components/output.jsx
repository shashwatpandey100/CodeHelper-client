import React from "react";

const Output = ({ output, setOutput, isLoading }) => {
  return (
    <div
      className={`h-[calc(210px-6px)] w-full rounded-lg border border-[#1d2b4d] px-6 py-4 relative ${
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
          Click "run" to see the output here.
        </p>
      )}
      <div
        onClick={() => setOutput("")}
        className="absolute bottom-2 right-2 cursor-pointer w-max rounded-md bg-[#5413ab] hover:bg-[#5413ab]/80 text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]"
      >
        Clear
      </div>
    </div>
  );
};

export default Output;

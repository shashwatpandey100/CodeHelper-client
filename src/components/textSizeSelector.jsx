import React from "react";
import { RxFontSize } from "react-icons/rx";

const FontSizeSelector = ({ textSize, setTextSize }) => {
  const [open, setOpen] = React.useState(false);

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer relative w-max rounded-md bg-white/10 hover:bg-[rgba(255,255,255,0.07)] text-[12px] flex items-center justify-center px-4 py-1.5 gap-2 font-[600]"
      >
        <RxFontSize className="text-[1rem]" />
        <span>{textSize} px</span>
      </div>
      {open && (
        <div className="z-[999] absolute top-[35px] rounded-md bg-slate-900 border border-white/10 min-h-[35px] min-w-[100px] flex flex-col p-1">
          {Array.from({ length: 10 }, (_, i) => i + 10).map((size) => (
            <div
              key={size}
              onClick={() => {
                setTextSize(size);
                setOpen(false);
              }}
              className="cursor-pointer rounded hover:bg-white/10 px-3 py-1 text-[14px]"
            >
              {size} px
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontSizeSelector;

function useOutsideAlerter(ref, setOpen) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

import React from "react";

const Button = ({ children, onClick, selected }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-amber-500 rounded-md py-0.5 px-1 sm:py-1 sm:px-3 md:py-3 md:px-5 cursor-pointer hover:bg-amber-500 text-xs sm:text-sm md:text-base active:scale-95 ${
        selected ? `bg-amber-500` : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

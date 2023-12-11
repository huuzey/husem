import React from "react";

const Satisfaction = (props) => {
  const { pic, title, fun, value, back } = props;
  return (
    <div className="flex flex-col w-full items-stretch justify-evenly mr-3 gap-2 ">
      <img
        src={pic}
        alt="title"
        className="w-[80%] h-[80%]   rounded-3xl object-contain"
      />
      <button
        onClick={() => {
          fun(value);
        }}
        className={`${
          back ? "bg-[rgb(203,49,92)]" : ""
        }   text-white border-2 w-3/4  sm:px-1 md:px-0 flex items-center  justify-center text-[9px] md:text-[10px] sm:font-light md:font-semibold py-1 border-black bg-[#32a8a4]   rounded-full`}
      >
        {title}
      </button>
    </div>
  );
};

export default Satisfaction;

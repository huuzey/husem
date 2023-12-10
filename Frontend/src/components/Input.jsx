import React from "react";

const Input = (datas) => {
  const { type, placehold, value, fun } = datas;
  return (
    <div>
      <input
        required
        value={value}
        onChange={(e) => {
          fun(e.target.value);
        }}
        type={type}
        placeholder={placehold}
        className="border-2 px-4  py-2 border-b-0 focus: placeholder:text-[#32a8a4] focus:scale-105  focus:outline-none rounded-tr-2xl rounded-tl-2xl  border-[#32a8a4] flex items-center justify-center text-[#32a8a4]"
      />
    </div>
  );
};

export default Input;

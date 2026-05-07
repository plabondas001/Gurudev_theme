import React, { useState } from "react";

const Color = () => {
  const [color, setColor] = useState("");

  return (
    <div className="mb-3">
      <h1 className="font-semibold text-2xl">Color</h1>
      <div className="flex items-center gap-3 p-2 rounded-md w-fit bg-white">
        {/* Blue */}
        <button
          onClick={() => setColor("blue")}
          className={`w-6 h-6 cursor-pointer rounded bg-sky-500 border-2 border-white shadow-md ring-2 ${
            color === "blue" ? "ring-sky-500" : "ring-transparent"
          }`}
        ></button>

        {/* Black */}
        <button
          onClick={() => setColor("black")}
          className={`w-6 h-6 cursor-pointer rounded bg-black border-2 border-white shadow-md ring-2 ${
            color === "black" ? "ring-black" : "ring-transparent"
          }`}
        ></button>

        {/* Gray */}
        <button
          onClick={() => setColor("gray")}
          className={`w-6 h-6 cursor-pointer rounded bg-gray-200 border-2 border-white shadow-md ring-2 ${
            color === "gray" ? "ring-gray-200" : "ring-transparent"
          }`}
        ></button>
        {/* Green */}
        <button
          onClick={() => setColor("green")}
          className={`w-6 h-6 cursor-pointer rounded bg-green-600 border-2 border-white shadow-md ring-2 ${
            color === "green" ? "ring-green-600" : "ring-transparent"
          }`}
        ></button>
      </div>
    </div>
  );
};

export default Color;

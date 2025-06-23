import React from "react";
import { Link } from "react-router-dom";

export default function Any() {
  return (
    <div className="p-10 flex flex-col">
      <div className="text-center font-medium">
        <h1 className="text-xl dark:text-white">
          دفع الرسوم النقابية للمهندسين المنتسبين
        </h1>
        <h1 className="text-xl dark:text-white">
          حتى عام{" "}
          <span className="text-custom-maincolor dark:text-blue-500 font-bold">
            2024
          </span>
        </h1>
      </div>
      <Link
        to={"/"}
        className="text-white bg-custom-maincolor hover:bg-custom-maincolor/95 h-10  rounded-sm mt-14 mx-auto_ flex justify-center items-center"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}

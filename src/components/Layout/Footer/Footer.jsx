import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-row items-center justify-center bg-slate-100 p-1 gap-1 dark:bg-gray-900 dark:text-white">
      <h5 className="text-center">
      جميع الحقوق محفوظة © لـ {" "}
        <a href="https://hometecs.sy/" className="text-orange-400 font-medium">
          HomeTecs
        </a>{" "}
        
      </h5>
      <h5> | 2024 </h5>
    </div>
  );
}

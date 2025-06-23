import React from "react";
import logo from "./../../../assets/images/logo.png";
import flag from "./../../../assets/images/flag.png";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between bg-slate-100 dark:bg-gray-900">
      <div className="flex items-center px-2 gap-2">
        <img src={logo} alt="" className="w-12 h-w-12" />
        <div className=" font-tajawal font-medium dark:text-white">
          <h5 style={{fontSize: "15px"}}>نقابة المهندسين السوريين </h5>
          <h5 style={{fontSize: "16px"}} className="text-blue-950 dark:text-blue-500 ">فرع حمص</h5>
        </div>
      </div>
      <img src={flag} alt="" className="w-16 h-16 block" />
    </nav>
  );
}

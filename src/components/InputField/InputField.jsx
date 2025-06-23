import React from "react";

export default function InputField({
  title,
  id,
  value,
  onChange,
  pull = false,
  type = "text",
  direction = "rtl",
  required = false,
  isDisabled = false,
}) {
  if (type == "select")
    return (
      <div className={pull ? "md:col-span-2" : ""}>
        <label className="text-sm font-medium -gray-700 dark:text-white">
          {title}
        </label>
        {required ? <span className="text-red-600 font-bold ">*</span> : ""}
        <select
          className="block w-full px-4 py-2 mt-2 h-10 bg-slate-100 border border-dashed border-t-0 border-r-0 border-l-0 border-custom-maincolor rounded-sm  focus:border-custom-maincolor focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => onChange(e.target.value)}
        >
          {value.map((selector, index) => {
            return <option key={index}>{selector}</option>;
          })}
        </select>
      </div>
    );

  return (
    <div className={pull ? "md:col-span-2" : ""}>
      <label className="text-sm font-medium  dark:text-white">{title}</label>
      {required ? <span className="text-red-600 font-bold ">*</span> : ""}
      <input
        id={id}
        name={id}
        type={type}
        className="block w-full px-4 py-2 mt-2 h-10 bg-slate-100 border border-dashed border-t-0 border-r-0 border-l-0 border-custom-maincolor rounded-sm  focus:border-custom-maincolor focus:outline-none focus:ring-2
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
        style={{ direction: direction }}
        value={value}
        onChange={(e) => onChange(e.target)}
        required={required}
        disabled={isDisabled}
      />
    </div>
  );
}

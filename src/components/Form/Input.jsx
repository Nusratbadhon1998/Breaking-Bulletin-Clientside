import React from "react";

function Input({name,label,type}) {
  return (
    <div className="space-y-1 text-sm">
      <label htmlFor="Email" className="block text-stone-600 font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={label}
        className="w-full border px-4 py-3 rounded-md border-black bg-stone-50 text-stone-800"
      />
    </div>
  );
}

export default Input;

"use client";

import React from "react";
import type { AuthInputProps } from "~/types/auth";

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default AuthInput;

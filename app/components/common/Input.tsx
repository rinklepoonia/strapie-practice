import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, name, id, className = '', ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={id || name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        name={name}
        id={id || name}
        className={`mt-2 block w-full rounded-lg border-gray-300 border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out hover:border-blue-300 ${
          props.type === 'file'
            ? 'bg-white py-2 px-3 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'
            : ''
        }`}
        {...props}
      />
    </div>
  );
};
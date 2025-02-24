import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-first-name"
        {...props}
      />
    </div>
  );
};

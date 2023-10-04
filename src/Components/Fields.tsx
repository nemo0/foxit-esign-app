import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...rest }) => (
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700">{label}</label>
    <input
      {...rest}
      className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  children,
  ...rest
}) => (
  <div className="flex flex-col">
    <label className="mb-2 font-medium text-gray-700">{label}</label>
    <select
      {...rest}
      className="border p-2 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    >
      {children}
    </select>
  </div>
);

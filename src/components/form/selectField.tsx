import React from 'react';
import { useField } from 'formik';

interface Option {
  name: string;
  uid: string;
}

interface SelectFieldProps {
  label: string
  name: string
  placeholder?: string
  options: Option[];
}

export const SelectField = (props: SelectFieldProps) => {
  const [field, meta] = useField(props);

  return (
    <fieldset className='mb-6'>
      <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2 md:text-lg md:mb-3">
        {props.label}
      </label>
      <select
        id={props.name}
        {...field}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${meta.touched && meta.error ? 'border-red-500' : ''
          }`}
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option, idx) => (
          <option key={idx} value={idx}>
            {option.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1 md:text-sm">{meta.error}</div>
      ) : null}
    </fieldset>
  );
};

export default SelectField;

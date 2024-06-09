import React from 'react';
import { useField } from 'formik';

interface MessageFieldProps {
  label: string;
  name: string;
  type: string;
}

export const MessageField = (props: MessageFieldProps) => {
  const [field, meta] = useField('message');

  return (
    <fieldset className="mb-6">
      <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2 md:text-lg md:mb-3">
        {props.label}
      </label>
      <textarea
        {...field}
        {...props}
        className={`mt-1 block w-full min-h-[150px] border border-gray-300 rounded-md shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${meta.touched && meta.error ? 'border-red-500' : ''
          }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1 md:text-sm">{meta.error}</div>
      ) : null}
    </fieldset>
  );
};

export default MessageField;

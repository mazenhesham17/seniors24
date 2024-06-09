import React from 'react';
import { useField } from 'formik';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
}

export const InputField = (props: InputFieldProps) => {
    const [field, meta] = useField(props);
    return (
        <fieldset className="mb-6">
            <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2 md:text-lg md:mb-3">
                {props.label}
            </label>
            <input
                {...field}
                {...props}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-4 ${meta.touched && meta.error ? 'border-red-500' : ''
                    }`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs mt-1 md:text-sm">{meta.error}</div>
            ) : null}
        </fieldset>
    )
}

export default InputField;

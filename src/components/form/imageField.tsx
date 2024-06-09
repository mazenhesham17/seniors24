import React from 'react';

interface ImageFieldProps {
  label: string;
  name: string;
  type: string;
  update: (file: File) => void;
}

const ImageField = ({ update, ...props }: ImageFieldProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      update(file);
    }
  };

  return (
    <fieldset className='mb-6'>
      <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2 md:text-lg md:mb-3">
        {props.label}
      </label>
      <input
        {...props}
        accept='image/*'
        onChange={handleChange}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm  file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </fieldset>
  );
};

export default ImageField;

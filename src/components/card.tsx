import React from 'react';
import Image from 'next/image';

interface CardProps {
  imageUrl: string;
  message: string;
  date: string;
}

export const Card = (props: CardProps) => {
  return (
    <li className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-md">
      <div className="absolute top-2 left-2 w-12 h-12">
        <Image
          src='/gown.png'
          alt="gown"
          width='48'
          height='48'
          className="w-full h-full object-cover rounded"
        />
      </div>
      {props.imageUrl && (
        <div className="mt-2">
          <img src={props.imageUrl} alt="Message" className="w-full h-full object-cover rounded" />
        </div>
      )}
      <div className="overflow-y-auto max-h-44 max-w-full mt-4">
        <p className="text-md break-words">{props.message}</p>
      </div>
      <p className="mt-2 text-sm text-right text-gray-500">{props.date}</p>
    </li>
  );
};

export default Card;

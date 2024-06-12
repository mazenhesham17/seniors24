import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { downloadMemory } from '@/lib/utils/download';

interface CardProps {
  id: number;
  sender: string;
  imageUrl: string;
  message: string;
  date: string;
}

export const Card = (props: CardProps) => {

  const isArabic = props.message.match(/[\u0600-\u06FF]/);

  return (
    <li id={`card-${props.id}`} className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-md">
      {props.imageUrl && (
        <>
          <div className="absolute top-2 left-2 w-12 h-12">
            <Image
              src='/gown.png'
              alt="gown"
              width='400'
              height='400'
              className="w-full h-full object-cover rounded"
              priority 
            />
          </div>
          <div className="mt-2">
            <img src={props.imageUrl} alt="Message" className="w-full h-full object-cover rounded" />
          </div>
        </>

      )}
      <div id={`scroll-element-${props.id}`} className={`overflow-y-auto max-w-full ${props.imageUrl ? 'max-h-40 mt-4' : 'max-h-120'}`}>
        <p className={`text-base break-words ${isArabic ? 'text-right' : ''}`}>{props.message}</p>
      </div>
      <p className="text-base font-bold text-left">{props.sender}</p>
      <div className="flex items-end justify-end space-x-2">
        <FontAwesomeIcon id={`hide-element-${props.id}`} className="text-primary cursor-pointer"
          icon={faDownload}
          onClick={async () => {
            await downloadMemory(props.id)
            console.log('Downloaded')
          }} />
        <p className="text-sm text-right text-gray-500">{props.date}</p>
        <Image src='/signature.png' alt="gown" width='383' height='322' className="w-10 object-cover rounded" priority />
      </div>
    </li>
  );
};

export default Card;

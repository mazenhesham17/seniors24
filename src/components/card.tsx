import React, { useState } from 'react';
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
  const [downloading, setDownloading] = useState(false);

  return (
    <li id={`card-${props.id}`} className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-md">
      {props.imageUrl && (
        <>
          <div className="absolute top-2 left-0 w-14 h-14">
            <img src='https://firebasestorage.googleapis.com/v0/b/seniors-24.appspot.com/o/assets%2Fgown.png?alt=media&token=8ecce6e6-aa5e-4f09-8b71-cd1d3132702a' alt="gown" className="w-full h-auto" />
          </div>
          <div className="mt-2">
            <img src={props.imageUrl} alt="Message" className="w-full h-full object-cover rounded" />
          </div>
        </>

      )}
      <p id={`scroll-element-${props.id}`} className={`overflow-y-auto max-w-full ${props.imageUrl ? 'max-h-40 mt-4' : 'max-h-120'} text-base break-words ${isArabic ? 'text-right' : 'text-left'}`}>
        {props.message}
      </p>
      <p className="text-base font-bold text-left">
        {props.sender}
      </p>
      <div className={`flex items-center justify-${downloading ? 'between' : 'end'}`} >
        {downloading && <p className="sm:text-xs  md:text-sm text-gray-500">Preparing for download...</p>}
        <div className="flex items-center justify-end space-x-2">
          <FontAwesomeIcon id={`hide-element-${props.id}`} className="text-primary cursor-pointer"
            icon={faDownload}
            size='lg'
            onClick={async () => {
              setDownloading(true)
              await downloadMemory(props.id)
              setDownloading(false)
            }} />
          <p className="text-sm text-gray-500">{props.date}</p>
          <img src='https://firebasestorage.googleapis.com/v0/b/seniors-24.appspot.com/o/assets%2Fsignature.png?alt=media&token=a98222d8-7170-4ada-9e12-9839b14256e5' alt="signature" className="h-10" />
        </div>
      </div>

    </li>
  );
};

export default Card;

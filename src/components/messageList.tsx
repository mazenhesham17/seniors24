'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext';
import { db } from '@/lib/firebase/clientApp';
import { ref, onValue, off } from 'firebase/database';
import Card from './card';

interface Message {
  sender: string;
  message: string;
  imageUrl: string;
  date: string;
}

export const MessageList = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!user) return;

    const messagesRef = ref(db, `messages/${user.uid}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const messages = Object.keys(data).map((key) => {
        const utcDate = new Date(data[key].timestamp);
        const clientDate = new Date(utcDate.toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

        return {
          sender: data[key].sender,
          message: data[key].message,
          imageUrl: data[key].imageUrl,
          date: clientDate.toDateString(),
        };
      });
      messages.reverse();
      setMessages(messages);
    });

    return () => {
      off(messagesRef);
    };
  }, [user]);


  return (
    <div className="h-list flex flex-col items-center ">
      <h2 className="text-2xl text-white font-bold m-4">Memories</h2>
      <div className="overflow-y-auto">
        <ul className="space-y-4 mx-4">
          {messages.length === 0 ? (
            <li className="text-gray-500">No memories to display</li>
          ) : (
            messages.map((msg, index) => (
              <Card key={index} id={index} sender={msg.sender} message={msg.message} imageUrl={msg.imageUrl} date={msg.date} />
            ))
          )}
        </ul>
      </div>
    </div>

  )
}

export default MessageList;
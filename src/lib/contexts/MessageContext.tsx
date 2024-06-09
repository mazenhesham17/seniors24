'use client'
import React, { createContext, useContext, useRef } from 'react'
import { Toast } from 'primereact/toast'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

interface MessageContextType {
  showSuccessMessage: (message: string) => void
  showErrorMessage: (message: string) => void
}

export const MessageContext = createContext<MessageContextType | null>(null);

interface MessageProviderProps {
  children: React.ReactNode;
}

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const toastRef = useRef<Toast | null>(null);

  const showErrorMessage = (message: string) => {
    if (toastRef.current) {
      (toastRef.current as any).show({ severity: 'error', summary: 'Error', detail: message });
    }
  };

  const showSuccessMessage = (message: string) => {
    if (toastRef.current) {
      (toastRef.current as any).show({ severity: 'success', summary: 'Success', detail: message });
    }
  };

  const messageContextValue: MessageContextType = {
    showErrorMessage,
    showSuccessMessage
  };

  return (
    <MessageContext.Provider value={messageContextValue}>
      <Toast ref={toastRef} />
      {children}
    </MessageContext.Provider>
  );
};


export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error('useMessage must be used within an ErrorProvider');
  }

  return context;
}
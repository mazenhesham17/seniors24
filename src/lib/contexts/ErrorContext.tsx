'use client'
import React, { createContext, useContext, useRef } from 'react'
import { Toast } from 'primereact/toast'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

type ShowErrorMessage = (message: string) => void;

export const ErrorContext = createContext<ShowErrorMessage | null>(null);

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const toastRef = useRef<Toast | null>(null);

  const showErrorMessage: ShowErrorMessage = (message) => {
    if (toastRef.current) {
      (toastRef.current as any).show({ severity: 'error', summary: 'Error', detail: message });
    }
  };

  return (
    <ErrorContext.Provider value={showErrorMessage}>
      <Toast ref={toastRef} />
      {children}
    </ErrorContext.Provider>
  );
};


export const useError = () => {
  const showErrorMessage = useContext(ErrorContext);

  if (!showErrorMessage) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return showErrorMessage;
}
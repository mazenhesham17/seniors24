'use client'
import React, { createContext, useContext, useState, useEffect, use } from 'react';
import { auth, db } from '../firebase/clientApp';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useMessage } from './MessageContext';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setLoading] = useState<boolean>(true); // [1
  const [user, setUser] = useState<User | null>(null);
  const { showErrorMessage } = useMessage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoading(false);
      showErrorMessage(`Failed to sign in: ${error.message}`);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = ref(db, `users/${user.uid}`);
      set(userRef, {
        name: user.email?.split('@')[0],
      });

    } catch (error: any) {
      setLoading(false);
      showErrorMessage(`Failed to sign up: ${error.message}`);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await auth.signOut();
    } catch (error: any) {
      setLoading(false);
      showErrorMessage(`Failed to sign out: ${error.message}`);
    }
  };

  const authContextValue: AuthContextType = {
    isLoading,
    user,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
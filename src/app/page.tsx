'use client'
import React, { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Home() {
  const router = useRouter();
  const { isLoading, user, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user]);


  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut();
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      {user && <a href="#" onClick={handleSignOut}>
        Log Out
      </a>}
      <h1>Email: {user?.email}</h1>
    </div>
  )
}

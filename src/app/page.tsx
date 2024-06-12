'use client'
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";
import TopBar from "@/components/topBar";
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <div className="h-full flex items-center justify-center">
        <div className="bg-white p-8 m-4 rounded-lg shadow-lg max-w-md w-full">
          <p className="tangerine-regular text-gray-500">
            If you are here, you must be important to me. We made fantastic memories together. I really appreciate your presence in my life.
          </p>
          <Link href="/addition" className="w-full inline-flex justify-center my-4 py-2 px-4 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
            <button >
              Add Memory
            </button>
          </Link>
          <Link href="/messages" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <button >
              See Memories
            </button>
          </Link>


        </div>
      </div>
    </>
  )
}

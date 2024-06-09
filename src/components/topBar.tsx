import React from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import Link from 'next/link';

export const TopBar = () => {
    const { signOut } = useAuth();

    const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signOut();
    };

    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
            <h1 className="text-xl" >Seniors 24</h1>
            <Link href="/login">
                <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700  text-white py-2 px-4 rounded">
                    Log Out
                </button>
            </Link>
        </div>
    )
}

export default TopBar;
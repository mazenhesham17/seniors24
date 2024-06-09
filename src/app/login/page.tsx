'use client'
import React, { useEffect } from 'react'
import LoginForm from '@/components/loginForm'
import { ProgressSpinner } from "primereact/progressspinner"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Login() {
    const router = useRouter();
    const { isLoading, user } = useAuth();

    useEffect(() => {
        if (!isLoading && user) {
            router.replace("/");
        }
    }, [isLoading, user]);

    if (isLoading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ProgressSpinner />
            </div>
        );
    }
    return (
        <LoginForm />
    )
}

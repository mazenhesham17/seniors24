'use client'
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";
import TopBar from '@/components/topBar';
import AdditionForm from '@/components/additionForm';

export default function Addition() {
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
            <AdditionForm />
        </>

    )
}


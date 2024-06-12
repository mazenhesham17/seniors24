import type { Metadata } from "next";
import './globals.css';
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { MessageProvider } from "@/lib/contexts/MessageContext";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Seniors 24",
  description: "Seniors 24 is a website for memories of the class of 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />

      </Head>
      <body>
        <MessageProvider>
          <AuthProvider>
            <main className="h-screen flex flex-col" >
              {children}
            </main>
          </AuthProvider>
        </MessageProvider>
      </body>
    </html>
  );
}

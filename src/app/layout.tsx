import type { Metadata } from "next";
import './globals.css';
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { MessageProvider } from "@/lib/contexts/MessageContext";

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

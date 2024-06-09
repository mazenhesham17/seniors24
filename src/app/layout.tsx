import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ErrorProvider } from "@/lib/contexts/ErrorContext";

const inter = Inter({ subsets: ["latin"] });

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
        <ErrorProvider>
          <AuthProvider>
            <main>
              {children}
            </main>
          </AuthProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}

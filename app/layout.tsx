import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel Taslağı",
  description: "Sektör bağımsız yönetim paneli başlangıç projesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="bg-brand-dark">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

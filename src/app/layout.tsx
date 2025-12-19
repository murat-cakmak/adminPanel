import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin paneli yönetim arayüzü"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

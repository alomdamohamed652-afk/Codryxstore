import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CODRYX Store",
  description: "Manage, discover and activate CODRYX Discord bots.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
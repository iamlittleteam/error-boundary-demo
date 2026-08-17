import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Error Boundary Demo — Next.js",
  description: "Demo: UI error vs API error, Next.js error.tsx + manual class Error Boundary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-10">{children}</div>
      </body>
    </html>
  );
}

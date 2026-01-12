import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MX Dev Bridge | Solidity to MultiversX Rust",
  description: "Supercharged EVM to MultiversX Migration Environment with AI Audit and Scaffolding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexVest",
  description: "Invest in What's Next!",
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

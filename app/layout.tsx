import type { Metadata } from "next";
import "./globals.css";
import ChatCallBot from '@/components/ChatCallBot';
import DisclaimerModal from '@/components/DisclaimerModal';

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
        <ChatCallBot />
        <DisclaimerModal />
      </body>
    </html>
  );
}

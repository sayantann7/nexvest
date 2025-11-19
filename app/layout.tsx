import type { Metadata } from "next";
import "./globals.css";
import ChatCallBot from "@/components/ChatCallBot";
import DisclaimerModal from "@/components/DisclaimerModal";
import Footer from "../components/Footer";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-[#0D0C34] text-white antialiased">
        {children}
        <Footer />
        <ChatCallBot />
        <DisclaimerModal />
      </body>
    </html>
  );
}

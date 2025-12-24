import { Figtree, Inter } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tourvisto - AI Travel App",
  description:
    "An AI-powered travel application designed to help users plan their trips effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

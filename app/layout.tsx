import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Mina Bahir | Graphic Designer",
  description:
    "Mina Bahir - Graphic Designer, Brand Designer and Visual Artist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>{children}
        <Footer/>
      </body>
      
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Course Builder AI",
  description: "Build Courses in just minutes.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

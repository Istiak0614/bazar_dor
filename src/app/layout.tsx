import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — আজকের বাজারের দাম",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ এবং অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="bn">
      <body>
        <Providers />

        <div className="flex min-h-screen flex-col">
          <Suspense
            fallback={
              <>
                <Navbar />
                <div className="h-9 animate-pulse bg-white" />
              </>
            }
          >
            <Header />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
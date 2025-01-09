'use client'
import { Hind_Siliguri, Poppins } from "next/font/google";

import CheckingUser from "@/components/Admin/checkingUser";
import "./globals.css";
// Import Poppins for English content
const poppins = Poppins({
  subsets: ["latin"], // Correct subset for English (Latin script)
  weight: ["400", "700"], // Specify weights as needed
});

// Import Tiro Bangla for Bangla content
const tiroBangla = Hind_Siliguri({
  subsets: ["bengali"], // Correct subset for Bengali script
  weight: ["400"], // Specify weights as needed
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${tiroBangla.className} ${poppins.className}    antialiased bg-[#fff] text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}

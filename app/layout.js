import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes Exchange",
  description: "Online Marketplace for Study Notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <div className="max-w-3xl mx-auto p-4">
          {/* <Navbar /> */}
          <div className="mt-8">{children}</div>
          {/* {children} */}
        </div>
      </AuthProvider>
      </body>
    </html>
  );
}
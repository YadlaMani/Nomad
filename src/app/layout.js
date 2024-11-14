import Link from "next/link";
import "./globals.css";
import RetroGrid from "@/components/ui/retro-grid";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { IoLogoGithub } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Nomad",
  description:
    "Drop and retrieve text anywhere like a nomad without any login or account",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-transparent backdrop-blur-lg backdrop-opacity-100 transition-all duration-300 shadow-md">
          <div className="flex flex-cols items-center justify-between">
            <h1 className="font-extrabold text-gray-950 text-4xl">NOMAD</h1>

            <Link
              href="https://github.com/YadlaMani/Nomad"
              passHref
              target="_blank"
            >
              <RainbowButton>
                Star on GitHub{" "}
                <span className="p-2">
                  <IoLogoGithub />
                </span>
              </RainbowButton>
            </Link>
          </div>
        </nav>

        <main className="min-h-screen pt-16 w-full">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}

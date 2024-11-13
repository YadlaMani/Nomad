import localFont from "next/font/local";
import Link from "next/link"; // Import Link for navigation
import "./globals.css";

export const metadata = {
  title: "Nomad",
  description:
    "Drop and retrieve text anywhere like a nomad without any login or account",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-cover bg-center bg-no-repeat min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.alphacoders.com/787/787043.jpg')",
        }}
      >
        {/* Title on the top left corner */}
        <header className="absolute top-4 left-4">
          <Link href="/">
            <h1 className="text-black text-4xl font-bold cursor-pointer hover:text-gray-800 transition-all duration-200">
              NOMAD
            </h1>
          </Link>
        </header>

        {/* Children content */}
        {children}
      </body>
    </html>
  );
}

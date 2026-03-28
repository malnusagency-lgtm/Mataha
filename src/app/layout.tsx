import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Mataha Experience | This is not an event. This is an experience.",
  description: "This is not an event. This is an experience.",
  appleWebApp: {
    capable: true,
    title: "Mataha",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

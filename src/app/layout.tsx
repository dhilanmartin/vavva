import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vavva.xyz"),
  title: "Casa Vavva",
  description:
    "Casa Vavva is a private members club based in New York City. You must be 21 or under to enter.",
  openGraph: {
    title: "Casa Vavva",
    description:
      "A private members club based in New York City. You must be 21 or under to enter.",
    url: "https://vavva.xyz",
    siteName: "Casa Vavva",
    type: "website",
  },
  icons: {
    icon: [{ url: "/brand/sphere-512.png", type: "image/png" }],
    apple: [{ url: "/brand/sphere-512.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('intro-js');requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.classList.add('intro-go');});});}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

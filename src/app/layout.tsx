import type { Metadata, Viewport } from "next";
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
    "A private house in New York City. You must be 21 or under to enter.",
  openGraph: {
    title: "Casa Vavva",
    description:
      "A private house in New York City. You must be 21 or under to enter.",
    url: "https://vavva.xyz",
    siteName: "Casa Vavva",
    type: "website",
  },
  // Icons and the OG card come from src/app/{icon,apple-icon,opengraph-image}.png —
  // the file conventions win over anything declared here.
};

export const viewport: Viewport = {
  themeColor: "#E8E8E8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The intro script stamps `intro-js` / `intro-go` on <html> before hydration,
    // so the server markup can't match — that mismatch is the point, not a bug.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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

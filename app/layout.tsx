import type { Metadata } from "next";
import "@/public/cclf.css"
import "./globals.css";
import { InvestmentContextProvider } from "@/contexts/InvestmentContext";

export const metadata: Metadata = {
  title: "Freenary",
  description: "Investment manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <button className="burger" aria-label="Menu"></button>
          <h1>Freenary</h1>
          <button className="switchTheme" aria-label="Toggle theme"></button>
        </header>
        <nav></nav>
        <main>
        <InvestmentContextProvider>
          {children}
        </InvestmentContextProvider>
        </main>
        <script src="cclf.js"></script>
      </body>
    </html>
  );
}

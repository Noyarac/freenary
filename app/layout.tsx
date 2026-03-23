import type { Metadata } from "next";
import "./globals.css";
import { InvestmentContextProvider } from "@/contexts/InvestmentContext";
import Link from "next/link";
import { ToastContextProvider } from "@/contexts/ToastContext";

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
        <nav>
          <ul>
            <li><Link href="/">Dashboard</Link></li>
            <li><Link href="/save">Add an investment</Link></li>
          </ul>
        </nav>
        <main>
          <InvestmentContextProvider>
            <ToastContextProvider>
              {children}
            </ToastContextProvider>
          </InvestmentContextProvider>
        </main>
        <script src="https://noyarac.github.io/cclf/cclf.js"></script>
      </body>
    </html>
  );
}

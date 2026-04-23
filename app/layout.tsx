import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keploy Docs",
  description: "Keploy + Docker API testing documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const savedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
                document.documentElement.classList.toggle("dark", isDark);
              } catch {}
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

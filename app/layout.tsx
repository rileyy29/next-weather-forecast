import { classNames } from "@/shared/utils";
import { Figtree } from "next/font/google";
import "./globals.css";

const figTree = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: "Weather App",
  description: "A simple weather app converted into React from .NET"
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"} suppressHydrationWarning={true}>
      <head />
      <body className={classNames(figTree.className, "h-screen bg-main-background")}>
        {children}
      </body>
    </html>
  )
}

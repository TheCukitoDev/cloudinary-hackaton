import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from 'next/font/google'

import dynamic from 'next/dynamic'

import { type Metadata } from "next";

import { PHProvider } from "@/app/providers"; 

import { SpeedInsights } from "@vercel/speed-insights/next"

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})



const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <PHProvider>
    <html lang="en" className={`${GeistSans.variable} ${jetbrains.className}`}>
      <body>
        <PostHogPageView/>
        <SpeedInsights/>
        <header className="bg-transparent">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </header>
        <main>{children}</main>
        <footer>

        </footer>
      </body>
    </html>
    </PHProvider>
    </ClerkProvider>
  );
}

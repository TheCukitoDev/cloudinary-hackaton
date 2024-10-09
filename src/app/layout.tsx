import "@/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Spooky Higher or Lower - Spuky",
  description: "A Higher or Lower game with a spooky twist",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <header className="flex bg-slate-500 text-white ">
          <nav>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                Sign in
              </SignInButton>
            </SignedOut>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p className="bg-slate-900 text-white flex items-center justify-center">&copy; {new Date().getFullYear()} Spooky Higher or Lower</p>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}

import '@/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { JetBrains_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme/provider'
import { ModeToggle } from '@/components/theme/toggle'

import { NextUIProvider } from '@nextui-org/react'
import dynamic from 'next/dynamic'

import type { Metadata } from 'next'

import { PHProvider } from '@/app/providers'

import { SpeedInsights } from '@vercel/speed-insights/next'

import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	GoogleOneTap,
} from '@clerk/nextjs'
import { Skeleton } from '@nextui-org/react'

import { auth, currentUser } from '@clerk/nextjs/server'
import posthog from 'posthog-js'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Create T3 App',
	description: 'Generated by create-t3-app',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
})

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
	ssr: false,
})

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { userId } = auth()

	if (userId) {
		const user = await currentUser()
		posthog.identify(userId)
		posthog.people.set({
			$email: user?.primaryEmailAddress?.emailAddress,
			$name: user?.fullName,
		})
		posthog.capture('$pageview')
	}

	return (
		<ClerkProvider>
			<PHProvider>
				<html
					lang="en"
					className={`${GeistSans.variable} ${jetbrains.className}`}
					suppressHydrationWarning
				>
					<GoogleOneTap />
					<body>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<NextUIProvider>
								<PostHogPageView />
								<SpeedInsights />
								<header className="bg-transparent flex items-center justify-between">
									<SignedIn>
										<UserButton />
									</SignedIn>
									<SignedOut>
										<SignInButton />
									</SignedOut>
									<ModeToggle />
								</header>
								<main>{children}</main>
								<footer></footer>
							</NextUIProvider>
						</ThemeProvider>
					</body>
				</html>
			</PHProvider>
		</ClerkProvider>
	)
}

import '@/styles/globals.css'
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'
import { currentUser, auth } from '@clerk/nextjs/server'
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
	ssr: false,
})

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import posthog from 'posthog-js'

export const metadata: Metadata = {
	title: 'Spooky Higher or Lower - Spuky',
	description: 'A Higher or Lower game with a spooky twist',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { userId } = auth()

	if (userId) {
		const user = await currentUser()
		posthog.identify(userId, {
			email: user?.emailAddresses[0]?.emailAddress,
			userId: userId,
		})
		console.log('Identified user:', user?.id)
		posthog.people.set({ email: user?.emailAddresses[0]?.emailAddress })
	}

	return (
		<ClerkProvider>
			<PHProvider>
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
						<main>
							<PostHogPageView />
							{children}
						</main>
						<footer>
							<p className="bg-slate-900 text-white flex items-center justify-center">
								&copy; {new Date().getFullYear()} Spooky Higher
								or Lower
							</p>
						</footer>
					</body>
				</html>
			</PHProvider>
		</ClerkProvider>
	)
}

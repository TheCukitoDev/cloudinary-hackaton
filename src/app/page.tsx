import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

import Button from './button'

export default async function HomePage() {
	const user = await currentUser()

	return (
		<div>
			<h1>Home Page</h1>
			<Link href="/about">About</Link>
			<Button
				userId={user?.id ?? ''}
				userName={user?.fullName ?? ''}
				key={user?.id}
			/>
		</div>
	)
}

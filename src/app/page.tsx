'use client'
import Link from 'next/link'
import { Button } from '@nextui-org/button'

export default function HomePage() {
	return (
		<div>
			<h1>Home</h1>
			<Link href="https://amazon.es">Amazon</Link>
			<Button color="primary" radius="md">
				Click on me...
			</Button>
		</div>
	)
}

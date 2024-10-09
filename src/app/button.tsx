'use client'

import posthog from 'posthog-js'

export default function Button({
	userId,
	userName,
}: { userId: string; userName: string }) {
	return (
		<button
			onClick={() => {
				posthog.identify(userId, {
					name: userName,
				})
				posthog.capture('button_clicked', { name: userName })
			}}
		>
			{userName}
		</button>
	)
}

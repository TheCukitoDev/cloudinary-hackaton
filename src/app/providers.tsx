// app/providers.tsx
'use client'
import { env } from '@/env'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({
	children,
}: {
	children: React.ReactNode
}) {
	useEffect(() => {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
			api_host: '/ingest',
			ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
			person_profiles: 'identified_only',
			capture_pageview: false, // Disable automatic pageview capture, as we capture manually
			capture_pageleave: true,
			capture_heatmaps: true,
			capture_performance: true,
		})
	}, [])

	return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

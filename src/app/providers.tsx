// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { env } from '@/env'

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
    useEffect(() => {
      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true
      })
  }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
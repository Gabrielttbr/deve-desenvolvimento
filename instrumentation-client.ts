import posthog from 'posthog-js'

const token = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '';

if (!token) {
    throw new Error("Please add your PostHog key to .env.local");
}

posthog.init(token, {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-05-24'
});
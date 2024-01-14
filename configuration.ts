const configuration = {
    customer_api: { url: process.env.NEXT_PUBLIC_CUSTOMER_API },
    facebook: {
        app_id: process.env.NEXT_PUBLIC_FB_APP_ID,
        config_id: {
            business_management: 1704011510087091,
            full_access: 1420036632222158,
        },
    },
    site: {
        name: 'Lipy AI - Chat assistant for businesses to automate customer service.',
        description:
            'Lipy.ai is here to automate your customer conversations, providing personalized responses for customer inquires, order taking, and efficient appointment bookings. Enhance your customer satisfaction rate and drive business growth.',
        themeColor: '#00BB78',
        siteUrl: process.env.NEXT_PUBLIC_WEB_URL,
        siteName: 'Lipy AI Chat Assistant.',
        twitterHandle: '@LipyAi_',
        language: 'en',
    },
    socialLinks: {
        youtube: 'https://www.youtube.com/channel/UCg42GtJQbatJQo1piNUEcGw',
        instagram: 'https://www.instagram.com/lipy.ai/',
        facbook: 'https://www.facebook.com/people/Lipy-AI/61553677252793/',
        twitter: 'https://twitter.com/LipyAi_',
        linkedin: 'https://www.linkedin.com/company/lipy-ai/',
    },
    support: {
        email: 'team@lipy.ai',
    },

    production: process.env.NODE_ENV === 'production',
}

export default configuration

export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@nuxtjs/i18n',
        '@pinia/nuxt',
    ],

    sourcemap: true,

    routeRules: {
        '*': {
            prerender: false,
            swr: 300,
        },
    },

    nitro: {
        preset: 'node-server',
        prerender: {
            crawlLinks: true,
            failOnError: false,
        },
    },

    runtimeConfig: {
        public: {
            API_BASE: process.env.API_BASE,
        }
    },

    i18n: {
        vueI18n: './i18n.config.ts',
        // baseUrl: 'https://my-nuxt-app.com',
        detectBrowserLanguage: {
            useCookie: true,
            fallbackLocale: 'uk',
            cookieKey: 'i18n_redirected',
            alwaysRedirect: true,
        },
        locales: [
            {
                code: 'uk',
                language: 'uk',
                name: 'Українська',
            },
            {
                code: 'ru',
                language: 'ru',
                name: 'Русский',
            },
            // {
            //     code: 'en',
            //     language: 'en',
            //     name: 'English',
            // },
        ],
        defaultLocale: 'uk',
        strategy: 'prefix_except_default',
    },

    compatibilityDate: '2024-08-17',

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // or "modern"
                }
            },
        },
    },

    experimental: {
        appManifest: true,
    }
});

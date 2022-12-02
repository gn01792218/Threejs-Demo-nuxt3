import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    target:'static',
    router: {
        base: '/gn01792218.github.io/Threejs-Demo-nuxt3/'
    },
    css: ["~/assets/css/style.css"],
    build:{
        postcss:{
            postcssOptions:{
                plugins:{
                    tailwindcss:{},
                    autoprefixer : {}
                }
            }
        }
    },
});

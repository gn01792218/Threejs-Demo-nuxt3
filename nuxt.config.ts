// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
    target:'static',
    router: {
        base: '/Threejs-Demo-nuxt3/'
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
};

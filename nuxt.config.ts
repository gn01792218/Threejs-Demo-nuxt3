// https://v3.nuxtjs.org/api/configuration/nuxt.config
const routerBase = 
    process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
            base: '/Threejs-Demo-nuxt3/'
        }
    }
    : {}
export default {
    ...routerBase,
    target:'static',
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

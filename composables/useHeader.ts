import { Nav } from '@/types/gloable'

export default function useHeader() {

  const navList = ref<Nav[]>([
    {
        title:"Home",
        routeName:"/",
        show:true,
    },
    {
        title:"Solar System",
        routeName:'/SolarSystem',
        show:true,
    },
  ])

  return {
    //data
    navList,
    //methods
  };
}
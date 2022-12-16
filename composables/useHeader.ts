import { Nav } from '@/types/gloable'

export default function useHeader() {

  const navList = ref<Nav[]>([
    {
        title:"首頁",
        routeName:"/",
        show:true,
    },
    {
        title:"太陽系",
        routeName:'/SolarSystem',
        show:true,
    },
    {
      title:"模型動畫",
      routeName:'/ModelAnimate',
      show:true
    }
  ])

  return {
    //data
    navList,
    //methods
  };
}
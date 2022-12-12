import useInitTHREE from './useInitTHREE'
/**
 * Three.js 相關集合入口
 */
export default function useTHREE() {
    const { init3DWorld } = useInitTHREE()
    return {
        //methods
        init3DWorld,
    }
}
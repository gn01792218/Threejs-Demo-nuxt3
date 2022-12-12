import useInitTHREE from './useInitTHREE'
import useGLTFLoader from './useGLTFLoader'
/**
 * Three.js 相關集合入口
 */
export default function useTHREE() {
    const { init3DWorld } = useInitTHREE()
    const { loadGLTFModel } = useGLTFLoader()
    return {
        //methods
        init3DWorld,
        loadGLTFModel,
    }
}
import useInitTHREE from './useInitTHREE'
import useGLTFLoader from './useGLTFLoader'
import useHelper from './useHelper'
import useGUI from './useGUI'
/**
 * Three.js 相關集合入口
 */
export default function useTHREE() {
    const { init3DWorld } = useInitTHREE()
    const { addGUI } = useGUI()
    const { loadGLTFModel } = useGLTFLoader()
    const {
        addAxesHepler,
        addGridHelper,
        addOrbitControls
    } = useHelper()
    return {
        //methods
        init3DWorld,
        loadGLTFModel,
        addGUI,

        //輔助工具
        addAxesHepler,
        addGridHelper,
        addOrbitControls,
    }
}
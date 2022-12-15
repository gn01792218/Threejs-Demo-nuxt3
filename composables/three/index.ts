import useInitTHREE from "./useInitTHREE";
import useGLTFLoader from "./useGLTFLoader";
import useTextureLoader from "./useTextureLoader";
import useLight from "./useLight";
import useHelper from "./useHelper";
import useGUI from "./useGUI";
/**
 * Three.js 相關集合入口
 */
export default function useTHREE() {
  const { init3DWorld } = useInitTHREE();
  const { getGUI, removeGUI } = useGUI();
  const { loadGLTFModel } = useGLTFLoader(); 
  const { textureLoader, getSphereGeometryWithTexture, getBoxGeometryWithTexture, getRingGeometryWithTexture, setWorld2DBackground } = useTextureLoader();
  const { addAmbientLight, addPointLight, addDirectionLight, addSpotLight } = useLight();
  const { addAxesHepler, addGridHelper, addOrbitControls } = useHelper();

  return {
    //methods
    init3DWorld,
    loadGLTFModel,
    getGUI,
    removeGUI,

    //輔助工具
    addAxesHepler,
    addGridHelper,
    addOrbitControls,

    //textureLoader
    textureLoader,
    getSphereGeometryWithTexture,
    getBoxGeometryWithTexture,
    getRingGeometryWithTexture,
    setWorld2DBackground,

    //光源
    addAmbientLight,
    addPointLight,
    addDirectionLight,
    addSpotLight,
  };
}

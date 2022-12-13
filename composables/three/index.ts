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
  const { addGUI } = useGUI();
  const { loadGLTFModel } = useGLTFLoader(); 
  const { textureLoader, getBoxGeometryWithTexture, setWorld2DBackground } = useTextureLoader();
  const { addAmbientLight, addDirectionLight, addSpotLight } = useLight();
  const { addAxesHepler, addGridHelper, addOrbitControls } = useHelper();

  return {
    //methods
    init3DWorld,
    loadGLTFModel,
    addGUI,

    //輔助工具
    addAxesHepler,
    addGridHelper,
    addOrbitControls,

    //textureLoader
    textureLoader,
    getBoxGeometryWithTexture,
    setWorld2DBackground,

    //光源
    addAmbientLight,
    addDirectionLight,
    addSpotLight,
  };
}

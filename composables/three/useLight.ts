import * as THREE from "three";
/**
 * 光源 集合
 * 建構各種光源
 */
export default function useLight() {
  //光源
  /**
   * 添加環境光到場景
   * @param sceneObj 必填
   * @param color 選填
   * @returns 
   */
  function addAmbientLight(sceneObj: THREE.Scene, color:number = 0x333333 ) {
    const ambientLight = new THREE.AmbientLight(color);
    sceneObj.add(ambientLight);
    return ambientLight;
  }
  /**
   * 添加直線光到場景
   * @param sceneObj 必填
   * @param color 選填
   * @param castShadow 選填，是否產生陰影
   * @returns 
   */
  function addDirectionLight(sceneObj: THREE.Scene, color:number = 0xffffff, castShadow:boolean = true) {
    const dirLight = new THREE.DirectionalLight(color, 5);
    sceneObj.add(dirLight);
    dirLight.position.set(-10, 10, 0);

    //製造光影
    dirLight.castShadow = castShadow

    return dirLight;
  }
  /**
   * 添加SpotLight
   * @param sceneObj 必填
   * @param color 選填
   * @param castShadow 選填
   * @returns 
   */
  function addSpotLight(sceneObj: THREE.Scene, color:number = 0xffffff, castShadow:boolean = true) {
    const spotLight = new THREE.SpotLight(color);
    sceneObj.add(spotLight);
    spotLight.position.set(-5, 5, 0);

    //製造光影
    spotLight.castShadow = castShadow

    //調整聚光燈發散角度
    spotLight.angle = 0.8;

    //輔助工具

    return spotLight;
  }

  return {
    //methods
    addAmbientLight,
    addDirectionLight,
    addSpotLight,
  };
}

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
  
  function addPointLight(sceneObj:THREE.Scene, color:number = 0xffffff, intensity:number = 10, distance:number = 10){
    const pointLight = new THREE.PointLight(color, intensity, distance)
    sceneObj.add(pointLight)
  }

  /**
   * 添加直射光到場景
   * @param sceneObj 必填
   * @param color 選填
   * @param castShadow 選填，是否產生陰影
   * @returns 
   */
  function addDirectionLight(sceneObj: THREE.Scene, color:number = 0xffffff, castShadow:boolean = true) {
    const dirLight = new THREE.DirectionalLight(color, 5);
    sceneObj.add(dirLight);

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
    
    //製造光影
    spotLight.castShadow = castShadow
    return spotLight;
  }

  return {
    //methods
    addAmbientLight,
    addPointLight,
    addDirectionLight,
    addSpotLight,
  };
}

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default function useHelper() {
    //輔助工具
    /**
     * 建立輔助軸線工具
     * @param sceneObj 必填
     * @param axesLength 選填
     */
    function addAxesHepler(sceneObj: THREE.Scene, axesLength: number = 5) {
        sceneObj.add(new THREE.AxesHelper(axesLength))
    }
    /**
     * 建立網格輔助工具
     * @param sceneObj 必填 
     */
    function addGridHelper(sceneObj: THREE.Scene, size:number = 10, divisions:number = 10) {
        //建構子選填參數(size?: number, divisions?: number, color1?: THREE.ColorRepresentation, color2?: THREE.ColorRepresentation)
        //網格預設下產生100格，
        //size預設10，表示寬高為10(px)， 
        //divisions 預設10，表示把網格切分成10*10 = 100 格
        sceneObj.add(new THREE.GridHelper(size, divisions))
    }
    /**
     * 建立滑鼠導覽
     * @param cameraObj 
     * @param rendererObj 
     */
    function addOrbitControls(cameraObj: THREE.Camera, rendererObj: THREE.Renderer) {
        const orbit = new OrbitControls(cameraObj, rendererObj.domElement)
        orbit.update()
    }
    return {
        //methods
        addAxesHepler,
        addGridHelper,
        addOrbitControls,
    }
}
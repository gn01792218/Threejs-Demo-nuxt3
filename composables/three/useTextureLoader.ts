import * as THREE from 'three'
/**
 * 材質物件 集合
 * 建構各種貼材質的幾何物件中心
 */
export default function useTextureLoader() {
    const textureLoader = new THREE.TextureLoader()  //材質下載

    /**
     * 
     * @param textureUrlArray 需傳入6張材質圖檔，作為盒形六個面
     * @returns 返回一個THREE.Mesh<THREE.BoxGeometry>物件
     */
    function getBoxGeometryWithTexture (textureUrlArray:Array<string>) {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = []
        textureUrlArray.forEach(textureUrl=>{
            material.push(new THREE.MeshBasicMaterial({ map: textureLoader.load(textureUrl) }))
        })
        const cube = new THREE.Mesh(geometry, material)
        return cube
    }

    //設置world
    function setWorld2DBackground(sceneObj: THREE.Scene, bg:string) {
        sceneObj.background = textureLoader.load(bg)
    }
    return {
        //data
        textureLoader,
        //methods
        getBoxGeometryWithTexture,
        setWorld2DBackground,
    }
}
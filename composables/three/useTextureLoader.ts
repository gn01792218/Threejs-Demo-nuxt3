import * as THREE from 'three'
import { MaterialEnum, RingGeometryProperty, SphereGeometryProperty } from '@/types/three'
/**
 * 材質物件 集合
 * 建構各種貼材質的幾何物件中心
 */
export default function useTextureLoader() {
    const textureLoader = new THREE.TextureLoader()  //材質下載

    /**
     * 盒形幾何體(6面材質張貼)
     * @param textureUrlArray 需傳入6張材質圖檔，作為盒形六個面
     * @returns 盒形幾何體(6面材質張貼)
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
    
    /**
     * 球體帶材質
     * @param textureImgUrl 必填
     * @param property 選填，控制球體大小、切線數量。型態如interface SphereGeometryProperty
     * @returns 球體帶材質
     */
    
    function getSphereGeometryWithTexture(
        materialType:MaterialEnum,
        textureImgUrl:string,
        property:SphereGeometryProperty = {
            radius:10,
            widthSegments:10,
            heightSegments:10
        }
    ){
        const { radius, widthSegments, heightSegments } = property
        const geomatry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
        let material 
        switch(materialType){
            case MaterialEnum.MeshBasicMaterial :
                material = new THREE.MeshBasicMaterial({ map:textureLoader.load(textureImgUrl) })
                break
                case MaterialEnum.MeshStandardMaterial : 
                material = new THREE.MeshStandardMaterial({ map:textureLoader.load(textureImgUrl) })
                break
        }
        const mesh = new THREE.Mesh(geomatry, material)
        return mesh
    }

    /**
     * 帶狀物體帶材質
     * @param textureImgUrl 必填
     * @param property 選填，控制環形內外圈大小、內外圈切數。型態如interface RingGeometryProperty
     * @returns 帶狀物體帶材質
     */
    function getRingGeometryWithTexture (
        materialType:MaterialEnum,
        textureImgUrl:string,
        property:RingGeometryProperty = {
            innerRadius:10,
            outerRadius:20,
            theatSegments:20,
            phiSegments:1
        }) {
        const { innerRadius, outerRadius, theatSegments, phiSegments } = property
        const geomatry = new THREE.RingGeometry(innerRadius, outerRadius, theatSegments, phiSegments)
        let material 
        switch(materialType){
            case MaterialEnum.MeshBasicMaterial :
                material = new THREE.MeshBasicMaterial({ map:textureLoader.load(textureImgUrl), side:THREE.DoubleSide })
                break
            case MaterialEnum.MeshStandardMaterial : 
                material = new THREE.MeshStandardMaterial({ map:textureLoader.load(textureImgUrl), side:THREE.DoubleSide })
                break
        }
        const mesh = new THREE.Mesh(geomatry, material)
        return mesh
    }
    //設置world
    function setWorld2DBackground(sceneObj: THREE.Scene, bg:string) {
        sceneObj.background = textureLoader.load(bg)
    }
    return {
        //data
        textureLoader,
        //methods
        getSphereGeometryWithTexture,
        getBoxGeometryWithTexture,
        getRingGeometryWithTexture,
        setWorld2DBackground,
    }
}
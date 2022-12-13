<template>
    <div id="solar" class="">
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import useUtil from '~~/composables/util'
import useTHREE from '~~/composables/three'

//composables
const {
    getImagesAssetsFileURL,
    responsiveThreeCanvas
} = useUtil()

const {
    init3DWorld,  //init3DWorld()創建三要素 : scene、camera、renderer
    addAxesHepler,
    addGridHelper,
    addOrbitControls,
    textureLoader,
    getBoxGeometryWithTexture,
} = useTHREE()
//太陽系物件
// let sun  = getSphereGeometryWithTexture({
//     radius:16,
//     widthSegments:30,
//     heightSegments:30
// },getImagesAssetsFileURL('sun.jpg'))
// let mercury = getSphereGeometryWithTexture({
//     radius:3.2,
//     widthSegments:30,
//     heightSegments:30
// },getImagesAssetsFileURL('space.jpg'))
onMounted(() => {
    const [scene, camera, renderer] = init3DWorld('solar')
    //設置世界背景
    setWorldCubeBackground(scene)

    //3.建立輔助工具
    addAxesHepler(scene,200)
    addGridHelper(scene, 200, 10)
    //orbit control
    addOrbitControls(camera, renderer)
    //添加太陽系物件
    // addSolar(scene)

    //5.設置相機位置退後一點
    camera.position.set(-90, 140, 140)

    //6.渲染場景
    //預設下每秒會畫60次
    renderer.setAnimationLoop((time) => {
        animate(scene, camera, renderer, time)
    })
    //8.註冊響應式
    responsiveThreeCanvas(camera, renderer)
})
function animate(sceneObj: THREE.Scene, cameraObj: THREE.PerspectiveCamera, rendererObj: THREE.WebGLRenderer, time: number) {
    //sun 動畫
    // sun.rotateY(0.004)
    //渲染
    rendererObj.render(sceneObj, cameraObj);
}
//太陽系物件
interface SphereGeometryProperty{
    radius:number,
    widthSegments:number,
    heightSegments:number
}
function getSphereGeometryWithTexture(
    property:SphereGeometryProperty = {
        radius:10,
        widthSegments:10,
        heightSegments:10
    },
    textureImgUrl:string
){
    const { radius, widthSegments, heightSegments } = property
    const geomatry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    const material = new THREE.MeshBasicMaterial({
        map:textureLoader.load(textureImgUrl)
    })
    const mesh = new THREE.Mesh(geomatry, material)
    return mesh
}
function addSolar(sceneObj:THREE.Scene){
    // sceneObj.add(sun)
    // sceneObj.add(mercury)
}

//設置場景背景圖
//以cubeTexture設置六個面的背景圖
function setWorldCubeBackground(sceneObj: THREE.Scene) {
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    let spaceImg = getImagesAssetsFileURL('space.jpg')
    sceneObj.background = cubeTextureLoader.load([
        spaceImg, //左面
        spaceImg, //右面
        spaceImg,
        spaceImg,
        spaceImg,
        spaceImg,
    ])
    console.log(sceneObj.background)
}
//貼材質的幾何體，需要在onMounted時再載入唷(因為loader的關係?!)

function addSpaceTextureCube(sceneObj: THREE.Scene) {
    const cube = getBoxGeometryWithTexture([
        getImagesAssetsFileURL('galaxy.jpg'),
        getImagesAssetsFileURL('sun.jpg'),
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
    ])
    cube.name = 'cube2'
    sceneObj.add(cube)
    cube.position.set(0, 3, 0)
}
</script>
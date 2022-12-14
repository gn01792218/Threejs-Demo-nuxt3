<template>
    <div ref="solar" class="">
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import useUtil from '../composables/util'
import useTHREE from '~~/composables/three'

//composables
const {
    getImagesAssetsFileURL,
    responsiveThreeCanvas
} = useUtil()

const {
    MaterialEnum,
    init3DWorld,  //init3DWorld()創建三要素 : scene、camera、renderer
    addAxesHepler,
    addGridHelper,
    addOrbitControls,
    addPointLight,
    getBoxGeometryWithTexture,
    getSphereGeometryWithTexture,
} = useTHREE()

const solar = ref<HTMLElement | null>(null)
//太陽系物件
let sun, mercury 
//九大行星的基準物件
const mercuryParent = new THREE.Object3D()
onMounted(() => {
    const [scene, camera, renderer] = init3DWorld(solar.value)
    //設置世界背景
    setWorldCubeBackground(scene)

    //3.建立輔助工具
    addAxesHepler(scene,200)
    addGridHelper(scene, 200, 10)

    //orbit control
    addOrbitControls(camera, renderer)
    //添加太陽系物件
    sun = getSphereGeometryWithTexture(
        MaterialEnum.MeshBasicMaterial,
        getImagesAssetsFileURL('sunmap.jpg'),
        {
            radius:16,
            widthSegments:30,
            heightSegments:30
        })
    mercury = getSphereGeometryWithTexture(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('mercurymap.jpg'),
        {
                radius:3.2,
                widthSegments:30,
                heightSegments:30
            })
    
    //場控
    addSolarControler(scene)

    //光源
    const sunLight = addPointLight(scene,0xFFFFFF, 2 , 300)

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
    //自轉 動畫
    sun.rotateY(0.004)
    mercuryParent.rotateY(0.04)
    mercury.rotateY(0.004)
    //渲染
    rendererObj.render(sceneObj, cameraObj);
}
//太陽系場控
function addSolarControler(sceneObj:THREE.Scene){
    sceneObj.add(sun)
    //九大行星
    //水星
    sceneObj.add(mercuryParent) 
    mercuryParent.add(mercury)
    mercury.position.set(30,0,0)
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
<template>
    <div ref="modelAnimate" class="">
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
    init3DWorld,  //init3DWorld()創建三要素 : scene、camera、renderer
    addAxesHepler,
    addGridHelper,
    addOrbitControls,
    addPointLight,
    getBoxGeometryWithTexture,
    getRingGeometryWithTexture,
    getSphereGeometryWithTexture,
} = useTHREE()

const modelAnimate = ref<HTMLElement | null>(null)  //3D canvas

onMounted(() => {
    const [scene, camera, renderer] = init3DWorld(modelAnimate.value)

    //設置世界背景
    setWorldCubeBackground(scene)

    //3.建立輔助工具
    addAxesHepler(scene, 200)
    addGridHelper(scene, 200, 10)

    //orbit control
    addOrbitControls(camera, renderer)

    //光源
    const sunLight = addPointLight(scene, 0xFFFFFF, 2, 300)

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
    //渲染
    rendererObj.render(sceneObj, cameraObj);
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
</script>
<template>
    <div id="three" class="">
        太陽系
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import useUtil from '~~/composables/util'
import useTHREE from '~~/composables/three'
import { GUI } from 'dat.gui';

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
    getBoxGeometryWithTexture,
} = useTHREE()

onMounted(() => {
    const [scene, camera, renderer] = init3DWorld('three')
    //設置世界背景
    setWorld2DBackground(scene)
    // setWorldCubeBackground(scene)
    //1.調整renderer設定
    renderer.setSize(window.innerWidth, window.innerHeight);
    //2.把Renderer掛到DOM中，會是一個canvas
    document.getElementById('three').appendChild(renderer.domElement);

    //3.建立輔助工具
    addAxesHepler(scene)
    addGridHelper(scene)
    //orbit control
    addOrbitControls(camera, renderer)
    //貼材質的盒形物件
    addSpaceTextureCube(scene)

    //5.設置相機位置退後一點
    camera.position.set(1, 1, 5)

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
    sceneObj.background = cubeTextureLoader.load([
        getImagesAssetsFileURL('galaxy.jpg'), //左面
        getImagesAssetsFileURL('sun.jpg'), //右面
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
        getImagesAssetsFileURL('space.jpg'),
    ])
}
function setWorld2DBackground(sceneObj: THREE.Scene) {
    const texture = new THREE.TextureLoader()
    sceneObj.background = texture.load(getImagesAssetsFileURL('space.jpg'))
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
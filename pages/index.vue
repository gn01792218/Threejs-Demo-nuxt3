<template>
    <div ref="three" class="">
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
    loadGLTFModel,
    getGUI,
    removeGUI,
    addAxesHepler,
    addGridHelper,
    addOrbitControls,
    addAmbientLight,
    addDirectionLight,
    addSpotLight,
    getBoxGeometryWithTexture,
    setWorld2DBackground,
} = useTHREE()
const three = ref<HTMLElement | null>(null)
// 2、加入幾何物件
//建立方形物件的二元素 材質、幾何體、網格
// BoxGeometry - 盒型幾何物件 ， 盒型物件包含了頂點、面
// MeshBasicMaterial - 材質物件 (可上色)
// Mesh - 網格，接受 幾何體 與 材質 物件
/*
* Material 物件 : Three.js中共有多種材質物件，現在專注於 MeshBasicMaterial
* 所有材質物件都接受一個 object 可以設置各種屬性，來應用到材質物件上
* 注意 : MeshBasicMaterial 不受光源影響 
*/
//盒形物件 ( BasicMaterial 不受光源影響 )
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//平面物件 ( StandardMaterial )
const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true
plane.name = 'plane'

//平面2
const plane2Geometry = new THREE.PlaneGeometry(5, 5, 5, 2)
const plane2Material = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    wireframe: true,
})
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material)
plane2.position.set(0, 5, 0)

//球形物件 ( StandardMaterial )
const sphereGeometry = new THREE.SphereGeometry(2)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-2, 1.5, -2)
sphere.castShadow = true
const sphereId = sphere.id

//互動效果
//創建滑鼠的兩個端點
const mousePosition = new THREE.Vector2()
const rayCaster = new THREE.Raycaster()
//GUI配置選項
//要開啟的GUI選項
interface GUIOptions {
    sphereColor: string,
    wireframe: boolean,
    speed: number,
    angle: number,
    penumbra: number,
    intensity: number,
}
const options: GUIOptions = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,  //柔光效果
    intensity: 1,
}
let gui:GUI
onMounted(async () => {
    const [scene, camera, renderer] = init3DWorld(three.value)
    //設置世界背景
    setWorld2DBackground(scene,getImagesAssetsFileURL('space.jpg'))
    // setWorldCubeBackground(scene)
    //打開陰影
    enableShadowMap(renderer)
    //3.建立輔助工具
    addAxesHepler(scene)
    addGridHelper(scene)
    //orbit control
    addOrbitControls(camera, renderer)
    //GUI工具
    gui =await getGUI()
    addGuiItem(gui, options)
    //4.加入幾何體
    scene.add(cube)
    scene.add(plane)
    scene.add(plane2)
    scene.add(sphere)
    //貼材質的盒形物件
    addSpaceTextureCube(scene)
    //載入外部模型
    loadGLTFModel('monkey.glb', scene, { x: 1, y: 3, z: 1 })
    loadGLTFModel('toyTrain.gltf', scene, { x: 1, y: 1, z: 1 })
    //5.設置相機位置退後一點
    camera.position.set(1, 1, 5)

    //6.渲染場景
    //預設下每秒會畫60次
    renderer.setAnimationLoop((time) => {
        animate(scene, camera, renderer, time)
    })
    //7.添加光源
    const ambientLight = addAmbientLight(scene)
    const spotLight = addSpotLight(scene)
    const spotLightHelper = addSpotLightHelper(scene, spotLight)
    spotLight.position.set(-5, 5, 0)
    spotLight.angle = 0.8     //調整聚光燈發散角度
    // const directionLight = addDirectionLight(scene)
    // const directionLightHelper = addDirectionLightHelper(scene,directionLight)
    // const directionLightShadowHelper =  addDirectionLightShadowHelper(scene, directionLight)
    // directionLight.position.set(-10, 10, 0);

    //8.場景霧化效果
    // scene.fog = new THREE.Fog(0xFFFFFF,5,100)
    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)
    //9.註冊使用者互動事件
    //獲取滑鼠移動座標
    window.addEventListener('mousemove', e => {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
        mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1
    })
    //8.註冊響應式
    responsiveThreeCanvas(camera, renderer)
})
onUnmounted(()=>{
    //釋放gui
    removeGUI(gui)
})
function animate(sceneObj: THREE.Scene, cameraObj: THREE.PerspectiveCamera, rendererObj: THREE.WebGLRenderer, time: number) {
    //操作cube的動畫
    cube.rotation.x = time / 1000;
    cube.rotation.y = time / 1000;

    //操作頂點的動畫
    plane2.geometry.attributes.position.array[0] = -(time * Math.random()) / 1000
    plane2.geometry.attributes.position.needsUpdate = true

    //讓SpotLigh 透過GUI操作屬性
    // spotLight.angle = options.angle
    // spotLight.penumbra = options.penumbra
    // spotLight.intensity = options.intensity
    // spotLightHelper.update()

    //使用者互動 把滑鼠位置和相機設成射線之兩端點
    rayCaster.setFromCamera(mousePosition, cameraObj)
    //產生交互物件，獲得和使用者互動的資訊
    const intersects = rayCaster.intersectObjects(sceneObj.children)
    //更新時，核對使用者互動物件，和球體的id
    intersects.forEach(intersect => {
        if (intersect.object.id === sphereId) {
            intersect.object.material.color.set(0xff0000)
        }
        if (intersect.object.name === 'cube2') {
            intersect.object.rotation.y = time / 1000
            intersect.object.rotation.x = time / 1000
        }
    })
    //渲染
    rendererObj.render(sceneObj, cameraObj);
}

//GUI設定
function addGuiItem(gui: GUI, options: GUIOptions) {
    //為物件加入顏色color picker，以控制顏色變化
    gui
        .addColor(options, 'sphereColor')
        .onChange(e => {
            sphere.material.color.set(e)
        })

    //為物件加入是否顯示線框的checkbox
    gui
        .add(options, 'wireframe')
        .onChange(e => {
            sphere.material.wireframe = e
        })

    //加入全局的速度slider
    //最後面兩參數分別是最小值和最大值
    //使用時，只要options.speed就可以獲取速度值
    gui.add(options, 'speed', 0, 0.1)
    //控制角度
    gui.add(options, 'angle', 0, 1)
    //控制
    gui.add(options, 'penumbra', 0, 1)
    //控制亮度
    gui.add(options, 'intensity', 0, 1)
}

//光源Helper
function addDirectionLightHelper(sceneObj: THREE.Scene, directionLight: THREE.DirectionalLight) {
    const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
    sceneObj.add(directionLightHelper)
    return directionLightHelper
}
function addSpotLightHelper(sceneObj: THREE.Scene, spotLight: THREE.SpotLight) {
    const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    sceneObj.add(spotLightHelper)
    return spotLightHelper
}
//陰影
function enableShadowMap(renderer: THREE.WebGLRenderer) {
    renderer.shadowMap.enabled = true
}
//陰影Helper
function addDirectionLightShadowHelper(sceneObj: THREE.Scene, derictionLight: THREE.DirectionalLight) {
    const directionLightShadowHelper = new THREE.CameraHelper(derictionLight.shadow.camera)
    sceneObj.add(directionLightShadowHelper)
    return directionLightShadowHelper
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
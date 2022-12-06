<template>
    <div id="three" class="">
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useImage from '~~/composables/util';

//composables
const { getImagesAssetsFileURL } = useImage()
//1.創建三要素 : scene、camera、renderer
const scene = new THREE.Scene();
const camera = computed(() => {
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
})
const renderer = computed(() => {
    return new THREE.WebGLRenderer()
})
const textureLoader = new THREE.TextureLoader()  //材質下載
/* 
* camera 物件
* 共有三種可以使用，目前先專注於 PerspectiveCamera (模擬人眼)
* 參數一 : 設置camera的視野( FOV，field of view )
* 參數二 : view的寬高比
* 參數三、四 : 設置 最近 / 最遠 的clipping plane (截平面)，簡單說即超出 camera 最近/最遠 的object 將不會render，調整此數值，通常是為了效能。
*/

/*
* renderer.setSize() 通常我們希望設置全螢幕，但如果有效能考量，設置較低數值，將使的渲染加快。            
*/

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
    wireframe:true,
})
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material)
plane2.position.set(0,5,0)

//球形物件 ( StandardMaterial )
const sphereGeometry = new THREE.SphereGeometry(2)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-2, 1.5, -2)
sphere.castShadow = true
const sphereId = sphere.id

//光源
const ambientLight = addAmbientLight(scene)
const spotLight= addSpotLight(scene)
const spotLightHelper = addSpotLightHelper(scene, spotLight)
// const directionLight = addDirectionLight(scene)
// const directionLightHelper = addDirectionLightHelper(scene,directionLight)
// const directionLightShadowHelper =  addDirectionLightShadowHelper(scene, directionLight)

//場景霧化效果
// scene.fog = new THREE.Fog(0xFFFFFF,5,100)
scene.fog = new THREE.FogExp2(0xFFFFFF,0.01)

//互動效果
//創建滑鼠的兩個端點
const mousePosition = new THREE.Vector2()
const rayCaster = new THREE.Raycaster()
//GUI配置選項
//要開啟的GUI選項
interface GUIOptions{
    sphereColor: string,
    wireframe: boolean,
    speed:number,
    angle:number,
    penumbra:number,
    intensity:number,
}
const options:GUIOptions = {
        sphereColor: '#ffea00',
        wireframe: false,
        speed:0.01,
        angle:0.2,
        penumbra:0,  //柔光效果
        intensity:1,
}
onMounted(() => {
    //設置世界背景
    setWorld2DBackground(scene)
    // setWorldCubeBackground(scene)
    //1.調整renderer設定
    renderer.value.setSize(window.innerWidth, window.innerHeight);
    //2.把Renderer掛到DOM中，會是一個canvas
    document.getElementById('three').appendChild(renderer.value.domElement);
    //打開陰影
    enableShadowMap(renderer.value)
    //3.建立輔助工具
    addAxesHepler(scene)
    addGridHelper(scene)
    //orbit control
    addOrbitControls(camera.value, renderer.value)
    //GUI工具
    addGUI(options)
    //4.加入幾何體
    scene.add(cube)
    scene.add(plane)
    scene.add(plane2)
    scene.add(sphere)
    //貼材質的盒形物件
    addSpaceTextureCube(scene)
    //5.設置相機位置退後一點
    camera.value.position.set(1, 1, 5)
    
    //6.渲染場景
    //預設下每秒會畫60次
    renderer.value.setAnimationLoop(animate)

    //7.註冊使用者互動事件
    //獲取滑鼠移動座標
    window.addEventListener('mousemove', e => {
        mousePosition.x = ( e.clientX / window.innerWidth ) * 2 - 1
        mousePosition.y = - (e.clientY / window.innerHeight ) *2 + 1
    })
})
function animate(time) {
    //操作cube的動畫
    cube.rotation.x = time / 1000;
    cube.rotation.y = time / 1000;
<<<<<<< HEAD
    //操作頂點的動畫
    plane2.geometry.attributes.position.array[0] = -(time * Math.random())/1000
    plane2.geometry.attributes.position.needsUpdate = true
=======

    //讓SpotLigh 透過GUI操作屬性
    // spotLight.angle = options.angle
    // spotLight.penumbra = options.penumbra
    // spotLight.intensity = options.intensity
    // spotLightHelper.update()

    //使用者互動 把滑鼠位置和相機設成射線之兩端點
    rayCaster.setFromCamera(mousePosition, camera.value)
    //產生交互物件，獲得和使用者互動的資訊
    const intersects = rayCaster.intersectObjects(scene.children)
    //更新時，核對使用者互動物件，和球體的id
	intersects.forEach(intersect => {
		if(intersect.object.id === sphereId) {
			intersect.object.material.color.set(0xff0000)
		}
        if(intersect.object.name === 'cube2') {
            intersect.object.rotation.y = time / 1000
            intersect.object.rotation.x = time / 1000
        }
	})
>>>>>>> 146703f2403feb67a1aa74737c954ede21d67171
    //渲染
    renderer.value.render(scene, camera.value);
}
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
function addGridHelper(sceneObj: THREE.Scene) {
    //建構子選填參數(size?: number, divisions?: number, color1?: THREE.ColorRepresentation, color2?: THREE.ColorRepresentation)
    //網格預設下產生100格，
    //size預設10，表示寬高為10(px)， 
    //divisions 預設10，表示把網格切分成10*10 = 100 格
    sceneObj.add(new THREE.GridHelper())
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

//GUI工具
async function addGUI(options:GUIOptions) {
    const dat = await import ('dat.gui')
    // //3.建立GUI介面
    const gui = new dat.GUI()

    //為物件加入顏色color picker，以控制顏色變化
    gui
        .addColor(options, 'sphereColor')
        .onChange( e => {
            sphere.material.color.set(e)
        })

    //為物件加入是否顯示線框的checkbox
    gui
        .add(options, 'wireframe')
        .onChange( e => {
            sphere.material.wireframe = e
        })
    
    //加入全局的速度slider
    //最後面兩參數分別是最小值和最大值
    //使用時，只要options.speed就可以獲取速度值
    gui
        .add(options, 'speed',0 ,0.1)

    //控制角度
    gui
        .add(options, 'angle',0 ,1)
     //控制
     gui
        .add(options, 'penumbra',0 ,1)
     //控制亮度
     gui
        .add(options, 'intensity',0 ,1)
}

//光源
function addAmbientLight(sceneObj:THREE.Scene){
    const ambientLight = new THREE.AmbientLight(0x333333)
    sceneObj.add(ambientLight)
    return ambientLight
}
function addDirectionLight(sceneObj:THREE.Scene){
    const dirLight = new THREE.DirectionalLight(0xffffff,5)
    sceneObj.add(dirLight)
    dirLight.position.set(-10,10,0)
    
    //製造光影
    dirLight.castShadow = true

    return dirLight
}
function addSpotLight(sceneObj:THREE.Scene){
    const spotLight = new THREE.SpotLight(0xFFFFFF)
    sceneObj.add(spotLight)
    spotLight.position.set(-5,5,0)

    //製造光影
    spotLight.castShadow = true

    //調整聚光燈發散角度
    spotLight.angle = 0.8

    //輔助工具

    return spotLight
}
//光源Helper
function addDirectionLightHelper(sceneObj:THREE.Scene,directionLight:THREE.DirectionalLight) {
    const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
    sceneObj.add(directionLightHelper)
    return directionLightHelper
}
function addSpotLightHelper(sceneObj:THREE.Scene,spotLight:THREE.SpotLight) {
    const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    sceneObj.add(spotLightHelper)
    return spotLightHelper
}
//陰影
function enableShadowMap(renderer:THREE.Renderer){
    renderer.shadowMap.enabled = true
}
//陰影Helper
function addDirectionLightShadowHelper(sceneObj:THREE.Scene, derictionLight:THREE.DirectionalLight){
    const directionLightShadowHelper = new THREE.CameraHelper(derictionLight.shadow.camera)
    sceneObj.add(directionLightShadowHelper)
    return directionLightShadowHelper
}

//設置場景背景圖
//以cubeTexture設置六個面的背景圖
function setWorldCubeBackground(sceneObj:THREE.Scene){
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
function setWorld2DBackground(sceneObj:THREE.Scene){
    const texture = new THREE.TextureLoader()
    sceneObj.background = texture.load(getImagesAssetsFileURL('space.jpg'))
}
//貼材質的幾何體，需要在onMounted時再載入唷(因為loader的關係?!)
function addSpaceTextureCube(sceneObj:THREE.Scene){
    const cube2Geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube2Material = [
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('galaxy.jpg'))}),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('sun.jpg'))}),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('space.jpg'))}),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('space.jpg'))}),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('space.jpg'))}),
        new THREE.MeshBasicMaterial({ map: textureLoader.load(getImagesAssetsFileURL('space.jpg'))}),
    ]
    const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
    cube2.name = 'cube2'
    scene.add(cube2)
    cube2.position.set(0,3,0)
}
</script>
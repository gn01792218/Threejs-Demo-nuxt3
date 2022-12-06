<template>
    <div id="three" class="">
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'

//1.創建三要素 : scene、camera、renderer
const scene = new THREE.Scene();
const camera = computed(() => {
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
})
const renderer = computed(() => {
    return new THREE.WebGLRenderer()
})
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
sphere.position.set(-2, 2, -2)

onMounted(() => {
    //1.調整renderer設定
    renderer.value.setSize(window.innerWidth, window.innerHeight);
    //2.把Renderer掛到DOM中，會是一個canvas
    document.getElementById('three').appendChild(renderer.value.domElement);

    //3.建立輔助工具
    addAxesHepler(scene)
    addGridHelper(scene)
    //orbit control
    addOrbitControls(camera.value, renderer.value)
    //GUI工具
    addGUI()

    //4.加入幾何體
    scene.add(cube)
    scene.add(plane)
    scene.add(plane2)
    scene.add(sphere)
    //5.設置相機位置退後一點
    camera.value.position.set(1, 1, 5)

    //6.加入光源
    addAmbientLight(scene)
    addDirectionLight(scene,true)
    //7.渲染場景
    //預設下每秒會畫60次
    renderer.value.setAnimationLoop(animate)
})
function animate(time) {
    //操作cube的動畫
    cube.rotation.x = time / 1000;
    cube.rotation.y = time / 1000;
    //操作頂點的動畫
    plane2.geometry.attributes.position.array[0] = -(time * Math.random())/1000
    plane2.geometry.attributes.position.needsUpdate = true
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
async function addGUI() {
    const dat = await import ('dat.gui')
    // //3.建立GUI介面
    const gui = new dat.GUI()

    //要開啟的GUI選項
    const options = {
        sphereColor: '#ffea00',
        wireframe: false,
        speed:0.01,
    }

    //為物件加入顏色color picker，以控制顏色變化
    gui
        .addColor(options, 'sphereColor')
        .onChange((e) => {
            sphere.material.color.set(e)
        })

    //為物件加入是否顯示線框的checkbox
    gui
        .add(options, 'wireframe')
        .onChange((e) => {
            sphere.material.wireframe = e
        })
    
    //加入全局的速度slider
    //最後面兩參數分別是最小值和最大值
    //使用時，只要options.speed就可以獲取速度值
    gui
        .add(options, 'speed',0 ,0.1)
}

//光源
function addAmbientLight(sceneObj:THREE.Scene){
    sceneObj.add(new THREE.AmbientLight(0x333333))
}
function addDirectionLight(sceneObj:THREE.Scene,helper:boolean){
    const dirLight = new THREE.DirectionalLight(0xffffff,0.8)
    sceneObj.add(dirLight)
    dirLight.position.set(-10,10,0)
    if(helper){
        sceneObj.add(new THREE.DirectionalLightHelper(dirLight))
    }
}

</script>
<template>
    <div ref="solar" class="">
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import useUtil from '../composables/util'
import useTHREE from '~~/composables/three'
import { MaterialEnum, Position3D, RingGeometryProperty, SphereGeometryProperty } from '~~/types/three'
interface PlanetRin {
    rinMaterailType: MaterialEnum,
    rinTexture: string,
    rinProperty: RingGeometryProperty,
    initPosition?: Position3D
}
interface PlanetObject {
    planet: THREE.Mesh<THREE.SphereGeometry, any>,
    planetParent: THREE.Object3D<THREE.Event>,
    rin?:THREE.Mesh<THREE.RingGeometry, any>
}
interface NinePlanet {
    [properties:string]:Partial<PlanetObject>
}
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

const solar = ref<HTMLElement | null>(null)  //太陽系3D canvas

//太陽系物件
let sun
const ninePlanet:NinePlanet = {
    mercury:{}, //水星
    venus:{},  //金星
    earth:{}, //地球
    mars:{}, //火星
    jupiter:{}, //木星
    saturn:{}, //土星
    uranus:{}, //天王星
    neptune:{}, //海王星
    pluto:{} //冥王星
}

onMounted(() => {
    const [scene, camera, renderer] = init3DWorld(solar.value)

    //設置世界背景
    setWorldCubeBackground(scene)

    //3.建立輔助工具
    addAxesHepler(scene, 200)
    addGridHelper(scene, 200, 10)

    //orbit control
    addOrbitControls(camera, renderer)
    //添加太陽系物件
    sun = getSphereGeometryWithTexture(
        MaterialEnum.MeshBasicMaterial,
        getImagesAssetsFileURL('sunmap.jpg'),
        {
            radius: 16,
            widthSegments: 30,
            heightSegments: 30
        })
    ninePlanet.mercury = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('mercurymap.jpg'),
        {
            radius: 3.2,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:28,
            y:0,
            z:0
        })
    ninePlanet.venus = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('venusmap.jpg'),
        {
            radius: 5.8,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:44,
            y:0,
            z:0
        })
    ninePlanet.earth = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('earthmap.jpg'),
        {
            radius: 6,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:62,
            y:0,
            z:0
        })
    ninePlanet.mars = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('marsmap.jpg'),
        {
            radius: 4,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:78,
            y:0,
            z:0
        })
    ninePlanet.jupiter = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('jupitermap.jpg'),
        {
            radius: 12,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:100,
            y:0,
            z:0
        })
    ninePlanet.saturn = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('saturnmap.jpg'),
        {
            radius: 10,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:138,
            y:0,
            z:0
        },
        {
            rinMaterailType: MaterialEnum.MeshBasicMaterial,
            rinTexture:getImagesAssetsFileURL('saturnring.png'),
            rinProperty:{
                innerRadius: 15,
                outerRadius: 20,
                theatSegments: 30,
                phiSegments: 1
            },
            initPosition:{
                x:138,
                y:0,
                z:0
            }
        })
    ninePlanet.uranus = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('uranusmap.jpg'),
        {
            radius: 7,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:176,
            y:0,
            z:0
        },
        {
            rinMaterailType: MaterialEnum.MeshBasicMaterial,
            rinTexture:getImagesAssetsFileURL('uranusringtrans.png'),
            rinProperty:{
                innerRadius: 7,
                outerRadius: 12,
                theatSegments: 30,
                phiSegments: 1
            },
            initPosition:{
                x:176,
                y:0,
                z:0
            }
        })
    ninePlanet.neptune = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('neptunemap.jpg'),
        {
            radius: 7,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:200,
            y:0,
            z:0
        })
    ninePlanet.pluto = createPlanet(
        MaterialEnum.MeshStandardMaterial,
        getImagesAssetsFileURL('plutomap.jpg'),
        {
            radius: 2.8,
            widthSegments: 30,
            heightSegments: 30
        },
        {
            x:216,
            y:0,
            z:0
        })
    //場控
    addSolarControler(scene)

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
    //公轉
    ninePlanet.mercury.planetParent.rotateY(0.04)
    ninePlanet.venus.planetParent.rotateY(0.015)
    ninePlanet.earth.planetParent.rotateY(0.01)
    ninePlanet.mars.planetParent.rotateY(0.008)
    ninePlanet.jupiter.planetParent.rotateY(0.002)
    ninePlanet.saturn.planetParent.rotateY(0.0009)
    ninePlanet.uranus.planetParent.rotateY(0.0004)
    ninePlanet.neptune.planetParent.rotateY(0.0001)
    ninePlanet.pluto.planetParent.rotateY(0.00007)
    
    //自轉
    sun.rotateY(0.004)
    ninePlanet.mercury.planet.rotateY(0.004)
    ninePlanet.venus.planet.rotateY(0.002)
    ninePlanet.earth.planet.rotateY(0.02)
    ninePlanet.mars.planet.rotateY(0.018)
    ninePlanet.jupiter.planet.rotateY(0.04)
    ninePlanet.saturn.planet.rotateY(0.002)
    ninePlanet.uranus.planet.rotateY(0.03)
    ninePlanet.neptune.planet.rotateY(0.032)
    ninePlanet.pluto.planet.rotateY(0.008)
    //渲染
    rendererObj.render(sceneObj, cameraObj);
}

/**
 * 星球製造
 * 星球會自動添加到本場景中
 * @param planetMaterailType 必填
 * @param planetTexture 必填
 * @param planetProperty 必填
 * @param position 選填 ，星球初始化位置
 * @param planetRin 選填，需要星環的可以傳入星環物件
 */
function createPlanet(planetMaterailType: MaterialEnum, planetTexture: string, planetProperty: SphereGeometryProperty,position?:Position3D, planetRin?: PlanetRin):PlanetObject{
    const planet = getSphereGeometryWithTexture(planetMaterailType, planetTexture, planetProperty)
    const planetParent = new THREE.Object3D()  //星球的參照物件
    planetParent.add(planet)
    if( position ) { //初始位置
        const { x, y, z } = position
        planet.position.set(x, y, z)
    }
    if ( planetRin ) { //星環
        const { rinMaterailType, rinTexture, rinProperty } = planetRin
        const rin = getRingGeometryWithTexture(rinMaterailType, rinTexture, rinProperty)
        rin.rotation.x = -0.5 * Math.PI  //把調整星環旋轉
        planetParent.add(rin)
        if(!planetRin.initPosition) return
        const { x, y, z } = planetRin.initPosition
        rin.position.set(x, y, z)
        return { planet, planetParent, rin }
    }
    return { planet, planetParent }
}

//太陽系場控
function addSolarControler(sceneObj: THREE.Scene) {
    sceneObj.add(sun)
    //九大行星
    Object.values(ninePlanet).forEach(planet => sceneObj.add(planet.planetParent) )
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
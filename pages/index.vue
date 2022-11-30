<template>
    <div class="bg-black text-white p-5">
        tailwindu樣板
    </div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


console.log(OrbitControls)
// 一、建立場景三要素 : 
                //1.創建三要素 : scene、camera、renderer
                // const scene = new THREE.Scene();
                // const camera = new THREE.PerspectiveCamera( 75, 1000 / 1000, 0.1, 1000 );
                // const renderer = new THREE.WebGLRenderer();

                // //2.調整renderer設定
                // renderer.setSize( 1000, 1000 );
                // //3.把Renderer掛到DOM中，會是一個canvas
                // document.body.appendChild( renderer.domElement );

                // //4.建立輔助線
                // const axesHelper = new THREE.AxesHelper(5)
                // scene.add(axesHelper)

                //5.建立orbit control
                // const orbit = new  OrbitControls(camera, renderer.domElement)
                // orbit.update()

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

            // 二、加入一個正方形物件
                //1.建立方形物件的二元素 材質、幾何體、網格
                // BoxGeometry - 盒型幾何物件 ， 盒型物件包含了頂點、面
                // MeshBasicMaterial - 材質物件 (可上色)
                // Mesh - 網格，接受 幾何體 與 材質 物件
                // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
                // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                // const cube = new THREE.Mesh( geometry, material );

                // //2.加入場景，預設會加到座標(0,0,0)，將會跟相機重疊
                // scene.add( cube );

                // //3.因此設置相機位置退後一點
                // camera.position.set(1,1,5)

                /*
                * Material 物件 : Three.js中共有多種材質物件，現在專注於 MeshBasicMaterial
                * 所有材質物件都接受一個 object 可以設置各種屬性，來應用到材質物件上
                * 注意 : MeshBasicMaterial 不受光源影響
                */

            // 四、渲染場景

                // function animate(time) {
                //     //操作cube的動畫
                //     cube.rotation.x = time/1000;
                //     cube.rotation.y = time/1000;
                //     //渲染
                //     renderer.render( scene, camera );
                // }
                // //預設下每秒會畫60次
                // renderer.setAnimationLoop(animate)
</script>
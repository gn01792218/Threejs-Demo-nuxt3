import * as THREE from 'three'
export default function useInitTHREE() {
    /**
     * 
     * @param threeElementId : 輸入要掛載three場景的目標元素id
     * @returns 返回一個初始化所需三元素的陣列，依序是 scene、camera、renderer
     * 
     * 使用範例 : 
     * const [scene, camera, renderer] = init3DWorld('three')
     * 
     * 注意事項 : 
     * 因為camera和 renderer需要和Dom互動，所以請在mounted時使用
     */
    function init3DWorld(threeElement: HTMLElement): [THREE.Scene, THREE.PerspectiveCamera, THREE.WebGLRenderer] {
        //1.創建三要素 : scene、camera、renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer()

        //切換路由時會娶不到元素
        //1.調整renderer設定
        renderer.setSize(window.innerWidth, window.innerHeight);
        //2.把Renderer掛到DOM中，會是一個canvas
        threeElement.appendChild(renderer.domElement)
        return [scene, camera, renderer]
    }
    return {
        //methods
        init3DWorld,
    }
}
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
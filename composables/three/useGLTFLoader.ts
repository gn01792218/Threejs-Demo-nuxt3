import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useUtil from '~~/composables/util'
import { Position3D } from '~~/types/three'

export default function useGLTFLoader() {
    const { getModelsAssetsFileURL } = useUtil()
    /**
 * 
 * @param modelFileName 必填，要載入的模型檔案名稱
 * @param scene 必填，將載入之模型添加到目標場景中
 * @param position 選填，檔案初始位置座標，預設( 0,0,0 )
 * @param camera 選填，可以將我們的camera設置成下載檔案中的"第一台"攝影機
 */
    function loadGLTFModel(modelFileName: string, scene: THREE.Scene, position: Position3D, camera?: THREE.Camera) {
        const gltfLoader = new GLTFLoader()

        gltfLoader.load(getModelsAssetsFileURL(modelFileName), (gltf) => {
            const model = gltf.scene //取得模型

            //若想要使用檔案的camera
            if (camera) camera = gltf.cameras[1]

            //加入模型
            scene.add(model)
            //設置座標
            const { x = 0, y = 0, z = 0 } = position
            model.position.set(x, y, z)
        },
            (processing) => {
                //程序下載進度
                console.log((processing.loaded / processing.total) * 100 + '%')
            },
            (error) => {
                console.log(error)
            })
    }
    return {
        //methods
        loadGLTFModel,
    }
}
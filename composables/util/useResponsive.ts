import * as THREE from 'three'

export default function useImagesUtil() {
    //threejs canvas響應式
    function responsiveThreeCanvas(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
        window.addEventListener('resize', () => {
            const { innerWidth, innerHeight } = window
            camera.aspect = innerWidth / innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(innerWidth, innerHeight)
        })
    }
    return {
        //methods
        responsiveThreeCanvas,
    }
}
import { GUI } from 'dat.gui'

interface GUIOptions{
    sphereColor: string,
    wireframe: boolean,
    speed:number,
    angle:number,
    penumbra:number,
    intensity:number,
}

export default function useGUI() {
    /**
     * 
     * @param options 設定GUI要呈現那些控制項目
     */
    async function getGUI() {
        const dat = await import ('dat.gui')
        const gui = new dat.GUI()

        return gui
    }
    function removeGUI(gui:GUI){
        gui.destroy()
    }
    return {
        //methods
        getGUI,
        removeGUI,
    }
}
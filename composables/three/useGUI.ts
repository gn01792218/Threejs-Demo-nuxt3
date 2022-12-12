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
     * @param callBack 設定GUI和場景中物件的連結
     */
    async function addGUI(options:GUIOptions, callBack:Function) {
        const dat = await import ('dat.gui')
        const gui = new dat.GUI()

        //在callBack中設定場景中gui相關
        callBack(gui,options)
    }
    return {
        //methods
        addGUI,
    }
}
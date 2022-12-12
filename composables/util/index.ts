import useModelsUtil from "./useModelsUtil"
import useImagesUtil from "./useImagesUtil"
import useResponsive from "./useResponsive"

/**
 * 工具集合入口
 * 這裡的工具方法，所有的js檔案都可以使用，如元件、compasable等
 * 注意 : 各種取得資源的方法，如getModelsAssetsFileURL，無法在setup中使用，會出現500 server錯誤
 * @returns 
 */
export default function useUtil() {
    const { getModelsAssetsFileURL } = useModelsUtil()
    const { getImagesAssetsFileURL } = useImagesUtil()
    const { responsiveThreeCanvas } = useResponsive()
    return {
        //methods
        getModelsAssetsFileURL,
        getImagesAssetsFileURL,

        //responsive methods
        responsiveThreeCanvas,
    }
}
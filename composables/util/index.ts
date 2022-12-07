import useModelsUtil from "./useModelsUtil"
import useImagesUtil from "./useImagesUtil"

/**
 * 工具集合入口
 * 注意 : 各種取得資源的方法，如getModelsAssetsFileURL，無法在setup中使用，會出現500 server錯誤
 * @returns 
 */
export default function useUtil() {
    const { getModelsAssetsFileURL } = useModelsUtil()
    const { getImagesAssetsFileURL } = useImagesUtil()
    return {
        //methods
        getModelsAssetsFileURL,
        getImagesAssetsFileURL,
    }
}
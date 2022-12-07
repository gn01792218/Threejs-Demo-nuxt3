import useModelsUtil from "./useModelsUtil"
import useImagesUtil from "./useImagesUtil"
export default function useUtil() {
    const { getModelsAssetsFileURL } = useModelsUtil()
    const { getImagesAssetsFileURL } = useImagesUtil()
    return {
        //methods
        getModelsAssetsFileURL,
        getImagesAssetsFileURL,
    }
}
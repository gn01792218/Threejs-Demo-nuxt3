export default function useImagesUtil() {
    function getModelsAssetsFileURL(fileName: string) {
        return new URL(`/assets/models/${fileName}`, import.meta.url).href
    }
    return {
        //methods
        getModelsAssetsFileURL,
    }
}
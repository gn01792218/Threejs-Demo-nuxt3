export default function useImagesUtil() {
    function getModelsAssetsFileURL(url: string) {
        return new URL(`../../assets/models/${url}`, import.meta.url).href
    }
    return {
        //methods
        getModelsAssetsFileURL,
    }
}
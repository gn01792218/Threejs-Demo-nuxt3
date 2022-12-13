export default function useImagesUtil() {
    function getImagesAssetsFileURL(fileName: string) {
        return new URL(`/assets/images/${fileName}`, import.meta.url).href
    }
    return {
        //methods
        getImagesAssetsFileURL,
    }
}
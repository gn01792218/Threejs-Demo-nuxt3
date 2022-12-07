export default function useImagesUtil() {
    function getImagesAssetsFileURL(url: string) {
        return new URL(`../../assets/images/${url}`, import.meta.url).href
    }
    return {
        //methods
        getImagesAssetsFileURL,
    }
}
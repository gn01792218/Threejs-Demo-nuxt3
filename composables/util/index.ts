export default function useImage() {
    function getImagesAssetsFileURL(url: string) {
        return new URL(`../../assets/images/${url}`, import.meta.url).href
    }
    return {
        //methods
        getImagesAssetsFileURL,
    }
}
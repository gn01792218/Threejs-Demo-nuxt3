export default function useImagesUtil() {
    /**
     * 獲取圖片資源網址
     * @param fileName 
     * @returns 圖片資源網址
     * 
     * 注意 : 
     * 必須要在mounted的時候使用此方法才不會報錯唷!
     */
    function getImagesAssetsFileURL(fileName: string) {
        return new URL(`/assets/images/${fileName}`, import.meta.url).href
    }
    return {
        //methods
        getImagesAssetsFileURL,
    }
}
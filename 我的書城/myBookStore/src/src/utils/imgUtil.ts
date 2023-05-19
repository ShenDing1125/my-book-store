/**
 * @brief
 *  對圖片路徑進行加載，並掛載於瀏覽器(因數據量少且固定)
 * @data
 *  2023/4
 *  2023/5
 *   -新增類別的圖案路徑
 */
import goodStorage from 'good-storage'
export class ImgUtil {
  private static imgList: Record<string, string> = {}
  private constructor() {}

  private static loadAllImg() {
    const imgBookMap = import.meta.glob('../assets/img/books/**/*.jpg')
    const imgCategoryMap = import.meta.glob('../assets/img/category/**/*.png')

    const keyImgArr: string[] = []
    const keyImgBookArr: string[] = Object.keys(imgBookMap)
    const keyImgCategoryArr: string[] = Object.keys(imgCategoryMap)
    keyImgArr.push(...keyImgBookArr, ...keyImgCategoryArr)

    for (const path of keyImgArr) {
      const relativePath = path.replace('..', './src')
      const imgName = path.substring(path.lastIndexOf('/') + 1)
      this.imgList[imgName] = relativePath
    }
  }

  private static isEmpty() {
    return !Object.getOwnPropertyNames(this.imgList).length
  }

  public static storageImgList() {
    this.imgList = goodStorage.get('imgList') || {}
    if (this.isEmpty()) {
      this.loadAllImg()
      goodStorage.set('imgList', this.imgList)
    }
  }

  public static getImgPath(PicName: string) {
    const picError: string = '/src/assets/img/error/pic_error.png'
    return goodStorage.get('imgList')[PicName] !== undefined
      ? goodStorage.get('imgList')[PicName]
      : picError
  }
}

export default ImgUtil

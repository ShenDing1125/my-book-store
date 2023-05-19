/**
 * @brief
 *  請求級別分類表
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'

class CategoryApi {
  public static api: CategoryApi = new CategoryApi()
  private constructor() {}

  public async getFirstCategoryList() {
    const data = await axiosUtil.get('/category/firstCategory/list')
    return data
  }

  public async getSecThrCategoryLists() {
    const data = await axiosUtil.get('/category/secThrCategory/lists')
    return data
  }

  public async getSecThrCategoryByFirstCategoryId(firstCategoryId: number) {
    const data = await axiosUtil.get(`/category/secThrCategory/list/${firstCategoryId}`)
    return data
  }

  public async getThirdCategoryBySecondCategoryId(secondCategoryId: number) {
    const data = await axiosUtil.get(`/category/thirdCategory/list/${secondCategoryId}`)
    return data
  }
}

export default CategoryApi.api

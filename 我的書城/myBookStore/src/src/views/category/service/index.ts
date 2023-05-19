/**
 * @brief
 *  category 頁面的操作功能以及數據請求方法
 * @data
 *  2023/4
 */
import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store/category'
import { GoodStorageData } from '@/constants'
import goodStorage from 'good-storage'
import { ALL_THIRD_CATEGORY_LISTS } from '@/constants'
import router from '@/router'

const { THIRD_CATEGORY_LISTS } = GoodStorageData

class CategoryService {
  public static FirstActiveIndex: Ref<number> = ref(0)
  public static categoryStore = useCategoryStore()
  public static categoryStoreRefs = storeToRefs(CategoryService.categoryStore)
  private constructor() {}

  public static toCategoryPage() {
    router.push({ name: 'category' })
  }

  public static async getCategoryPageInfo() {
    await CategoryService.getFirstCategory()
    await CategoryService.getSecThrCategory()
  }

  private static async getFirstCategory() {
    await CategoryService.categoryStore.findFirstCategoryList()
  }

  private static async getSecThrCategory() {
    await CategoryService.categoryStore.findSecThrCategoryLists()
  }

  public static async getAndResetThirdCategory(SecondCategoryId: number) {
    const result = await CategoryService.categoryStore.findThirdCategoryBySecondCategory(
      SecondCategoryId
    )
    // 初始化陣列
    this.categoryStoreRefs.thirdCategoryLists.value = []

    // 在數據開頭新增 '全部' 的一個類別
    this.categoryStoreRefs.thirdCategoryLists.value.push(ALL_THIRD_CATEGORY_LISTS)

    // 在陣列添加請求完成的返回值
    this.categoryStoreRefs.thirdCategoryLists.value.push(...result)
    goodStorage.set(THIRD_CATEGORY_LISTS, this.categoryStoreRefs.thirdCategoryLists.value)
  }

  public static changeFirstTable(index: number) {
    CategoryService.FirstActiveIndex.value = index
  }
}

export default CategoryService

/**
 * @brief
 *  請求搜索紀錄和關鍵字
 * @data
 *  2023/4
 */
import axiosUtil from '@/utils/axiosUtil'

class SearchApi {
  public static searchApi: SearchApi = new SearchApi()
  private constructor() {}

  public async addOrPutHistoryKeyWord(historyKeyWord: string) {
    const data = await axiosUtil.post('/search/historyKeyWord', { historyKeyWord })

    return data
  }

  public async findKeyWords(keyWord: string) {
    const data = await axiosUtil.get(`/search/keyWords/${keyWord}`)

    return data
  }

  public async findAllHistoryKeyWords() {
    const data = await axiosUtil.get('/search/historyKeyWords/list')

    return data
  }

  public async findHistoryKeyWords(keyWord: string) {
    const data = await axiosUtil.get(`/search/historyKeyWords/${keyWord}`)

    return data
  }

  public async findBookItemListByKeyWord(keyWord: string) {
    const data = await axiosUtil.get(`/search/bookItems/${keyWord}`)

    return data
  }

  public async delAllHistoryKeyWord() {
    const data = await axiosUtil.delete('/search/historyKeyWords/list')

    return data
  }
}

export default SearchApi.searchApi

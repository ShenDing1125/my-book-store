/**
 * @brief
 *  三級分類的書本列表
 * @data
 *  2023/3
 */
import Books from "@/modules/decoratorModel/Books.model";

class BooksDao {
  static booksDao: BooksDao = new BooksDao();
  private constructor() {}

  async findBooksByThirdCategoryId(thirdCategoryId: number) {
    return await Books.findAll({
      raw: true,
      where: {
        thirdCategoryId,
      },
    });
  }
}

export default BooksDao.booksDao;

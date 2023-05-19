/**
 * @brief
 *  購物車列表
 * @data
 *  2023/3
 */
import ShopCart from "@/modules/decoratorModel/ShopCart.model";
import { ShopCartTypes } from "@/types/modules/ShopCart";
import baseDao from "@module/BaseDao";

const { QueryTypes } = require("sequelize");

class ShopCartDao {
  public static shopCartDao: ShopCartDao = new ShopCartDao();
  private constructor() {}

  async findCurUserShopCartList(userId: number) {
    return await ShopCart.findAll({
      raw: true,
      where: {
        userId,
      },
    });
  }

  async addWishlistToShopCartList(shopCartList: ShopCartTypes): Promise<[any, any]> {
    const { bookISBN, bookName, bookPicName, originalPrice, discount } = shopCartList;

    // 並無擴展新建帳號的功能
    // 所以這裡的 userId 固定為 1
    const sql = `INSERT INTO shopCart (bookISBN,bookName,bookPicName,originalPrice,discount,userId) VALUES ('${bookISBN}','${bookName}','${bookPicName}','${originalPrice}','${discount}',${1})`;

    return await baseDao.sequelize.query(sql, { type: QueryTypes.INSERT });
  }

  async delWishlistFromShopCartList(bookISBN: number) {
    return await ShopCart.destroy({
      where: {
        bookISBN: bookISBN,
      },
    });
  }

  async putWishlistToShopCartList(shopCartList: ShopCartTypes) {
    return await ShopCart.update(
      { purchaseQuantity: shopCartList.purchaseQuantity },
      { where: { bookISBN: shopCartList.bookISBN } }
    );
  }
}

export default ShopCartDao.shopCartDao;

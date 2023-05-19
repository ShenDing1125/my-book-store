/**
 * @brief
 *  商品(書本)詳情
 * @data
 *  2023/3
 */
import Books from "@/modules/decoratorModel/Books.model";

class ProductDetails {
  public static productDetails: ProductDetails = new ProductDetails();
  private constructor() {}

  public async findBooKItemByISBN(ISBN: string) {
    return await Books.findAll({
      raw: true,
      where: {
        ISBN,
      },
    });
  }
}

export default ProductDetails.productDetails;

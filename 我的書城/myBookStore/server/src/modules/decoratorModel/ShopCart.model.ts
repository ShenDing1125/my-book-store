/**
 * @brief
 *  shopCart 數據表
 * @data
 *  2023/3
 */
import { DataTypes } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";
import { ShopCartTypes, ShopCartList } from "@/types/modules/ShopCart";

const {
  TABLE_NAME,
  SHOP_CART_ID,
  BOOK_ISBN,
  BOOK_NAME,
  BOOK_PIC_NAME,
  ORIGINAL_PRICE,
  DISCOUNT,
  USER_ID,
  PURCHASE_NUM,
  PURCHASE_QUANTITY,
} = ShopCartList;

@Table({
  tableName: TABLE_NAME,
})
export default class ShopCart extends Model<ShopCartTypes> implements ShopCartTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: SHOP_CART_ID,
    primaryKey: true,
    autoIncrement: true,
  })
  public shopCartId!: number;

  @Column({
    type: DataTypes.STRING(20),
    field: BOOK_ISBN,
    allowNull: false,
  })
  public bookISBN!: string;

  @Column({
    type: DataTypes.STRING(255),
    field: BOOK_NAME,
    allowNull: false,
  })
  public bookName!: string;

  @Column({
    type: DataTypes.STRING(255),
    field: BOOK_PIC_NAME,
    allowNull: false,
  })
  public bookPicName!: string;

  @Column({
    type: DataTypes.DOUBLE(10, 2),
    field: ORIGINAL_PRICE,
    allowNull: false,
  })
  public originalPrice!: number;

  @Column({
    type: DataTypes.DOUBLE(5, 2),
    field: DISCOUNT,
    allowNull: false,
  })
  public discount!: number;

  @Column({
    type: DataTypes.NUMBER,
    field: USER_ID,
    allowNull: false,
  })
  public userId!: number;

  @Column({
    type: DataTypes.NUMBER,
    field: PURCHASE_NUM,
    allowNull: false,
  })
  public purchaseNum!: number;

  @Column({
    type: DataTypes.NUMBER,
    field: PURCHASE_QUANTITY,
    allowNull: false,
  })
  public purchaseQuantity!: number;
}

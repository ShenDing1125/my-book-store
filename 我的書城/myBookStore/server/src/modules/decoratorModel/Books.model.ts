/**
 * @brief
 *  books 數據表
 * @data
 *  2023/3
 */
import { DataType } from "sequelize-typescript";
import { Column, Model, Table } from "sequelize-typescript";
import { BooksTypes, BooksList } from "@/types/modules/BooksTypes";
const {
  TABLE_NAME,
  ISBN,
  BOOK_NAME,
  AUTHOR,
  PUBLISH_ID,
  PUBLISHER_NAME,
  MONTH_SALE_COUNT,
  BOOK_PIC_NAME,
  SECOND_CATEGORY_ID,
  THIRD_CATEGORY_ID,
  ORIGINAL_PRICE,
  DISCOUNT,
} = BooksList;

@Table({
  tableName: TABLE_NAME,
})
export default class Books extends Model<BooksTypes> implements BooksTypes {
  @Column({
    type: DataType.STRING(20),
    field: ISBN,
    allowNull: false,
    primaryKey: true,
  })
  public ISBN!: string;

  @Column({
    type: DataType.STRING(255),
    field: BOOK_NAME,
    allowNull: false,
  })
  public bookName!: string;

  @Column({
    type: DataType.STRING(20),
    field: AUTHOR,
    allowNull: false,
  })
  public author!: string;

  @Column({
    type: DataType.INTEGER,
    field: PUBLISH_ID,
    allowNull: false,
  })
  public publishId!: number;

  @Column({
    type: DataType.STRING(20),
    field: PUBLISHER_NAME,
    allowNull: false,
  })
  public publisherName!: string;

  @Column({
    type: DataType.INTEGER,
    field: MONTH_SALE_COUNT,
    allowNull: true,
    defaultValue: null,
  })
  public monthSaleCount!: number;

  @Column({
    type: DataType.STRING(255),
    field: BOOK_PIC_NAME,
    allowNull: false,
  })
  public bookPicName!: string;

  @Column({
    type: DataType.INTEGER,
    field: SECOND_CATEGORY_ID,
    allowNull: false,
  })
  public secondCategoryId!: number;

  @Column({
    type: DataType.INTEGER,
    field: THIRD_CATEGORY_ID,
    allowNull: false,
  })
  public thirdCategoryId!: number;

  @Column({
    type: DataType.DOUBLE(10, 2),
    field: ORIGINAL_PRICE,
    allowNull: false,
  })
  public originalPrice!: number;

  @Column({
    type: DataType.DOUBLE(5, 2),
    field: DISCOUNT,
    allowNull: true,
    defaultValue: null,
  })
  public discount!: number;
}

export {};

/**
 * @brief
 *  thirdCategory 數據表
 * @data
 *  2023/3
 *  2023/5
 *   -新增類別圖案
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { ThirdCategoryTypes, ThirdCategoryList } from "@/types/modules/CategoryTypes";

const { TABLE_NAME, THIRD_CATEGORY_ID, THIRD_CATEGORY_NAME, THIRD_CATEGORY_PIC_NAME, SECOND_CATEGORY_ID } =
  ThirdCategoryList;

@Table({
  tableName: TABLE_NAME,
})
export default class ThirdCategory extends Model<ThirdCategoryTypes> implements ThirdCategoryTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: THIRD_CATEGORY_ID,
    primaryKey: true,
    autoIncrement: true,
  })
  public thirdCategoryId!: number;

  @Column({
    type: DataTypes.STRING(20),
    field: THIRD_CATEGORY_NAME,
    allowNull: false,
  })
  public thirdCategoryName!: string;

  @Column({
    type: DataTypes.STRING(255),
    field: THIRD_CATEGORY_PIC_NAME,
    allowNull: false,
  })
  public thirdCategoryPicName!: string;

  @Column({
    type: DataTypes.INTEGER,
    field: SECOND_CATEGORY_ID,
    allowNull: false,
  })
  public secondCategoryId!: number;
}

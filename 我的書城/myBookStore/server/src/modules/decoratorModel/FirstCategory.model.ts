/**
 * @brief
 *  firstCategory 數據表
 * @data
 *  2023/3
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { FirstCategoryTypes, FirstCategoryList } from "@/types/modules/CategoryTypes";

const { TABLE_NAME, FIRST_CATEGORY_ID, FIRST_CATEGORY_NAME } = FirstCategoryList;

@Table({
  tableName: TABLE_NAME,
})
export default class FirstCategory extends Model<FirstCategoryTypes> implements FirstCategoryTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: FIRST_CATEGORY_ID,
    primaryKey: true,
    autoIncrement: true,
  })
  public firstCategoryId!: number;

  @Column({
    type: DataTypes.STRING(20),
    field: FIRST_CATEGORY_NAME,
    allowNull: false,
  })
  public firstCategoryName!: string;
}

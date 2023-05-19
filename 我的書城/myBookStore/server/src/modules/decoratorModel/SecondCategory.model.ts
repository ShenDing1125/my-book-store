/**
 * @brief
 *  secondCategory 數據表
 * @data
 *  2023/3
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { SecondCategoryTypes, SecondCategoryList } from "@/types/modules/CategoryTypes";

const { TABLE_NAME, SECOND_CATEGORY_ID, SECOND_CATEGORY_NAME, FIRST_CATEGORY_ID } = SecondCategoryList;

@Table({
  tableName: TABLE_NAME,
})
export default class SecondCategory extends Model<SecondCategoryTypes> implements SecondCategoryTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: SECOND_CATEGORY_ID,
    primaryKey: true,
    autoIncrement: true,
  })
  public secondCategoryId!: number;

  @Column({
    type: DataTypes.STRING(20),
    field: SECOND_CATEGORY_NAME,
    allowNull: false,
  })
  public secondCategoryName!: string;

  @Column({
    type: DataTypes.INTEGER,
    field: FIRST_CATEGORY_ID,
    allowNull: false,
  })
  public firstCategoryId!: number;
}

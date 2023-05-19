/**
 * @brief
 *  userInfo 數據表
 * @data
 *  2023/4
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { UserInfoTypes, UserInfoList } from "@/types/modules/UserInfoTypes";

const { TABLE_NAME, USER_ID, USER_NAME, PASS_WORD, ADDRESS, VALID } = UserInfoList;

@Table({
  tableName: TABLE_NAME,
})
export default class UserInfoModel extends Model<UserInfoTypes> implements UserInfoTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: USER_ID,
    primaryKey: true,
    autoIncrement: true,
  })
  public userId!: number;

  @Column({
    type: DataTypes.STRING(20),
    field: USER_NAME,
    allowNull: false,
  })
  public userName!: string;

  @Column({
    type: DataTypes.INTEGER,
    field: PASS_WORD,
    allowNull: false,
  })
  public password!: string;

  @Column({
    type: DataTypes.STRING(10),
    field: ADDRESS,
    allowNull: false,
  })
  public address!: string;

  @Column({
    type: DataTypes.INTEGER,
    field: VALID,
    allowNull: false,
  })
  public valid!: number;

  public token!: string;
}

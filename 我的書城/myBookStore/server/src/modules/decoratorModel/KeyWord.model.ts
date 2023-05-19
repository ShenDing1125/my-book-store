/**
 * @brief
 *  keyWord 數據表
 * @data
 *  2023/3
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { KeyWordTypes, KeyWordList } from "@/types/modules/KeyWordTypes";

const { TABLE_NAME, KEY_WORD_ID, KEY_WORD } = KeyWordList;

@Table({
  tableName: TABLE_NAME,
})
export default class KeyWord extends Model<KeyWordTypes> implements KeyWordTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: KEY_WORD_ID,
    allowNull: false,
    primaryKey: true,
  })
  keyWordId!: number;

  @Column({
    type: DataTypes.STRING(30),
    field: KEY_WORD,
    allowNull: false,
  })
  keyWord!: string;
}

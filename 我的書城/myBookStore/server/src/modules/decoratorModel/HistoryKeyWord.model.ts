/**
 * @brief
 *  historyKeyWord 數據表
 * @data
 *  2023/3
 */
import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { HistoryKeyWordTypes, HistoryKeyWordList } from "@/types/modules/HistoryKeyWordTypes";

const { TABLE_NAME, HISTORY_KEY_WORD_ID, HISTORY_KEY_WORD, CLICK_COUNT } = HistoryKeyWordList;

@Table({
  tableName: TABLE_NAME,
})
export default class Search extends Model<HistoryKeyWordTypes> implements HistoryKeyWordTypes {
  @Column({
    type: DataTypes.INTEGER,
    field: HISTORY_KEY_WORD_ID,
    allowNull: false,
    primaryKey: true,
  })
  historyKeyWordId!: number;

  @Column({
    type: DataTypes.STRING(30),
    field: HISTORY_KEY_WORD,
    allowNull: false,
  })
  historyKeyWord!: string;

  @Column({
    type: DataTypes.INTEGER,
    field: CLICK_COUNT,
    allowNull: false,
  })
  clickCount!: number;
}

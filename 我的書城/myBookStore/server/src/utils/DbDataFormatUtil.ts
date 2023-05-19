/**
 * @brief
 *  提供對 db數據 操作的功能
 * @data
 *  2023/3
 */
import { EleOfArr, ItemType, NonPrimitiveTypes, PrimitiveTypes } from "@/types/UtilsTypes";

class DbDataFormatUtil {
  public static dbDataFormatUtil: DbDataFormatUtil = new DbDataFormatUtil();
  private constructor() {}

  // 取出指定值
  getSubItemFromArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(
    arr: T,
    ...args: K[]
  ): Pick<EleOfArr<T>, K>[] {
    return arr.map((item: any) => {
      return args.reduce((pre: any, cur: any, index: any) => {
        return { ...pre, [args[index]]: item[args[index]] };
      }, {});
    }) as Pick<EleOfArr<T>, K>[];
  }

  // 獲取陣列中所有物件的屬性值，並組成陣列返回
  getOneItemValuesFromArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(arr: T, k: K): EleOfArr<T>[K][] {
    return arr.map(({ [k]: v }) => {
      return v;
    });
  }

  // 陣列 非原始類型 去重
  getNoReptItemValue<T extends NonPrimitiveTypes<T>[]>(arr: T): EleOfArr<T>[] {
    const data: EleOfArr<typeof arr>[] = [];
    arr.filter((value) => !data.includes(value) && data.push(value));
    return data;
  }

  // 物件去重
  getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(arr: T, k: K): ItemType<T>[] {
    const data: ItemType<T>[] = [];
    const oneItemValues = this.getOneItemValuesFromArr(arr, k);
    const noReptOneItemValues = this.getNoReptItemValue(oneItemValues);

    arr.map((item) => {
      if (noReptOneItemValues.includes(item[k])) {
        noReptOneItemValues.splice(noReptOneItemValues.indexOf(item[k]), 1);
        data.push(item);
      }
    });
    return data;
  }

  // 物件組合
  combineFromObj<T extends object[]>(...args: T): object {
    return args.reduce((pre, cur) => {
      return { ...pre, ...cur };
    }, {});
  }

  // 添加物件屬性
  addNewProperty<T extends ItemType<T>[]>(arr: T, key: string, value: PrimitiveTypes): any[] {
    return arr.map((item: any) => {
      return this.combineFromObj(item, { [key]: value });
    });
  }
}

export default DbDataFormatUtil.dbDataFormatUtil;

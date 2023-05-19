/**
 * @brief
 *  utils 文件夾下的宣告類型
 * @data
 *  2023/3
 */
export type EleOfArr<T> = T extends Array<infer E> ? E : never;

export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K];
};

export type NonPrimitiveTypes<T> = Exclude<EleOfArr<T>, object>;

export type PrimitiveTypes = number | string | boolean;

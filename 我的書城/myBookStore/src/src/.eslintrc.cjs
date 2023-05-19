module.exports = {
  // eslintrc.js 文件所在的目錄為 root 目錄
  // eslint 規則將對這個目錄以及該目錄下所有文件起作用
  root: true,
  // 讓 vue3.2 中的這些全局函數能正常使用
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  // eslint 繼承別人寫好的配置規則，這些規則是檢測語法時的規則的來源
  extends: ['plugin:@typescript-eslint/recommended'],

  // 插件的作用就是對規則進行補充
  // 如果 typescript-eslint/recommended 裡面就沒有包含與 vue 相關的規則
  // 那麼就讓 ESLint 兼容 vue 的語法
  plugins: ['vue'],
  parser: 'vue-eslint-parser', // 檢測 vue 語法規範 的 eslint 解析器
  parserOptions: {
    // 發現儘管 ecmaVersion 設置版本為 5, 但 ESLint 依然能識別 ES6 的語法
    // 這是 '@typescript-eslint/parser' 解析器幫著識別了
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', // 檢測 ts 語法規範的 eslint 解析器
  },
  rules: {
    // 生產環境不允許控制台輸出，開發允許允許控制台輸出
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 不允許函數的()前有空格
    'vue/no-multiple-template-root': 0,
    '@typescript-eslint/no-empty-function': 0, // 允許出現空的函數
    '@typescript-eslint/no-explicit-any': [0], // 允許使用any
    '@typescript-eslint/no-var-requires': 0, // 項目中允許使用 require()語法
    semi: 0, // 關閉語句結尾分號
    quotes: [1, 'single'], //使用單引號
    'prefer-const': 1, // 開啟不變的變量一定要使用 const
    '@typescript-eslint/no-unused-vars': 0, // 允許出現未使用過的變量
    '@typescript-eslint/no-inferrable-types': 0, // 允許變量後面添加類型
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}

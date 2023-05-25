# 我的書城
### 項目介紹 :

#### 「我的書城」是一個為移動端所設計的RWD響應式網頁。 


### 項目技術 :

- #### 前端 :

  - 語言使用 TypeScript 來編寫前後端，因本身的「靜態型別」與「強行別」，後期提高了代碼的擴展性以及降低了代碼的維護性。
  - 框架使用 Vue 3 進行開發，其中 Composition API 有著更好的功能分類，並提高代碼的重複使用性。
  - 狀態管理使用 Pinia，獨立的模塊設計，便於拆分狀態及代碼分割。
  - 建構工具使用 Vite，提高項目啟動及熱更新速度。

- #### 後端 :

  - 使用 Node.js 搭配 Koa 框架，進行輕量化開發。
  - 使用 MySql 來進行數據管理。
  - 使用 Sequelize 與數據表進行關聯操作。
  - 使用 Redis 提高資料讀取數度且降低了 MySql 請求數。


### 項目展示 :
## 首頁
![首頁](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E9%A6%96%E9%A0%81_1.png)

## 級別列表
 - 規劃不同的級別分類。
 - 點擊跳轉至該分類的級別展示頁。
 - 因該級別為不常變更的數據，所以將此儲存於 Redis 中，不僅提高讀取速度，也降低了 MySql 的請求數。

![級別列表](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E7%B4%9A%E5%88%A5%E9%A1%9E%E8%A1%A8_1.png)

## 級別展示頁
 - 在前端自行新建"全部類別"。 (非後端提供。)
 - 上拉數據從新發請求。
 - 下拉數據懶加載處理。
 - 將上方級別的分類數據緩存於 LocalStorage，在網頁刷新時減少請求，並於第一時間顯示。(若緩存清空則會從發請求。)
 
![級別展示頁](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E7%B4%9A%E5%88%A5%E5%B1%95%E7%A4%BA%E9%A0%81_2.png)

## 登入
 - 使用 JWT 來進行登入驗證。
 - 後端會限制特定請求，需要登入後才能使用。
 
![登入](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E7%99%BB%E5%85%A5_1.png)

## 購物車
 - 將用戶的購物資訊保存於後台。
 - 添加、刪除、計算購物總價等功能。

![購物車](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E8%B3%BC%E7%89%A9%E8%BB%8A_1.png)

## 書本詳情
 - 展示書籍詳細資訊。
 - 可經由後端查詢該物品是否已添加。

![書本詳情](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E6%9B%B8%E7%B1%8D%E8%A9%B3%E6%83%85_1.png)

## 搜尋欄
 - 自動顯示熱門關鍵字和歷史紀錄。
 - 搜尋後自動儲存為歷史關鍵字。
 - 一鍵清空歷史紀錄。
 
![搜尋欄](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E6%90%9C%E5%B0%8B%E6%AC%84_2.png)

## 搜尋結果
 - 使用模糊搜索，提高搜索範圍。
 
![搜尋結果](https://github.com/ShenDing1125/my-book-store/blob/main/github-img/%E6%90%9C%E5%B0%8B%E7%B5%90%E6%9E%9C_1.png)

## 項目資訊 :
### 帳密
- admin
- 123

### 展示影片
https://drive.google.com/file/d/1b2fjukwG7f4JMlGDdCgiID4DXnuse9XE/view?usp=share_link

### 書本資訊 & 圖片 參考來源:

- [博客來](https://www.books.com.tw/)

- [Pngtree](https://zh.pngtree.com/)

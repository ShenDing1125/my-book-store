-- ----------------------------
-- Table structure for books
-- ----------------------------
CREATE TABLE `books`  (
  `ISBN` varchar(20)  NOT NULL,
  `bookName` varchar(255) NOT NULL,
  `author` varchar(20)  NOT NULL,
  `publishId` int NOT NULL,
  `publisherName` varchar(20) NOT NULL,
  `monthSaleCount` int NULL DEFAULT NULL,
  `bookPicName` varchar(255)  NULL DEFAULT NULL,
  `secondCategoryId` int NOT NULL,
  `thirdCategoryId` int NOT NULL,
  `originalPrice` double(10, 2)  NOT NULL,
  `discount` double(5, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  INDEX `fk_secid`(`secondCategoryId`) USING BTREE,
  INDEX `fk_thrdid`(`thirdCategoryId`) USING BTREE,
  CONSTRAINT `fk_secid` FOREIGN KEY (`secondCategoryId`) REFERENCES `secondCategory` (`secondCategoryId`)  ON UPDATE CASCADE,
  CONSTRAINT `fk_thrdid` FOREIGN KEY (`thirdCategoryId`) REFERENCES `thirdCategory` (`thirdCategoryId`)  ON UPDATE CASCADE
)


-- ----------------------------
-- Records of books
-- ----------------------------
### 人文社科 (firstCategoryId: 1)

## 傳記、自傳 (secondCategoryId: 1)
-------------------------------
# 領袖 / 領導人物 (thirdCategoryId: 1)
INSERT INTO `books` VALUES ('9789865253271', '梅克爾傳：一場卓越的史詩之旅', '凱蒂．馬頓', 1, '天下文化', 20, '梅克爾傳：一場卓越的史詩之旅.jpg', 1, 1, 550, 7.9);
# 台灣人物 (thirdCategoryId: 2)
INSERT INTO `books` VALUES ('9789864796762', '郝柏村回憶錄', '郝柏村', 1, '天下文化', 18, '郝柏村回憶錄.jpg', 1, 2, 850, 9);
INSERT INTO `books` VALUES ('9789869665384', '馬偕傳：攏是為主基督', '郭和烈', 2, '主流出版社 ', 32, '馬偕傳：攏是為主基督.jpg', 1, 2, 450, 5);
# 傳奇 / 逸聞 (thirdCategoryId: 3)
INSERT INTO `books` VALUES ('9789862717769', '山海經大圖鑑', '遲嘯川', 3, '典藏閣', 15, '山海經大圖鑑.jpg', 1, 3, 490, 7);
-------------------------------

##  哲學 (secondCategoryId: 2)
-------------------------------
# 西方哲學 (thirdCategoryId: 4)
INSERT INTO `books` VALUES ('9789864773947', '生活的藝術：52個打造美好人生的思考工具', '魯爾夫．杜伯里', 4, '商周出版 ', 32, '生活的藝術：52個打造美好人生的思考工具.jpg', 2, 4, 360, 7.9);
INSERT INTO `books` VALUES ('9789865596583', '寫給公民的40堂思辨課：人氣知識平台「公民不下課」，寫給現代台灣人的公民議題讀本！從世界到日常，這些事情，你真的應該要知道', '公民不下課', 5, '平安文化', 16, '寫給公民的40堂思辨課：人氣知識平台「公民不下課」，寫給現代台灣人的公民議題讀本！從世界到日常，這些事情，你真的應該要知道.jpg', 2, 4, 399, 7.9);
# 東方哲學 (thirdCategoryId: 5)
INSERT INTO `books` VALUES ('9789579075503', '全彩圖解鬼谷子', '鬼谷子 ', 6, '華威國際 ', 66, '全彩圖解鬼谷子.jpg', 2, 5, 499, 7);
INSERT INTO `books` VALUES ('9789863981824', '莊子，從心開始', '蔡璧名', 7, '天下雜誌', 35, '莊子，從心開始.jpg', 2, 5, 550, 7.9);
INSERT INTO `books` VALUES ('9789864797950', '傅佩榮易經課：占卜、解卦、指引人生、趨吉避凶', '傅佩榮', 1, '天下文化', 43, '傅佩榮易經課：占卜、解卦、指引人生、趨吉避凶.jpg', 2, 5, 600, 7.5);
-------------------------------


### 心理勵志 (firstCategoryId: 2)

## 勵志故事 / 散文 (secondCategoryId: 3)
-------------------------------
# 真實人生故事 (thirdCategoryId: 6)
INSERT INTO `books` VALUES ('9789861338644', '心中住著野孩子', '凱莉哥', 8, '圓神', 22, '心中住著野孩子.jpg', 3, 6, 390, 7.9);
# 勵志小品文 (thirdCategoryId: 7)
INSERT INTO `books` VALUES ('9786263296688', '不完美的妳也很美：練習在意自己、疼愛自己，妳值得被溫柔以待的180則手寫小語', 'Pei沛芸', 9, '台灣東販', 35, '不完美的妳也很美：練習在意自己、疼愛自己，妳值得被溫柔以待的180則手寫小語.jpg', 3, 7, 360, 7.9);
# 心靈成長故事 (thirdCategoryId: 8)
INSERT INTO `books` VALUES ('9789863987871', '男孩、鼴鼠、狐狸與馬：動畫故事繪本', '查理‧麥克斯', 7, '天下雜誌', 82, '男孩、鼴鼠、狐狸與馬：動畫故事繪本.jpg', 3, 8, 699, 7.9);
INSERT INTO `books` VALUES ('9786267099308', '讓別人贏：在人生多重角色中，55個修煉與覺察的智慧', '黃冠華Sunny Huang', 10, '商業周刊', 30, '讓別人贏：在人生多重角色中，55個修煉與覺察的智慧.jpg', 3, 8, 380, 7.9);
-------------------------------

## 個人成長 (secondCategoryId: 4)
-------------------------------
# 心靈成長 (thirdCategoryId: 9)
INSERT INTO `books` VALUES ('9789575469078', '非暴力溝通：愛的語言', '馬歇爾．盧森堡', 11, '光啟文化', 62, '非暴力溝通：愛的語言.jpg', 4, 9, 320, 7.9);
# 人生規劃 / 自我改變 (thirdCategoryId: 10)
INSERT INTO `books` VALUES ('9789865596934', '逆思維：華頓商學院最具影響力的教授，突破人生盲點的全局思考', '亞當．格蘭特', 4, '平安文化', 46, '逆思維：華頓商學院最具影響力的教授，突破人生盲點的全局思考.jpg', 4, 10, 420, 7.9);
-------------------------------

## 人際關係 (secondCategoryId: 5)
-------------------------------
# 人脈 / 處世 (thirdCategoryId: 11)
INSERT INTO `books` VALUES ('9789869452809', '你的善良必須有點鋒芒：36則讓你有態度、不委曲，深諳世故卻不世故的世道智慧', '慕顏歌', 12, '采實文化', 52, '你的善良必須有點鋒芒：36則讓你有態度、不委曲，深諳世故卻不世故的世道智慧.jpg', 5, 11, 280, 7.9);
INSERT INTO `books` VALUES ('9789865596781', '別人怎麼對你，都因為你說的話', '黃啟團', 4, '平安文化', 55, '別人怎麼對你，都因為你說的話.jpg', 5, 11, 380, 7.9);
INSERT INTO `books` VALUES ('9789578683761', '這世界很煩，但你要很可愛', '萬特特', 13, '幸福文化', 48, '這世界很煩，但你要很可愛.jpg', 5, 11, 330, 7);
# 說話 / 溝通 (thirdCategoryId: 12)
INSERT INTO `books` VALUES ('9789869800570', '我想跟你好好說話：賴佩霞的六堂「非暴力溝通」入門課', '賴佩霞', 14, '早安財經', 66, '我想跟你好好說話：賴佩霞的六堂「非暴力溝通」入門課.jpg', 4, 12, 360, 7.9);
INSERT INTO `books` VALUES ('9789575039523', '薩提爾的對話練習（十萬冊融冰紀念版，內附精美薩提爾練習專用練習本《冰山練習曲》）：以好奇的姿態，理解你的內在冰山，探索自己，連結他人', '李崇建', 15, '親子天下', 71, '薩提爾的對話練習（十萬冊融冰紀念版，內附精美薩提爾練習專用練習本《冰山練習曲》）：以好奇的姿態，理解你的內在冰山，探索自己，連結他人.jpg', 4, 12, 499, 7.9);
# 讀心 / 識人 (thirdCategoryId: 13)
INSERT INTO `books` VALUES ('9789869693196', '冰鑑：寧可不識字，不能不識人！曾國藩畢生經驗累積，教你抓心理、看眼色，成功逆轉每一個關鍵時刻', '曾國藩, 東離子', 16, '好優文化', 20, '冰鑑：寧可不識字，不能不識人！曾國藩畢生經驗累積，教你抓心理、看眼色，成功逆轉每一個關鍵時刻.jpg', 5, 13, 350, 7.9);
-------------------------------

### 電腦資訊 (firstCategoryId: 3)

## 網頁開發設計 (secondCategoryId: 6)
-------------------------------
# 網頁設計概論 (thirdCategoryId: 14)
INSERT INTO `books` VALUES ('9786263242593', 'Web API設計原則｜API與微服務傳遞價值之道', 'James Higginbotham', 17, '碁峰', 30, 'Web API設計原則｜API與微服務傳遞價值之道.jpg', 6, 14, 520, 7.9);
# JavaScript (thirdCategoryId: 15)
INSERT INTO `books` VALUES ('9786263243835', 'Vue.js設計實戰', '霍春陽', 17, '碁峰', 66, 'Vue.js設計實戰.jpg', 6, 15, 680, 7.9);
INSERT INTO `books` VALUES ('9789865029890', '精通JavaScript 第三版', 'Marijn Haverbeke', 17, '碁峰', 52, '精通JavaScript 第三版.jpg', 6, 15, 580, 10);
# HTML / CSS (thirdCategoryId: 16)
INSERT INTO `books` VALUES ('9786263333116', '零程式基礎超入門_HTML-CSS網頁設計的12堂特訓課', '鄭苑鳳', 18, '博碩', 33, '零程式基礎超入門_HTML-CSS網頁設計的12堂特訓課.jpg', 6, 16, 600, 7.9);
-------------------------------

## 程式設計 (secondCategoryId: 7)
-------------------------------
# C / C++ (thirdCategoryId: 17)
INSERT INTO `books` VALUES ('9789864344529', 'C Traps and Pitfalls中文版', 'Andrew Koenig', 18, '博碩', 22, 'C Traps and Pitfalls中文版.jpg', 7, 17, 380, 5);
INSERT INTO `books` VALUES ('9789862766361', 'C++ Primer Plus中文版', 'Stephen Prata', 17, '碁峰', 32, 'C++ Primer Plus中文版.jpg', 7, 17, 780, 7.9);
# Objective-C (thirdCategoryId: 18)
INSERT INTO `books` VALUES ('9787121237157', 'Objective-C程序設計（第6版）', '(美)寇肯', 19, '電子工業出版社', 18, 'Objective-C程序設計（第6版）.jpg', 7, 18, 534, 10);
# ASP.NET (thirdCategoryId: 19)
INSERT INTO `books` VALUES ('9789865026868', '跟著實務學習ASP.NET MVC 5.x-打下前進ASP.NET Core的基礎', '蔡文龍, 蔡捷雲, 歐志信, 曾芷琳', 17, '碁峰', 33, '跟著實務學習ASP.NET MVC 5.x-打下前進ASP.NET Core的基礎.jpg', 7, 19, 550, 7.9);
# 手機 / 平板程式開發 (thirdCategoryId: 20)
INSERT INTO `books` VALUES ('9789864345786', 'Android十全大補：從Kotlin、MVVM到測試的全方面介紹', '林俊廷', 18, '博碩', 32, 'Android十全大補：從Kotlin、MVVM到測試的全方面介紹.jpg', 7, 20, 520, 5);
INSERT INTO `books` VALUES ('9786263333741', '快速精通iOS-16程式設計：從零開始活用Swift與SwiftUI開發技巧', 'Simon Ng', 18, '博碩', 33, '快速精通iOS-16程式設計：從零開始活用Swift與SwiftUI開發技巧.jpg', 7, 20, 760, 7.9);
# 資料結構 / 演算法 (thirdCategoryId: 21)
INSERT INTO `books` VALUES ('9786263241749', '演算法學習手冊｜寫出更有效率的程式', 'George T. Heineman', 20, '歐萊禮', 35, '演算法學習手冊｜寫出更有效率的程式.jpg', 7, 21, 580, 7.9);
-------------------------------

## 資料庫 (secondCategoryId: 8)
-------------------------------
# Oracle (thirdCategoryId: 22)
INSERT INTO `books` VALUES ('9789865029098', 'Oracle資料庫SQL學習經典-融入OCA-DBA國際認證', '辜輝趂', 17, '碁峰', 28, 'Oracle資料庫SQL學習經典-融入OCA-DBA國際認證.jpg', 8, 22, 540, 7.9);
# SQL Server (thirdCategoryId: 23)
INSERT INTO `books` VALUES ('9789865023065', '優化-SQL：語法與資料庫的最佳化應用', '羅炳森, 黃超, 鐘僥', 17, '碁峰', 38, '優化-SQL：語法與資料庫的最佳化應用.jpg', 8, 23, 450, 7.9);
# MicrosoftAccess (thirdCategoryId: 24)
INSERT INTO `books` VALUES ('9786263243941', 'Access資料庫系統概論與實務(適用Microsoft 365、ACCESS 20212019)', '王仲麒', 17, '碁峰', 19, 'Access資料庫系統概論與實務(適用Microsoft 365、ACCESS 20212019).jpg', 8, 24, 580, 7.9);
-------------------------------

## 影像編修繪圖 (secondCategoryId: 9)
-------------------------------
# Photoshop (thirdCategoryId: 25)
INSERT INTO `books` VALUES ('9789864345595', 'PhotoShop影像處理設計', '鄭苑鳳', 17, '博碩', 46, 'PhotoShop影像處理設計.jpg', 9, 25, 550, 9);
# Illustrator (thirdCategoryId: 26)
INSERT INTO `books` VALUES ('9789864345588', 'Illustrator向量圖形設計', '鄭苑鳳', 17, '博碩', 42, 'Illustrator向量圖形設計.jpg', 9, 26, 550, 9);
# CG電繪 / Painter (thirdCategoryId: 27)
INSERT INTO `books` VALUES ('9786267062272', '背景の描繪方法：基礎知識到實際運用的技巧', '高原さと', 21, '北星', 85, '背景の描繪方法：基礎知識到實際運用的技巧.jpg', 9, 27, 380, 9.5);
# 排版工具 / PDF (thirdCategoryId: 28)
-------------------------------

## 作業系統 (secondCategoryId: 10)
-------------------------------
# Windows (thirdCategoryId: 29)
INSERT INTO `books` VALUES ('9789865026677', 'PowerShell流程自動化攻略', 'Adam Bertram', 17, '碁峰', 35, 'PowerShell流程自動化攻略.jpg', 10, 29, 500, 9);
# Linux (thirdCategoryId: 30)
INSERT INTO `books` VALUES ('9786263334120', '邁向Linux工程師之路：Superuser一定要懂的技術與運用 (第三版)', 'Brian Ward', 18, '博碩', 30, '邁向Linux工程師之路：Superuser一定要懂的技術與運用 (第三版).jpg', 10, 30, 780, 9);
-------------------------------

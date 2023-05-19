-- ----------------------------
-- Table structure for firstCategory
-- ----------------------------
CREATE TABLE `firstCategory`  (
  `firstCategoryId` int NOT NULL AUTO_INCREMENT,
  `firstCategoryName` varchar(20)  NOT NULL,
  PRIMARY KEY (`firstCategoryId`)
)
-- ----------------------------
-- Records of firstctgy
-- ----------------------------
INSERT INTO `firstCategory`(firstCategoryName) VALUES ('人文社科');
INSERT INTO `firstCategory`(firstCategoryName) VALUES ('心理勵志');
INSERT INTO `firstCategory`(firstCategoryName) VALUES ('電腦資訊');


-- ----------------------------
-- Table structure for secondCategory
-- ----------------------------
CREATE TABLE `secondCategory`  (
  `secondCategoryId` int NOT NULL AUTO_INCREMENT,
  `secondCategoryName` varchar(20)  NOT NULL,
  `firstCategoryId` int NOT NULL,
  PRIMARY KEY (`secondCategoryId`),
  CONSTRAINT `fk_firstCategoryId` FOREIGN KEY (`firstCategoryId`) REFERENCES `firstCategory` (`firstCategoryId`) 
)  
-- ----------------------------
-- Records of secondCategory
-- ----------------------------
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('傳記 / 自傳', 1);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('哲學', 1);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('勵志故事 / 散文', 2);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('個人成長', 2);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('人際關係', 2);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('網頁開發設計', 3);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('程式設計', 3);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('資料庫', 3);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('影像編修繪圖', 3);
INSERT INTO `SecondCategory`(secondCategoryName,firstCategoryId) VALUES ('作業系統', 3);


-- ----------------------------
-- Table structure for thirdCategory
-- ----------------------------
CREATE TABLE `thirdCategory`  (
  `thirdCategoryId` int NOT NULL AUTO_INCREMENT,
  `thirdCategoryName` varchar(20) NOT NULL,
	`thirdCategoryPicName` varchar(255) NOT NULL,
  `secondCategoryId` int NOT NULL,
  PRIMARY KEY (`thirdCategoryId`),
  CONSTRAINT `fk_secondCategoryId` FOREIGN KEY (`secondCategoryId`) REFERENCES `secondCategory` (`secondCategoryId`) 
)  
-- ----------------------------
-- Records of thirdCategory
-- ----------------------------
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('領袖 / 領導人物', 1, '領袖.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('台灣人物', 1, '台灣.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('傳奇 / 逸聞', 1, '傳奇.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('西方哲學', 2, '西方哲學.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('東方哲學', 2, '東方哲學.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('真實人生故事', 3, '真實人生故事.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('勵志小品文', 3, '勵志小品文.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('心靈成長故事', 3, '心靈成長故事.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('心靈成長', 4, '心靈成長.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('人生規劃  /  自我改變', 4, '人生規劃.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('人脈  /  處世', 5, '人脈.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('說話  /  溝通', 5, '溝通.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('讀心 / 識人', 5, '識人.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('網頁設計概論', 6, '網頁設計概論.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('JavaScript', 6, 'JavaScript.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('HTML / CSS', 6, 'HTML.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('C / C++', 7, 'C.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Objective-C', 7, 'Objective-C.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('ASP.NET', 7, 'ASP.NET.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('手機 / 平板程式開發', 7, '移動端程式開發.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('資料結構 / 演算法', 7, '演算法.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Oracle', 8, 'Oracle.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('SQL Server', 8, 'SQL.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('MicrosoftAccess', 8, 'MicrosoftAccess.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Photoshop', 9, 'Photoshop.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Illustrator', 9, 'Illustrator.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('CG電繪 / Painter', 9, 'CG.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('排版工具 / PDF', 9, 'PDF.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Windows', 10, 'Windows.png');
INSERT INTO `thirdCategory`(thirdCategoryName,secondCategoryId, thirdCategoryPicName) VALUES ('Linux', 10, 'Linux.png');

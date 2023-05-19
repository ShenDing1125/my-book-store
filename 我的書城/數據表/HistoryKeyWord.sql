-- ----------------------------
-- Table structure for historyKeyWord
-- ----------------------------
CREATE TABLE `historyKeyWord`  (
  `historyKeyWordId` int NOT NULL AUTO_INCREMENT,
  `historyKeyWord` varchar(30)  NOT NULL,
  `clickCount` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`historyKeyWordId`)
) 

-- ----------------------------
-- Records of historyKeyWord
-- ----------------------------
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('回憶', 33);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('鬼谷子', 25);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('男孩、鼴鼠、狐狸與馬', 50);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('逆思維', 36);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('世界很煩', 25);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('vue', 66);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('演算法', 72);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('sql', 32);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('ps', 70);
INSERT INTO `historyKeyWord`(historyKeyWord, clickCount) VALUES ('linux', 42);

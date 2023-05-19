-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
CREATE TABLE `userInfo`  (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(30)  NOT NULL,
  `password` varchar(20)  NOT NULL,
  `address` varchar(50)  NULL DEFAULT NULL,
  `valid` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`userId`)
) 

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'admin', '123', 'Taiwan', 1);

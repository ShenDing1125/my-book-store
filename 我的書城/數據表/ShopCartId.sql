-- ----------------------------
-- Table structure for shopCart
-- ----------------------------
CREATE TABLE `shopCart`  (
  `shopCartId` int NOT NULL AUTO_INCREMENT,
  `bookISBN` varchar(20)  NOT NULL,
  `bookName` varchar(255)  NOT NULL,
  `bookPicName` varchar(255)  NOT NULL,
  `originalPrice` double(10, 2)  NOT NULL,
	`discount` double(5, 2) NULL DEFAULT NULL,
  `userId` int NOT NULL,
  `purchaseNum` int NULL DEFAULT 0,
	`purchaseQuantity` int NULL DEFAULT 1,
  PRIMARY KEY (`shopCartId`)
)  

-- ----------------------------
-- Simulated Data
-- ----------------------------
INSERT INTO `shopCart` (bookISBN,bookName,bookPicName,originalPrice,discount,userId) VALUES ('9789865253271','梅克爾傳：一場卓越的史詩之旅','梅克爾傳：一場卓越的史詩之旅.jpg',111,1,1)

INSERT INTO `shopCart` (bookISBN,bookName,bookPicName,originalPrice,discount,userId) VALUES ('9789869665384','馬偕傳：攏是為主基督','馬偕傳：攏是為主基督.jpg',450,1,1)

DELETE FROM `shopCart` WHERE bookISBN = '9789869665384'

ALTER TABLE shopCart AUTO_INCREMENT = 1;

UPDATE `shopCart` SET purchaseQuantity = 2 WHERE bookISBN = '9789861338644'

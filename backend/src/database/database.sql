-- ___________________________________ CREATE TABLES ___________________________________ 
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` BOOL NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `phone`;
CREATE TABLE `phone` (
  `id_phone` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(50) NOT NULL,
  `creation_date` DATE NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `thumbnail_1` VARCHAR(255) NULL,
  `thumbnail_2` VARCHAR(255) NULL,
  `thumbnail_3` VARCHAR(255) NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `feature`;
CREATE TABLE `feature` (
  `id_feature` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(50) NOT NULL,
	`color` VARCHAR(20) NULL,
  `has_charger` BOOL NOT NULL,
  `network` VARCHAR(20) NULL,
  `OS` VARCHAR(50) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `RAM` INT NOT NULL,
  `screen` DECIMAL(10,2) NULL,
  `state` VARCHAR(50) NOT NULL,
  `storage` INT NOT NULL,
  `phone_id` INT NOT NULL,
  CONSTRAINT fk_feature_phone FOREIGN KEY (`phone_id`) 
    REFERENCES `phone`(`id_phone`)
    ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ___________________________________ POPULATE TABLES ___________________________________ 
-- Create user
INSERT INTO `user` (`email`, `password`, `is_admin`) 
VALUES 
('admin@gmail.com', '$argon2id$v=19$m=19893.36898592844,t=2,p=1$mkm5zcvh7mTtDGu0UsOZxw$bcLPeyJqaJGN4mX2aILxsnbeCszJrBJUJDjEXewSrE8', 1),
('user@gmail.com', '$argon2id$v=19$m=19893.36898592844,t=2,p=1$+RUYi4CW31MZnxxRBO9Alw$u0TJVC8gPPUeb/bj/1sjeexnbnIBYP7aLk2ydKm2odU', 0);
-- ('admin@gmail.com', 'admin', 1),
-- ('user@gmail.com', 'user', 0);

-- Create phone
INSERT INTO `phone` (`brand`, `creation_date`, `model`, `thumbnail_1`, `thumbnail_2`, `thumbnail_3`) 
VALUES 
('Apple', '2023-06-26', 'iPhone 11', 'iphone-11.jpg', '', ''),
('Samsung', '2023-06-28', 'Galaxy S10', 'iphone-13.jpg', '', ''),
('Apple', '2023-06-28', 'iPhone 14', 'iphone-14.jpg', '', ''),
('Google', '2023-06-28', 'pixel 6', 'google-pixel-6a.jpg', '', ''),
('Nokia', '2023-02-08', '3310', 'iphone-13.jpg', '', ''),
('Huawei', '2023-05-24', 'Huawei Mate 50 Pro', '/huawei-mate-50p.jpg', '', ''),
('Xiaomi', '2023-05-24', 'Redmi Note 10 Pro', 'redmi-note-7.webp', '', ''),
('Oppo', '2023-07-12', 'Reno 7', 'oppo-reno-7.jpg', '', ''),
('Xiaomi', '2023-01-24','Redmi Note 11', 'redmi-note-11.jpg', '', ''),
('Apple', '2023-07-01', 'Iphone 13', 'iphone-13.jpg', '', '');

-- Create feature
INSERT INTO `feature` (`category`, `color`, `has_charger`, `network`, `OS`, `price`, `RAM`, `screen`, `state`, `storage`, `phone_id`) 
VALUES 
('5-Premium', 'argent', 1, '4G', 'iOS', 189.19, 2, 5.8, 'RECONDITIONNE', 32, 1),
('5-Premium', 'noir', 0, '4G', 'Android', 209.19, 6, 6.1, 'RECONDITIONNE', 64, 2),
('5-Premium', 'argent', 1, '4G', 'iOS', 656.19, 8, 5.8, 'RECONDITIONNABLE', 128, 3),
('1-HC', 'argent', 0, '4G', 'iOS', 89.25, 6, 5.8, 'BLOQUE', 16, 4),
('2-B', 'noir', 1, '4G', 'iOS', 169.78, 4, 5.8, 'REPARABLE', 32, 5),
('2-B', 'argent', 0, '4G', 'iOS', 124, 6, 5.8, 'DEEE', 64, 6),
('1-HC','noir', 1, '4G', 'iOS', 109, 8, 5.8, 'BLOQUE', 64,  7),
('1-HC', 'argent', 0, '4G', 'iOS', 89.88, 4, 5.8, 'DEEE', 32, 8),
('1-HC', 'noir', 1, '4G', 'android', 77, 4, 5.8,'DEEE', 32, 9),
('1-HC', 'argent', 0, '4G', 'iOS', 124.94, 6, 5.8, 'DEEE', 32, 10)
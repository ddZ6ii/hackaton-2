-- ___________________________________ CREATE TABLES ___________________________________ 
DROP TABLE IF EXISTS `center`;
CREATE TABLE `center` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(100) NOT NULL,
  `region` VARCHAR(100) NOT NULL,
  `ZIP` INT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `is_admin` BOOL NOT NULL,
	`center_id` INT NOT NULL,
  CONSTRAINT fk_user_center FOREIGN KEY (`center_id`) REFERENCES `center`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `phone`;
CREATE TABLE `phone` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `thumbnail_1` VARCHAR(100) NULL,
  `thumbnail_2` VARCHAR(100) NULL,
  `thumbnail_3` VARCHAR(100) NULL,
  `creation_date` DATE NOT NULL,
	`center_id` INT NOT NULL,
  CONSTRAINT fk_phone_center FOREIGN KEY (`center_id`) REFERENCES `center`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `feature`;
CREATE TABLE `feature` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `has_charger` BOOL NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `OS` VARCHAR(50) NOT NULL,
  `RAM` INT NOT NULL,
  `storage` INT NOT NULL,
	`color` VARCHAR(20) NOT NULL,
  `screen` DECIMAL(10,2) NOT NULL,
  `network` VARCHAR(20) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `phone_feature`;
CREATE TABLE `phone_feature` (
  `phone_id` INT NOT NULL,
  CONSTRAINT fk_phone_feature FOREIGN KEY (`phone_id`) REFERENCES `phone`(`id`),
	`feature_id` INT NULL,
  CONSTRAINT fk_feature_phone FOREIGN KEY (`feature_id`) REFERENCES `feature`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ___________________________________ POPULATE TABLES ___________________________________ 
-- Create center
INSERT INTO `center` (`city`, `region`, `ZIP`) 
VALUES 
('Grenoble', 'Auvergne-Rhone-Alpes', 38000),
('Lyon', 'Auvergne-Rhone-Alpes', 69008),
('Paris', 'Ile-de-France', 75013),
('Strasbourg', 'Grand Est', 67000),
('Bordeaux', 'Nouvelle-Aquitaine', 33800),
('Marseille', "Provence-Alpes-Cote d'Azur", 13001);

-- Create user
INSERT INTO `user` (`email`, `password`, `is_admin`, `center_id`) 
VALUES 
('admin@gmail.com', 'admin', true, 3),
('user@gmail.com', 'user', false, 1);

-- Create phone
INSERT INTO `phone` (`brand`, `model`, `category`, `price`, `thumbnail_1`, `thumbnail_2`, `thumbnail_3`, `creation_date`, `center_id`) 
VALUES 
('Apple', 'iPhone 11', '5-Premium', 189.19, './assets/image/iphone-11.jpg', '', '', '2023-06-26', 1),
('Samsung', 'Galaxy S10', '5-Premium', 209.19, './assets/image/iphone-13.jpg', '', '', '2023-06-28', 3),
('Apple', 'iPhone 14', '5-Premium', 656.19, './assets/image/iphone-14.jpg', '', '', '2023-06-28', 2),
('Google', 'pixel 6', '3-B', 89.25, './assets/image/google-pixel-6a.jpg', '', '', '2023-06-28', 4),
('Nokia', '3310', '2-C', 42, './assets/image/iphone-13.jpg', '', '', '2023-02-08', 3),
('Huawei', 'Huawei Mate 50 Pro', '1-HC', 0, './assets/image/huawei-mate-50p.jpg', '', '', '2023-05-24', 1),
('Xiaomi', 'Redmi Note 10 Pro', '4-A', 169.78, './assets/image/redmi-note-7.webp', '', '', '2023-05-24', 6),
('Oppo', 'Reno 7', '2-B', 124, './assets/image/oppo-reno-7.jpg', '', '', '2023-07-12', 1),
('Xiaomi', 'Redmi Note 11', '1-HC', 0, './assets/image/redmi-note-11.jpg', '', '', '2023-01-24', 5),
('Apple', 'Iphone 13', '1-HC', 0, './assets/image/iphone-13.jpg', '', '', '2023-07-01', 1);

-- Create feature
INSERT INTO `feature` (`has_charger`, `state`, `OS`, `RAM`, `storage`, `color`, `screen`, `network`) 
VALUES 
(1, 'RECONDITIONNE', 'iOS', 2, 32, 'argent', '5.8', '4G'),
(0, 'RECONDITIONNE', 'Android', 8, 64, 'noir', '6.1', '4G'),
(1, 'RECONDITIONNABLE', 'iOS', 2, 32, 'argent', '5.8', '4G'),
(0, 'BLOQUE', 'iOS', 2, 32, 'argent', '5.8', '4G'),
(1, 'REPARABLE', 'iOS', 2, 32, 'noir', '5.8', '4G'),
(0, 'DEEE', 'iOS', 2, 32, 'argent', '5.8', '4G'),
(1, 'BLOQUE', 'iOS', 2, 32, 'noir', '5.8', '4G'),
(0, 'DEEE', 'iOS', 2, 32, 'argent', '5.8', '4G'),
(1, 'DEEE', 'android', 2, 32, 'noir', '5.8', '4G'),
(0, 'DEEE', 'iOS', 2, 32, 'argent', '5.8', '4G');

-- Create phone_feature
INSERT INTO `phone_feature` (`phone_id`, `feature_id`) 
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
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

-- Create user
INSERT INTO `user` (`email`, `password`, `is_admin`) 
VALUES 
('admin@gmail.com', 'admin', 'true'),
('user@gmail.com', 'user', 'false');

-- Create center
INSERT INTO `center` (`city`, `region`, `ZIP`) 
VALUES 
('Grenoble', 'Auvergne-Rhone-Alpes', 38000),
('Lyon', 'Auvergne-Rhone-Alpes', 69008),
('Paris', 'Ile-de-France', 75013),
('Strasbourg', 'Grand Est', 67000),
('Bordeaux', 'Nouvelle-Aquitaine', 33800),
('Marseille', "Provence-Alpes-Cote d'Azur", 13001);

-- Create phone
INSERT INTO `phone` (`brand`, `model`, `category`, `price`, `thumbnail_1`, `thumbnail_2`, `thumbnail_3`, `creation_date`, `center_id`) 
VALUES 
('iPhone', 'iPhone10', '5-Premium', 189.19, 'de0aedaf-9ff1-4622-8176-715b8b3f1a5b-iPhone10.jpg', '', '', '')

-- Create phone_feature


-- Create feature
INSERT INTO `feature` (`has_charger`, `state`, `OS`, `RAM`, `storage`, `color`, `screen`, `network`) 
VALUES 
('', '', '', '', '', '', '', '')

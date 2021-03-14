-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema HotdogCart
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `HotdogCart` ;

-- -----------------------------------------------------
-- Schema HotdogCart
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HotdogCart` DEFAULT CHARACTER SET utf8 ;
USE `HotdogCart` ;

-- -----------------------------------------------------
-- Table `HotdogCart`.`Logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Logs` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Logs` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `log_line` VARCHAR(500) NULL COMMENT 'log lines',
  `log_timestamp` DATETIME NULL COMMENT 'timestamp',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `HotdogCart`.`Location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Location` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Location` (
  `location_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` VARCHAR(45) NULL COMMENT 'location name',
  `address` VARCHAR(45) NOT NULL COMMENT 'location address',
  `phone` VARCHAR(12) NULL COMMENT 'location phone',
  `latitude` DECIMAL(8,5) NOT NULL COMMENT 'location latitude',
  `longitude` DECIMAL(8,5) NOT NULL COMMENT 'location longitude',
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Person_Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Person_Role` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Person_Role` (
  `person_role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NULL,
  PRIMARY KEY (`person_role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Person`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Person` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Person` (
  `person_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `first_name` VARCHAR(45) NULL COMMENT 'customer first name',
  `last_name` VARCHAR(45) NULL COMMENT 'customer last name',
  `address` VARCHAR(100) NULL COMMENT 'customer address',
  `email` VARCHAR(45) NULL COMMENT 'customer email',
  `phone` VARCHAR(12) NULL COMMENT 'customer phone',
  `location_id` INT NULL,
  `role_id` INT NULL,
  `hashed_password` VARCHAR(45) NULL,
  PRIMARY KEY (`person_id`),
  INDEX `peron_role_id_idx` (`role_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `fk_person_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `HotdogCart`.`Location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_person_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `HotdogCart`.`Person_Role` (`person_role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Hotdog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Hotdog` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Hotdog` (
  `hotdog_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `hotdog_name` VARCHAR(45) NULL COMMENT 'hotdog name',
  `hotdog_image` VARCHAR(45) NULL COMMENT 'link to image',
  `hotdog_price` DECIMAL(8,2) NULL COMMENT 'price',
  PRIMARY KEY (`hotdog_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Customer_Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Customer_Order` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Customer_Order` (
  `order_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `date` DATETIME NULL COMMENT 'order date',
  `location_id` INT NOT NULL COMMENT 'foreign key',
  `person_id` INT NOT NULL COMMENT 'foreign key',
  `complete` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`),
  INDEX `fk_Order_Location1_idx` (`location_id` ASC) VISIBLE,
  INDEX `person_id_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `HotdogCart`.`Location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_person`
    FOREIGN KEY (`person_id`)
    REFERENCES `HotdogCart`.`Person` (`person_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Order_Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Order_Items` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Order_Items` (
  `order_items_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `quantity` INT NULL COMMENT 'order quantity',
  `order_id` INT NULL COMMENT 'foreign key',
  `hotdog_id` INT NULL COMMENT 'foreign key',
  PRIMARY KEY (`order_items_id`),
  INDEX `fk_Order Item_Order1_idx` (`order_id` ASC) VISIBLE,
  INDEX `fk_Order Items_Hotdog1_idx` (`hotdog_id` ASC) VISIBLE,
  CONSTRAINT `fk_Order Item_Order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `HotdogCart`.`Customer_Order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order Items_Hotdog1`
    FOREIGN KEY (`hotdog_id`)
    REFERENCES `HotdogCart`.`Hotdog` (`hotdog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Permission` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Permission` (
  `permission_id` INT NOT NULL AUTO_INCREMENT,
  `permission_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`permission_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Role_Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Role_Permission` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Role_Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NULL,
  `permission_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `role_id_idx` (`role_id` ASC) VISIBLE,
  INDEX `permission_id_idx` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `fk_role_perm_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `HotdogCart`.`Person_Role` (`person_role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_roleperm_permission_id`
    FOREIGN KEY (`permission_id`)
    REFERENCES `HotdogCart`.`Permission` (`permission_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Disabled_Menu_Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Disabled_Menu_Items` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Disabled_Menu_Items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person_id` INT NOT NULL,
  `hotdog_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `person_id_idx` (`person_id` ASC) VISIBLE,
  INDEX `hotdog_id_idx` (`hotdog_id` ASC) VISIBLE,
  CONSTRAINT `fk_vendor_disabled`
    FOREIGN KEY (`person_id`)    
    REFERENCES `HotdogCart`.`Person` (`person_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_disabled_hotdog`
    FOREIGN KEY (`hotdog_id`)
    REFERENCES `HotdogCart`.`Hotdog` (`hotdog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `HotdogCart`.`Location`(`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    
ENGINE = InnoDB;


# Hotdog table
INSERT INTO Hotdog VALUES (null, "Classic", "Classic.png", 1.50);
INSERT INTO Hotdog VALUES (null, "Seattle dog", "Seattle_dog.png", 2.00);
INSERT INTO Hotdog VALUES (null, "Frankfurter", "Frankfurter.png", 3.00);
INSERT INTO Hotdog VALUES (null, "Chicago dog", "Chicago_dog.png", 3.00);
INSERT INTO Hotdog VALUES (null, "Corn dog", "Corn_dog.png", 1.50);
INSERT INTO Hotdog VALUES (null, "Bratwurst", "Bratwurst.png", 3.00);
INSERT INTO Hotdog VALUES (null, "Montreal dog", "Montreal_dog.png", 4.00);


# Location table
INSERT INTO Location VALUES (NULL, "Capitol Hill", "202 E Broadway, Seattle", "206-606-2346", 47.62020, -122.32024);
INSERT INTO Location VALUES (NULL, "Rainier Brewery", "1119 Airport Way S, Seattle", "206-943-8477", 47.59324, -122.32473);
INSERT INTO Location VALUES (NULL, "Ballard HotDogs", "359 NW Market St, Seattle", "206-606-2346", 47.66824, -122.36173);
INSERT INTO Location VALUES (NULL, "NSC", "9600 College Way North, Seattle", "206-934-3600", 47.69884, -122.33272);
INSERT INTO Location VALUES (NULL, "Pioneer Square", "1 Pioneer Square, Seattle", "206-617-4310", 47.59953, -122.33427);

# Person_Role table
INSERT INTO Person_Role VALUES (NULL, "Customer");
INSERT INTO Person_Role VALUES (NULL, "Vendor");
INSERT INTO Person_Role VALUES (NULL, "Admin");

# Person table
INSERT INTO Person VALUES (NULL, "John", "Pfiser", "321 36th Pl NE, Seattle", "johnp@comcast.net", "425-733-9024", "5", 1, "password");
INSERT INTO Person VALUES (NULL, "Michael", "Ashford", "10312 Aurora Ave N, Seattle", "mash@oreilly.com", "206-321-7656", "2", 2, "password");
INSERT INTO Person VALUES (NULL, "Helen", "Hunt", "1301 4th Ave, Seattle", "hunt@yahoo.com", "509-120-2012", "1", 1, "password");
INSERT INTO Person VALUES (NULL, "Aaron", "Schwartz", "1498 253rd St, Burien", "AShcwartz@gmail.com", "253-034-1414", "5", 1, "password");
INSERT INTO Person VALUES (NULL, "Sam", "Zimbabwe", "1104 15th Ave N, Shoreline", "SZ@wsdot.wa.gov", "206-457-4000", "3", 1, "password");
INSERT INTO Person VALUES (NULL, "Crystal", "Broderick", "208 Main St, Bellevue", "broderick@hotmail.com", "425-900-2348", "4", 3, "password");
INSERT INTO Person VALUES (NULL, "Marty", "Sheen", "2223 6th Ave W, Seattle", "msheen@gmailcom", "206-399-7602", "1", 1, "password");
INSERT INTO Person VALUES (NULL, "Lesly", "Blunt", "11343 256th Ave Sw, Kent", "lblunt@outlook.com", "253-113-1003", "4", 2, "password");
INSERT INTO Person VALUES (NULL, "Nathaniel", "Piletski", "1601 5th Ave N Seattle", "npiletski@mail.com", "206-885-9008", "1", 1, "password");
INSERT INTO Person VALUES (NULL, "Cathy", "Noel", "11061 248th Ave NE, Redmond", "cnoel@gmail.com", "425-733-9024", "5", 3, "password");
INSERT INTO Person VALUES (NULL, "my", "admin", "11061 248th Ave NE, Redmond", "dogeatadmin@gmail.com", "425-733-9024", "3", 3, "password");


# Permission table
INSERT INTO Permission VALUES (NULL, "all access");

# Role_Permission table
INSERT INTO Role_Permission VALUES (NULL, 1, 1);
INSERT INTO Role_Permission VALUES (NULL, 2, 1);
INSERT INTO Role_Permission VALUES (NULL, 3, 1);


# Order table
INSERT INTO `Customer_Order` VALUES (NULL, "2020-12-31 23:59:00", 5, 3, TRUE);
INSERT INTO `Customer_Order` VALUES (NULL, "2021-01-11 19:03:01", 2, 9, TRUE);
INSERT INTO `Customer_Order` VALUES (NULL, "2021-02-13 12:23:45", 1, 4, FALSE);

# Order_Items table
INSERT INTO Order_Items VALUES (NULL, 2, 1, 3);
INSERT INTO Order_Items VALUES (NULL, 2, 1, 3);
INSERT INTO Order_Items VALUES (NULL, 1, 2, 5);
INSERT INTO Order_Items VALUES (NULL, 1, 3, 1);

# Disabled_Menu_Items table
INSERT INTO Disabled_Menu_Items VALUES (NULL,2,2,1);

ALTER TABLE hotdog ADD COLUMN deleted BOOL DEFAULT false;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Script generated by MySQL Workbench
-- Wed Feb 10 21:41:31 2021
-- Model: New Model    Version: 1.0
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
-- Table `HotdogCart`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Role` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Customer` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `role_id` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL COMMENT 'customer first name',
  `last_name` VARCHAR(45) NOT NULL COMMENT 'customer last name',
  `address` VARCHAR(100) NULL COMMENT 'customer address',
  `email` VARCHAR(45) NULL COMMENT 'customer email',
  `phone` VARCHAR(10) NOT NULL COMMENT 'customer phone',
  PRIMARY KEY (`customer_id`, `role_id`),
  INDEX `fk_Customer_Role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_Customer_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `HotdogCart`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Location Menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Location Menu` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Location Menu` (
  `location_menu_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  PRIMARY KEY (`location_menu_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Location` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Location` (
  `location_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` VARCHAR(45) NOT NULL COMMENT 'location name',
  `address` VARCHAR(45) NULL COMMENT 'location address',
  `phone` VARCHAR(10) NOT NULL COMMENT 'location phone',
  `location_menu_id` INT NOT NULL COMMENT 'foreign key',
  PRIMARY KEY (`location_id`, `location_menu_id`),
  INDEX `fk_Location_Location Menu1_idx` (`location_menu_id` ASC) VISIBLE,
  CONSTRAINT `fk_Location_Location Menu1`
    FOREIGN KEY (`location_menu_id`)
    REFERENCES `HotdogCart`.`Location Menu` (`location_menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Hotdog`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Hotdog` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Hotdog` (
  `hotdog_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `hotdog_name` VARCHAR(45) NOT NULL COMMENT 'hotdog name',
  `hotdog_image` VARCHAR(45) NOT NULL COMMENT 'link to image',
  PRIMARY KEY (`hotdog_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Order` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Order` (
  `order_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `date` DATETIME NOT NULL COMMENT 'order date',
  `location_id` INT NOT NULL COMMENT 'foreign key',
  `customer_id` INT NOT NULL COMMENT 'foreign key',
  PRIMARY KEY (`order_id`, `location_id`, `customer_id`),
  INDEX `fk_Order_Location1_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_Order_Customer1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Order_Location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `HotdogCart`.`Location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_Customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `HotdogCart`.`Customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Order Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Order Items` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Order Items` (
  `order_items_id` INT NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `quantity` INT NOT NULL COMMENT 'order quantity',
  `order_id` INT NOT NULL COMMENT 'foreign key',
  `location_id` INT NOT NULL COMMENT 'foreign key',
  `hotdog_id` INT NOT NULL COMMENT 'foreign key',
  PRIMARY KEY (`order_items_id`, `order_id`, `location_id`, `hotdog_id`),
  INDEX `fk_Order Item_Order1_idx` (`order_id` ASC, `location_id` ASC) VISIBLE,
  INDEX `fk_Order Items_Hotdog1_idx` (`hotdog_id` ASC) VISIBLE,
  CONSTRAINT `fk_Order Item_Order1`
    FOREIGN KEY (`order_id` , `location_id`)
    REFERENCES `HotdogCart`.`Order` (`order_id` , `location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order Items_Hotdog1`
    FOREIGN KEY (`hotdog_id`)
    REFERENCES `HotdogCart`.`Hotdog` (`hotdog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HotdogCart`.`Menu Items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HotdogCart`.`Menu Items` ;

CREATE TABLE IF NOT EXISTS `HotdogCart`.`Menu Items` (
  `hotdog_id` INT NOT NULL COMMENT 'foreign key',
  `location_menu_id` INT NOT NULL COMMENT 'foreign key',
  PRIMARY KEY (`hotdog_id`, `location_menu_id`),
  INDEX `fk_Hotdog_has_Location Menu_Location Menu1_idx` (`location_menu_id` ASC) VISIBLE,
  INDEX `fk_Hotdog_has_Location Menu_Hotdog1_idx` (`hotdog_id` ASC) VISIBLE,
  CONSTRAINT `fk_Hotdog_has_Location Menu_Hotdog1`
    FOREIGN KEY (`hotdog_id`)
    REFERENCES `HotdogCart`.`Hotdog` (`hotdog_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Hotdog_has_Location Menu_Location Menu1`
    FOREIGN KEY (`location_menu_id`)
    REFERENCES `HotdogCart`.`Location Menu` (`location_menu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
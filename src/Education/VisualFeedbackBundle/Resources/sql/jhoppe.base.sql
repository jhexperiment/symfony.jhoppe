SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `education_visualfeedback` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Lesson`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Lesson` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NULL ,
  `type` VARCHAR(128) NULL ,
  `lesson_plan` VARCHAR(128) NULL ,
  `subject` VARCHAR(128) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`ImageFolder`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ImageFolder` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NULL ,
  `root_path` VARCHAR(1024) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Image`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Image` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `label` VARCHAR(128) NULL ,
  `filename` VARCHAR(256) NULL COMMENT 'Name' ,
  `ImageFolder_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Image_ImageFolder1` (`ImageFolder_id` ASC) ,
  CONSTRAINT `fk_Images_ImageFolder1`
    FOREIGN KEY (`ImageFolder_id` )
    REFERENCES `education_visualfeedback`.`ImageFolder` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`ExpressiveVocabQuestion`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ExpressiveVocabQuestion` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `order_index` INT NULL ,
  `name` VARCHAR(128) NULL COMMENT 'Name' ,
  `text` VARCHAR(128) NULL COMMENT 'Display Text' ,
  `Image_id` INT NOT NULL ,
  `Lesson_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ImageQuestion_Image1` (`Image_id` ASC) ,
  INDEX `fk_ExpressiveVocabQuestion_Lesson1` (`Lesson_id` ASC) ,
  CONSTRAINT `fk_ImageQuestion_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ExpressiveVocabQuestion_Lesson1`
    FOREIGN KEY (`Lesson_id` )
    REFERENCES `education_visualfeedback`.`Lesson` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Pupil`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Pupil` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `first_name` VARCHAR(128) NOT NULL ,
  `middle_name` VARCHAR(128) NULL ,
  `last_name` VARCHAR(128) NOT NULL ,
  `Image_id` INT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Pupil_Image1` (`Image_id` ASC) ,
  CONSTRAINT `fk_Pupil_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Tutor`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Tutor` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `first_name` VARCHAR(128) NOT NULL ,
  `middle_name` VARCHAR(128) NULL ,
  `last_name` VARCHAR(128) NOT NULL ,
  `Image_id` INT NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Tutor_Image1` (`Image_id` ASC) ,
  CONSTRAINT `fk_Tutor_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`StatusCode`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`StatusCode` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NOT NULL ,
  `description` VARCHAR(1024) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`TutoringSession`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`TutoringSession` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `hash` VARCHAR(256) NOT NULL ,
  `display_content` VARCHAR(128) NOT NULL DEFAULT 'image' ,
  `Pupil_id` INT NOT NULL ,
  `Tutor_id` INT NOT NULL ,
  `Lesson_ImageQuestion_id` INT NOT NULL ,
  `StatusCode_id` INT NOT NULL DEFAULT 1 ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_TutoringSession_Pupil1` (`Pupil_id` ASC) ,
  INDEX `fk_TutoringSession_Tutor1` (`Tutor_id` ASC) ,
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC) ,
  INDEX `fk_TutoringSession_StatusCode1` (`StatusCode_id` ASC) ,
  CONSTRAINT `fk_TutoringSession_Pupil1`
    FOREIGN KEY (`Pupil_id` )
    REFERENCES `education_visualfeedback`.`Pupil` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TutoringSession_Tutor1`
    FOREIGN KEY (`Tutor_id` )
    REFERENCES `education_visualfeedback`.`Tutor` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TutoringSession_StatusCode1`
    FOREIGN KEY (`StatusCode_id` )
    REFERENCES `education_visualfeedback`.`StatusCode` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`PupilAnswer`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`PupilAnswer` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `image_answer` VARCHAR(45) NULL ,
  `text_answer` VARCHAR(45) NULL ,
  `timestamp` INT NOT NULL ,
  `TutoringSession_id` INT NOT NULL ,
  `Lesson_ImageQuestion_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_PupilAnswer_TutoringSession1` (`TutoringSession_id` ASC) ,
  CONSTRAINT `fk_PupilAnswer_TutoringSession1`
    FOREIGN KEY (`TutoringSession_id` )
    REFERENCES `education_visualfeedback`.`TutoringSession` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Setting`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Setting` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(256) NOT NULL ,
  `value` VARCHAR(1024) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Audio`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Audio` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `label` VARCHAR(128) NULL ,
  `filename` VARCHAR(256) NULL COMMENT 'Name' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`ReceptiveVocabQuestion`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ReceptiveVocabQuestion` (
  `id` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `Lesson_id` INT NOT NULL ,
  `Audio_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ReceptiveVocabQuestion_Lesson1` (`Lesson_id` ASC) ,
  INDEX `fk_ReceptiveVocabQuestion_Audio1` (`Audio_id` ASC) ,
  CONSTRAINT `fk_ReceptiveVocabQuestion_Lesson1`
    FOREIGN KEY (`Lesson_id` )
    REFERENCES `education_visualfeedback`.`Lesson` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ReceptiveVocabQuestion_Audio1`
    FOREIGN KEY (`Audio_id` )
    REFERENCES `education_visualfeedback`.`Audio` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`ReceptiveVocabImage`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ReceptiveVocabImage` (
  `id` INT NOT NULL ,
  `ReceptiveVocabQuestion_id` INT NOT NULL ,
  `Image_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ReceptiveVocabImage_ReceptiveVocabQuestion1` (`ReceptiveVocabQuestion_id` ASC) ,
  INDEX `fk_ReceptiveVocabImage_Image1` (`Image_id` ASC) ,
  CONSTRAINT `fk_ReceptiveVocabImage_ReceptiveVocabQuestion1`
    FOREIGN KEY (`ReceptiveVocabQuestion_id` )
    REFERENCES `education_visualfeedback`.`ReceptiveVocabQuestion` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ReceptiveVocabImage_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Placeholder table for view `education_visualfeedback`.`ImageView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `education_visualfeedback`.`ImageView` (`id` INT, `name` INT, `root_path` INT, `url` INT);

-- -----------------------------------------------------
-- Placeholder table for view `education_visualfeedback`.`ImageFolderView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `education_visualfeedback`.`ImageFolderView` (`id` INT, `name` INT, `root_path` INT, `url` INT);

-- -----------------------------------------------------
-- View `education_visualfeedback`.`ImageView`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_visualfeedback`.`ImageView`;
CREATE  OR REPLACE VIEW `education_visualfeedback`.`ImageView` AS
SELECT i.id AS id, i.filename AS name, 
        CONCAT(f.root_path, f.name, '/') AS root_path,
        REPLACE(root_path, '/web_root', '') AS url
FROM Image AS i
LEFT OUTER JOIN ImageFolder AS f ON (f.id = i.ImageFolder_id);

-- -----------------------------------------------------
-- View `education_visualfeedback`.`ImageFolderView`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_visualfeedback`.`ImageFolderView`;
CREATE  OR REPLACE VIEW `education_visualfeedback`.`ImageFolderView` AS
SELECT f.*, REPLACE(f.root_path, '/web_root', '') AS url
FROM ImageFolder aS f;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

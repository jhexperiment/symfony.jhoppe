SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `education_visualfeedback` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Class`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Class` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `name` VARCHAR(128) NULL COMMENT 'Name' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`LessonPlan`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`LessonPlan` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `name` VARCHAR(128) NULL COMMENT 'Name' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Lesson`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Lesson` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`ImageFolder`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ImageFolder` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NULL ,
  `rootPath` VARCHAR(1024) NULL ,
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
-- Table `education_visualfeedback`.`ImageQuestion`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`ImageQuestion` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `name` VARCHAR(128) NULL COMMENT 'Name' ,
  `text` VARCHAR(128) NULL COMMENT 'Display Text' ,
  `Image_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ImageQuestion_Image1` (`Image_id` ASC) ,
  CONSTRAINT `fk_ImageQuestion_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Class_LessonPlan`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Class_LessonPlan` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `Class_id` INT NOT NULL ,
  `LessonPlan_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Class_LessonPlan_Class` (`Class_id` ASC) ,
  INDEX `fk_Class_LessonPlan_Lesson_Plan` (`LessonPlan_id` ASC) ,
  CONSTRAINT `fk_Class_LessonPlan_Classe`
    FOREIGN KEY (`Class_id` )
    REFERENCES `education_visualfeedback`.`Class` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_LessonPlan_Lesson_Plan`
    FOREIGN KEY (`LessonPlan_id` )
    REFERENCES `education_visualfeedback`.`LessonPlan` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Classes and LessonPlans many-many joiner table.';


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`LessonPlan_Lesson`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`LessonPlan_Lesson` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `Lesson_id` INT NOT NULL ,
  `Class_LessonPlan_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_LessonPlan_Lesson_Lesson1` (`Lesson_id` ASC) ,
  INDEX `fk_LessonPlan_Lesson_Class_LessonPlan1` (`Class_LessonPlan_id` ASC) ,
  CONSTRAINT `fk_LessonPlan_Lesson_Lesson1`
    FOREIGN KEY (`Lesson_id` )
    REFERENCES `education_visualfeedback`.`Lesson` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LessonPlan_Lesson_Class_LessonPlan1`
    FOREIGN KEY (`Class_LessonPlan_id` )
    REFERENCES `education_visualfeedback`.`Class_LessonPlan` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'LessonPlan and Lessons many-many joiner table.';


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Lesson_ImageQuestion`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Lesson_ImageQuestion` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `order_index` INT NOT NULL DEFAULT 0 COMMENT 'Ordering of Questions. ie. 1,2,3,..' ,
  `ImageQuestion_id` INT NOT NULL ,
  `LessonPlan_Lesson_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Lesson_ImageQuestion_ImageQuestion1` (`ImageQuestion_id` ASC) ,
  INDEX `fk_Lesson_ImageQuestion_LessonPlan_Lesson1` (`LessonPlan_Lesson_id` ASC) ,
  CONSTRAINT `fk_Lesson_ImageQuestion_ImageQuestion1`
    FOREIGN KEY (`ImageQuestion_id` )
    REFERENCES `education_visualfeedback`.`ImageQuestion` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Lesson_ImageQuestion_LessonPlan_Lesson1`
    FOREIGN KEY (`LessonPlan_Lesson_id` )
    REFERENCES `education_visualfeedback`.`LessonPlan_Lesson` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Lesson and ImageQuestions many-many joiner table.';


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
  `Image_id` INT NOT NULL DEFAULT 2 ,
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
  INDEX `fk_TutoringSession_Lesson_ImageQuestion1` (`Lesson_ImageQuestion_id` ASC) ,
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
  CONSTRAINT `fk_TutoringSession_Lesson_ImageQuestion1`
    FOREIGN KEY (`Lesson_ImageQuestion_id` )
    REFERENCES `education_visualfeedback`.`Lesson_ImageQuestion` (`id` )
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
  INDEX `fk_PupilAnswer_Lesson_ImageQuestion1` (`Lesson_ImageQuestion_id` ASC) ,
  CONSTRAINT `fk_PupilAnswer_TutoringSession1`
    FOREIGN KEY (`TutoringSession_id` )
    REFERENCES `education_visualfeedback`.`TutoringSession` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PupilAnswer_Lesson_ImageQuestion1`
    FOREIGN KEY (`Lesson_ImageQuestion_id` )
    REFERENCES `education_visualfeedback`.`Lesson_ImageQuestion` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Placeholder table for view `education_visualfeedback`.`ImageView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `education_visualfeedback`.`ImageView` (`id` INT, `name` INT, `rootPath` INT, `url` INT);

-- -----------------------------------------------------
-- Placeholder table for view `education_visualfeedback`.`ImageFolderView`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `education_visualfeedback`.`ImageFolderView` (`id` INT, `name` INT, `rootPath` INT, `url` INT);

-- -----------------------------------------------------
-- View `education_visualfeedback`.`ImageView`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_visualfeedback`.`ImageView`;
CREATE  OR REPLACE VIEW `education_visualfeedback`.`ImageView` AS
SELECT i.id AS id, i.filename AS name, 
        CONCAT(f.rootPath, f.name, '/') AS rootPath,
        REPLACE(rootPath, '/web_root', '') AS url
FROM Image AS i
LEFT OUTER JOIN ImageFolder AS f ON (f.id = i.ImageFolder_id);

-- -----------------------------------------------------
-- View `education_visualfeedback`.`ImageFolderView`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `education_visualfeedback`.`ImageFolderView`;
CREATE  OR REPLACE VIEW `education_visualfeedback`.`ImageFolderView` AS
SELECT f.*, REPLACE(f.rootPath, '/web_root', '') AS url
FROM ImageFolder aS f;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

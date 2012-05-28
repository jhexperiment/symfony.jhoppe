SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `education_visualfeedback` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Image`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Image` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `label` VARCHAR(128) NULL ,
  `filename` VARCHAR(256) NULL COMMENT 'Name' ,
  `local_path` VARCHAR(512) NULL ,
  `web_path` VARCHAR(512) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Pupil`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Pupil` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `first_name` VARCHAR(128) NOT NULL ,
  `middle_name` VARCHAR(128) NULL ,
  `last_name` VARCHAR(128) NOT NULL ,
  `Image_id` INT NULL DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Pupil_Image1` (`Image_id` ASC) ,
  CONSTRAINT `fk_Pupil_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`TutoringSession`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`TutoringSession` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `hash` VARCHAR(256) NOT NULL ,
  `status` VARCHAR(128) NULL DEFAULT 1 ,
  `Pupil_id` INT NULL ,
  `Tutor_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_TutoringSession_Pupil1` (`Pupil_id` ASC) ,
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC) ,
  CONSTRAINT `fk_TutoringSession_Pupil1`
    FOREIGN KEY (`Pupil_id` )
    REFERENCES `education_visualfeedback`.`Pupil` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Lesson`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Lesson` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(128) NULL ,
  `subject` VARCHAR(128) NULL ,
  `lesson_plan` VARCHAR(128) NULL ,
  `TutoringSession_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Lesson_TutoringSession1` (`TutoringSession_id` ASC) ,
  CONSTRAINT `fk_Lesson_TutoringSession1`
    FOREIGN KEY (`TutoringSession_id` )
    REFERENCES `education_visualfeedback`.`TutoringSession` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `education_visualfeedback`.`PupilAnswer`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`PupilAnswer` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `image_answer` VARCHAR(45) NULL ,
  `text_answer` VARCHAR(45) NULL ,
  `timestamp` INT NOT NULL ,
  `TutoringSession_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_PupilAnswer_TutoringSession1` (`TutoringSession_id` ASC) ,
  CONSTRAINT `fk_PupilAnswer_TutoringSession1`
    FOREIGN KEY (`TutoringSession_id` )
    REFERENCES `education_visualfeedback`.`TutoringSession` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `education_visualfeedback`.`Question`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `education_visualfeedback`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Index' ,
  `name` VARCHAR(128) NULL COMMENT 'Name' ,
  `text` VARCHAR(128) NULL COMMENT 'Display Text' ,
  `type` VARCHAR(128) NULL ,
  `Image_id` INT NULL ,
  `Lesson_id` INT NULL ,
  `Audio_id` INT NULL ,
  `PupilAnswer_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_ImageQuestion_Image1` (`Image_id` ASC) ,
  INDEX `fk_ImageQuestion_Lesson1` (`Lesson_id` ASC) ,
  INDEX `fk_Question_Audio1` (`Audio_id` ASC) ,
  INDEX `fk_Question_PupilAnswer1` (`PupilAnswer_id` ASC) ,
  CONSTRAINT `fk_ImageQuestion_Image1`
    FOREIGN KEY (`Image_id` )
    REFERENCES `education_visualfeedback`.`Image` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ImageQuestion_Lesson1`
    FOREIGN KEY (`Lesson_id` )
    REFERENCES `education_visualfeedback`.`Lesson` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_Audio1`
    FOREIGN KEY (`Audio_id` )
    REFERENCES `education_visualfeedback`.`Audio` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_PupilAnswer1`
    FOREIGN KEY (`PupilAnswer_id` )
    REFERENCES `education_visualfeedback`.`PupilAnswer` (`id` )
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



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

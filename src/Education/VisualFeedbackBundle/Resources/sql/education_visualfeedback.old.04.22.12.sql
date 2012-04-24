-- phpMyAdmin SQL Dump
-- version 3.4.0-rc2-dev
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 22, 2012 at 01:08 PM
-- Server version: 5.1.51
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `education_visualfeedback`
--

-- --------------------------------------------------------

--
-- Table structure for table `Audio`
--

CREATE TABLE IF NOT EXISTS `Audio` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `label` varchar(128) DEFAULT NULL,
  `filename` varchar(256) DEFAULT NULL COMMENT 'Name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Audio`
--

INSERT INTO `Audio` (`id`, `label`, `filename`) VALUES
(1, 'THX - 20th Century Fox Fanfare', 'THX - 20th Century Fox Fanfare.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `Image`
--

CREATE TABLE IF NOT EXISTS `Image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `label` varchar(128) DEFAULT NULL,
  `filename` varchar(256) DEFAULT NULL COMMENT 'Name',
  `ImageFolder_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Image_ImageFolder1` (`ImageFolder_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `Image`
--

INSERT INTO `Image` (`id`, `label`, `filename`, `ImageFolder_id`) VALUES
(1, 'squirrel', 'squirrel.png', 1),
(2, 'chinchilla', 'chinchilla.png', 1),
(3, 'skunk', 'skunk.png', 1),
(4, 'donkey', 'donkey.png', 1),
(5, 'penguin', 'penguin.png', 1),
(6, 'walrus', 'walrus.png', 1),
(7, 'ratty', 't9ratty_trans.png', 1),
(8, 'froggy', 't9froggy_trans.png', 1),
(9, 'foxy', 't9foxy_trans.png', 1),
(10, 'batty', 't9batty_trans.png', 1),
(11, 'penguino', 't9penguino_trans.png', 1),
(12, 'tuqui', 't9tuqui_trans.png', 1),
(13, 'dog2', 't9dog2_trans.png', 1),
(14, 'panda', 't9panda_trans.png', 1),
(15, 'dog', 't9dog1_trans.png', 1),
(16, 'ducky', 't9ducky_trans.png', 1),
(17, 'kitty', 't9kitty_trans.png', 1),
(18, 'elephant', 't9elephant_trans.png', 1),
(19, 'lion', 't9lion_trans.png', 1),
(20, 'T393k - Imgur.jpg', 'T393k - Imgur.jpg', 4),
(21, 'mexi_test.jpg', 'mexi_test.jpg', 4),
(22, 'shura.no.toki.03.jpg', 'shura.no.toki.03.jpg', 4),
(23, 'doctor.png', 'doctor.png', 4),
(24, 'cowboy.png', 'cowboy.png', 4),
(25, 'cop.png', 'cop.png', 4),
(26, 'chef.png', 'chef.png', 4),
(27, 'angela_merkel512.png', 'angela_merkel512.png', 4),
(28, 'ayatollah_ali_khamenei512.png', 'ayatollah_ali_khamenei512.png', 4),
(29, 'evo_morales512.png', 'evo_morales512.png', 4),
(30, 'alvaro_uribe512.png', 'alvaro_uribe512.png', 4),
(31, 'kim_yongII512.png', 'kim_yongII512.png', 4),
(32, 'silvio_berlusconi512.png', 'silvio_berlusconi512.png', 4),
(33, 'hugo_chavez512.png', 'hugo_chavez512.png', 4),
(34, 'barak_obama512.png', 'barak_obama512.png', 4),
(35, 'evilmonkey.jpg', 'evilmonkey.jpg', 5);

-- --------------------------------------------------------

--
-- Table structure for table `ImageFolder`
--

CREATE TABLE IF NOT EXISTS `ImageFolder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `root_path` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `ImageFolder`
--

INSERT INTO `ImageFolder` (`id`, `name`, `root_path`) VALUES
(1, 'uploads', '/bundles/visualfeedback/images/uploads'),
(4, 'tutor_icons', '/bundles/visualfeedback/images/tutor_icons'),
(5, 'pupil_icons', '/bundles/visualfeedback/images/pupil_icons');

-- --------------------------------------------------------

--
-- Table structure for table `imagefolderview`
--
-- in use(#1356 - View 'education_visualfeedback.imagefolderview' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)
-- in use (#1356 - View 'education_visualfeedback.imagefolderview' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)

-- --------------------------------------------------------

--
-- Table structure for table `ImageQuestion`
--

CREATE TABLE IF NOT EXISTS `ImageQuestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `name` varchar(128) DEFAULT NULL COMMENT 'Name',
  `text` varchar(128) DEFAULT NULL COMMENT 'Display Text',
  `Image_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ImageQuestion_Image1` (`Image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=59 ;

--
-- Dumping data for table `ImageQuestion`
--

INSERT INTO `ImageQuestion` (`id`, `name`, `text`, `Image_id`) VALUES
(1, 'walrus', 'walrus', 6),
(2, 'penguin', 'penguin', 5),
(3, 'donkey', 'donkey', 4),
(4, 'skunk', 'skunk', 3),
(5, 'ratty', 'ratty', 7),
(6, 'skunk', 'skunk', 3),
(7, 'squirrel', 'squirrel', 1),
(8, 'chinchilla', 'chinchilla', 2),
(9, 'walrus', 'walrus', 6),
(10, 'penguin', 'penguin', 5),
(11, 'dog', 'dog', 15),
(12, 'penguin', 'penguin', 5),
(13, 'donkey', 'donkey', 4),
(14, 'chinchilla', 'chinchilla', 2),
(15, 'squirrel', 'squirrel', 1),
(16, 'penguino', 'penguino', 11),
(17, 'tuqui', 'tuqui', 12),
(18, 'donkey', 'donkey', 4),
(19, 'skunk', 'skunk', 3),
(20, 'chinchilla', 'chinchilla', 2),
(21, 'tuqui', 'tuqui', 12),
(22, 'dog', 'dog', 15),
(23, 'skunk', 'skunk', 3),
(24, 'chinchilla', 'chinchilla', 2),
(25, 'squirrel', 'squirrel', 1),
(26, 'tuqui', 'tuqui', 12),
(27, 'donkey', 'donkey', 4),
(28, 'squirrel', 'squirrel', 1),
(29, 'chinchilla', 'chinchilla', 2),
(30, 'skunk', 'skunk', 3),
(31, 'donkey', 'donkey', 4),
(32, 'penguin', 'penguin', 5),
(33, 'squirrel', 'squirrel', 1),
(34, 'chinchilla', 'chinchilla', 2),
(35, 'skunk', 'skunk', 3),
(36, 'donkey', 'donkey', 4),
(37, 'penguin', 'penguin', 5),
(38, 'froggy', 'froggy', 8),
(39, 'ratty', 'ratty', 7),
(40, 'dog', 'dog', 15),
(41, 'ducky', 'ducky', 16),
(42, 'squirrel', 'squirrel', 1),
(43, 'skunk', 'skunk', 3),
(44, 'chinchilla', 'chinchilla', 2),
(45, 'penguin', 'penguin', 5),
(46, 'lion', 'lion', 19),
(47, 'batty', 'batty', 10),
(48, 'kitty', 'kitty', 17),
(49, 'elephant', 'elephant', 18),
(50, 'dog2', 'dog2', 13),
(51, 'penguino', 'penguino', 11),
(52, 'panda', 'panda', 14),
(53, 'chinchilla', 'chinchilla', 2),
(54, 'squirrel', 'squirrel', 1),
(55, 'skunk', 'skunk', 3),
(56, 'penguino', 'penguino', 11),
(57, 'tuqui', 'tuqui', 12),
(58, 'penguino', 'penguino', 11);

-- --------------------------------------------------------

--
-- Table structure for table `imageview`
--
-- in use(#1356 - View 'education_visualfeedback.imageview' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)
-- in use (#1356 - View 'education_visualfeedback.imageview' references invalid table(s) or column(s) or function(s) or definer/invoker of view lack rights to use them)

-- --------------------------------------------------------

--
-- Table structure for table `Lesson`
--

CREATE TABLE IF NOT EXISTS `Lesson` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `Lesson`
--

INSERT INTO `Lesson` (`id`, `name`) VALUES
(7, 'Reading Lesson 01'),
(8, 'Reading Lesson 02'),
(9, 'Math Lesson 01'),
(10, 'Reading Lesson 01a'),
(11, 'test 01'),
(13, 'test 02');

-- --------------------------------------------------------

--
-- Table structure for table `LessonPlan`
--

CREATE TABLE IF NOT EXISTS `LessonPlan` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `name` varchar(128) DEFAULT NULL COMMENT 'Name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `LessonPlan`
--

INSERT INTO `LessonPlan` (`id`, `name`) VALUES
(1, 'Reading Plan 01'),
(2, 'Reading Plan 02'),
(3, 'Math Plan 01');

-- --------------------------------------------------------

--
-- Table structure for table `LessonPlan_Lesson`
--

CREATE TABLE IF NOT EXISTS `LessonPlan_Lesson` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `Lesson_id` int(11) NOT NULL,
  `Subject_LessonPlan_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_LessonPlan_Lesson_Lesson1` (`Lesson_id`),
  KEY `fk_LessonPlan_Lesson_Subject_LessonPlan1` (`Subject_LessonPlan_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='LessonPlan and Lessons many-many joiner table.' AUTO_INCREMENT=8 ;

--
-- Dumping data for table `LessonPlan_Lesson`
--

INSERT INTO `LessonPlan_Lesson` (`id`, `Lesson_id`, `Subject_LessonPlan_id`) VALUES
(1, 7, 1),
(2, 8, 5),
(3, 9, 6),
(4, 10, 7),
(5, 11, 8),
(7, 13, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Lesson_ImageQuestion`
--

CREATE TABLE IF NOT EXISTS `Lesson_ImageQuestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_index` int(11) NOT NULL DEFAULT '0' COMMENT 'Ordering of Questions. ie. 1,2,3,..',
  `ImageQuestion_id` int(11) NOT NULL,
  `LessonPlan_Lesson_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Lesson_ImageQuestion_ImageQuestion1` (`ImageQuestion_id`),
  KEY `fk_Lesson_ImageQuestion_LessonPlan_Lesson1` (`LessonPlan_Lesson_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Lesson and ImageQuestions many-many joiner table.' AUTO_INCREMENT=57 ;

--
-- Dumping data for table `Lesson_ImageQuestion`
--

INSERT INTO `Lesson_ImageQuestion` (`id`, `order_index`, `ImageQuestion_id`, `LessonPlan_Lesson_id`) VALUES
(1, 1, 12, 2),
(2, 2, 13, 2),
(3, 3, 14, 2),
(4, 4, 15, 2),
(5, 5, 16, 2),
(6, 6, 17, 2),
(7, 1, 18, 3),
(8, 2, 19, 3),
(9, 3, 20, 3),
(10, 4, 21, 3),
(11, 5, 22, 3),
(12, 1, 23, 4),
(13, 2, 24, 4),
(14, 3, 25, 4),
(15, 4, 26, 4),
(41, 1, 47, 5),
(42, 2, 48, 5),
(43, 3, 49, 5),
(44, 4, 50, 5),
(45, 5, 51, 5),
(46, 6, 52, 5),
(51, 1, 53, 7),
(52, 2, 54, 7),
(53, 3, 55, 7),
(54, 4, 56, 7),
(55, 5, 57, 7),
(56, 6, 58, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Pupil`
--

CREATE TABLE IF NOT EXISTS `Pupil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) NOT NULL,
  `middle_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) NOT NULL,
  `Image_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_Pupil_Image1` (`Image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Pupil`
--

INSERT INTO `Pupil` (`id`, `first_name`, `middle_name`, `last_name`, `Image_id`) VALUES
(1, 'John Jr.', '', 'Smith', 35);

-- --------------------------------------------------------

--
-- Table structure for table `PupilAnswer`
--

CREATE TABLE IF NOT EXISTS `PupilAnswer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_answer` varchar(45) DEFAULT NULL,
  `text_answer` varchar(45) DEFAULT NULL,
  `timestamp` int(11) NOT NULL,
  `TutoringSession_id` int(11) NOT NULL,
  `Lesson_ImageQuestion_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_PupilAnswer_TutoringSession1` (`TutoringSession_id`),
  KEY `fk_PupilAnswer_Lesson_ImageQuestion1` (`Lesson_ImageQuestion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Setting`
--

CREATE TABLE IF NOT EXISTS `Setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `value` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `Setting`
--

INSERT INTO `Setting` (`id`, `name`, `value`) VALUES
(1, 'root-web-folder', '/bundles/visualfeedback'),
(2, 'image-upload-folder', '/images/uploads'),
(3, 'audio-upload-folder', '/audio/uploads'),
(4, 'tutor-upload-folder', '/tutor_icons'),
(5, 'pupil-upload-folder', '/pupil_icons');

-- --------------------------------------------------------

--
-- Table structure for table `StatusCode`
--

CREATE TABLE IF NOT EXISTS `StatusCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Subject`
--

CREATE TABLE IF NOT EXISTS `Subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Index',
  `name` varchar(128) DEFAULT NULL COMMENT 'Name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Subject`
--

INSERT INTO `Subject` (`id`, `name`) VALUES
(1, 'Reading'),
(2, 'Math'),
(3, 'Science');

-- --------------------------------------------------------

--
-- Table structure for table `Subject_LessonPlan`
--

CREATE TABLE IF NOT EXISTS `Subject_LessonPlan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Subject_id` int(11) NOT NULL,
  `LessonPlan_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Subject_LessonPlan_Subject` (`Subject_id`),
  KEY `fk_Subject_LessonPlan_Lesson_Plan` (`LessonPlan_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Classes and LessonPlans many-many joiner table.' AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Subject_LessonPlan`
--

INSERT INTO `Subject_LessonPlan` (`id`, `Subject_id`, `LessonPlan_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(5, 1, 2),
(6, 2, 3),
(7, 1, 1),
(8, 2, 3),
(9, 1, 2),
(10, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Tutor`
--

CREATE TABLE IF NOT EXISTS `Tutor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) NOT NULL,
  `middle_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) NOT NULL,
  `Image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Tutor_Image1` (`Image_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `Tutor`
--

INSERT INTO `Tutor` (`id`, `first_name`, `middle_name`, `last_name`, `Image_id`) VALUES
(1, 'John', 'Doe', 'Smith', 34),
(2, 'Sally', '', 'Doe', 27);

-- --------------------------------------------------------

--
-- Table structure for table `TutoringSession`
--

CREATE TABLE IF NOT EXISTS `TutoringSession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(256) NOT NULL,
  `display_content` varchar(128) NOT NULL DEFAULT 'image',
  `Pupil_id` int(11) NOT NULL,
  `Tutor_id` int(11) NOT NULL,
  `Lesson_ImageQuestion_id` int(11) NOT NULL,
  `StatusCode_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash_UNIQUE` (`hash`),
  KEY `fk_TutoringSession_Pupil1` (`Pupil_id`),
  KEY `fk_TutoringSession_Tutor1` (`Tutor_id`),
  KEY `fk_TutoringSession_Lesson_ImageQuestion1` (`Lesson_ImageQuestion_id`),
  KEY `fk_TutoringSession_StatusCode1` (`StatusCode_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Image`
--
ALTER TABLE `Image`
  ADD CONSTRAINT `fk_Images_ImageFolder1` FOREIGN KEY (`ImageFolder_id`) REFERENCES `imagefolder` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ImageQuestion`
--
ALTER TABLE `ImageQuestion`
  ADD CONSTRAINT `fk_ImageQuestion_Image1` FOREIGN KEY (`Image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `LessonPlan_Lesson`
--
ALTER TABLE `LessonPlan_Lesson`
  ADD CONSTRAINT `fk_LessonPlan_Lesson_Lesson1` FOREIGN KEY (`Lesson_id`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `lessonplan_lesson_ibfk_1` FOREIGN KEY (`Subject_LessonPlan_id`) REFERENCES `subject_lessonplan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Lesson_ImageQuestion`
--
ALTER TABLE `Lesson_ImageQuestion`
  ADD CONSTRAINT `fk_Lesson_ImageQuestion_LessonPlan_Lesson1` FOREIGN KEY (`LessonPlan_Lesson_id`) REFERENCES `lessonplan_lesson` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `lesson_imagequestion_ibfk_1` FOREIGN KEY (`ImageQuestion_id`) REFERENCES `imagequestion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `Pupil`
--
ALTER TABLE `Pupil`
  ADD CONSTRAINT `fk_Pupil_Image1` FOREIGN KEY (`Image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `PupilAnswer`
--
ALTER TABLE `PupilAnswer`
  ADD CONSTRAINT `fk_PupilAnswer_Lesson_ImageQuestion1` FOREIGN KEY (`Lesson_ImageQuestion_id`) REFERENCES `lesson_imagequestion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_PupilAnswer_TutoringSession1` FOREIGN KEY (`TutoringSession_id`) REFERENCES `tutoringsession` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Subject_LessonPlan`
--
ALTER TABLE `Subject_LessonPlan`
  ADD CONSTRAINT `subject_lessonplan_ibfk_1` FOREIGN KEY (`Subject_id`) REFERENCES `subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `subject_lessonplan_ibfk_2` FOREIGN KEY (`LessonPlan_id`) REFERENCES `lessonplan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Tutor`
--
ALTER TABLE `Tutor`
  ADD CONSTRAINT `fk_Tutor_Image1` FOREIGN KEY (`Image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `TutoringSession`
--
ALTER TABLE `TutoringSession`
  ADD CONSTRAINT `fk_TutoringSession_Lesson_ImageQuestion1` FOREIGN KEY (`Lesson_ImageQuestion_id`) REFERENCES `lesson_imagequestion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TutoringSession_Pupil1` FOREIGN KEY (`Pupil_id`) REFERENCES `pupil` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TutoringSession_StatusCode1` FOREIGN KEY (`StatusCode_id`) REFERENCES `statuscode` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TutoringSession_Tutor1` FOREIGN KEY (`Tutor_id`) REFERENCES `tutor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

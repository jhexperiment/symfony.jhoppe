<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\LessonplanLesson
 */
class LessonplanLesson
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Lesson
     */
    private $lesson;

    /**
     * @var Education\VisualFeedbackBundle\Entity\ClassLessonplan
     */
    private $classLessonplan;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set lesson
     *
     * @param Education\VisualFeedbackBundle\Entity\Lesson $lesson
     */
    public function setLesson(\Education\VisualFeedbackBundle\Entity\Lesson $lesson)
    {
        $this->lesson = $lesson;
    }

    /**
     * Get lesson
     *
     * @return Education\VisualFeedbackBundle\Entity\Lesson 
     */
    public function getLesson()
    {
        return $this->lesson;
    }

    /**
     * Set classLessonplan
     *
     * @param Education\VisualFeedbackBundle\Entity\ClassLessonplan $classLessonplan
     */
    public function setClassLessonplan(\Education\VisualFeedbackBundle\Entity\ClassLessonplan $classLessonplan)
    {
        $this->classLessonplan = $classLessonplan;
    }

    /**
     * Get classLessonplan
     *
     * @return Education\VisualFeedbackBundle\Entity\ClassLessonplan 
     */
    public function getClassLessonplan()
    {
        return $this->classLessonplan;
    }
}
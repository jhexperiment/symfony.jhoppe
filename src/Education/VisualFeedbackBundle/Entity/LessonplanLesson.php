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
     * @var Education\VisualFeedbackBundle\Entity\SubjectLessonplan
     */
    private $subjectLessonplan;


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
     * Set subjectLessonplan
     *
     * @param Education\VisualFeedbackBundle\Entity\SubjectLessonplan $subjectLessonplan
     */
    public function setSubjectLessonplan(\Education\VisualFeedbackBundle\Entity\SubjectLessonplan $subjectLessonplan)
    {
        $this->subjectLessonplan = $subjectLessonplan;
    }

    /**
     * Get subjectLessonplan
     *
     * @return Education\VisualFeedbackBundle\Entity\SubjectLessonplan 
     */
    public function getSubjectLessonplan()
    {
        return $this->subjectLessonplan;
    }
}
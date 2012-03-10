<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\LessonImagequestion
 */
class LessonImagequestion
{
    /**
     * @var integer $orderIndex
     */
    private $orderIndex;

    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Imagequestion
     */
    private $imagequestion;

    /**
     * @var Education\VisualFeedbackBundle\Entity\LessonplanLesson
     */
    private $lessonplanLesson;


    /**
     * Set orderIndex
     *
     * @param integer $orderIndex
     */
    public function setOrderIndex($orderIndex)
    {
        $this->orderIndex = $orderIndex;
    }

    /**
     * Get orderIndex
     *
     * @return integer 
     */
    public function getOrderIndex()
    {
        return $this->orderIndex;
    }

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
     * Set imagequestion
     *
     * @param Education\VisualFeedbackBundle\Entity\Imagequestion $imagequestion
     */
    public function setImagequestion(\Education\VisualFeedbackBundle\Entity\Imagequestion $imagequestion)
    {
        $this->imagequestion = $imagequestion;
    }

    /**
     * Get imagequestion
     *
     * @return Education\VisualFeedbackBundle\Entity\Imagequestion 
     */
    public function getImagequestion()
    {
        return $this->imagequestion;
    }

    /**
     * Set lessonplanLesson
     *
     * @param Education\VisualFeedbackBundle\Entity\LessonplanLesson $lessonplanLesson
     */
    public function setLessonplanLesson(\Education\VisualFeedbackBundle\Entity\LessonplanLesson $lessonplanLesson)
    {
        $this->lessonplanLesson = $lessonplanLesson;
    }

    /**
     * Get lessonplanLesson
     *
     * @return Education\VisualFeedbackBundle\Entity\LessonplanLesson 
     */
    public function getLessonplanLesson()
    {
        return $this->lessonplanLesson;
    }
}
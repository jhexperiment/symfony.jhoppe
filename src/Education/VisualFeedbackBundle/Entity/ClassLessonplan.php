<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\ClassLessonplan
 */
class ClassLessonplan
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Class
     */
    private $class;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Lessonplan
     */
    private $lessonplan;


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
     * Set class
     *
     * @param Education\VisualFeedbackBundle\Entity\Class $class
     */
    public function setClass(\Education\VisualFeedbackBundle\Entity\Class $class)
    {
        $this->class = $class;
    }

    /**
     * Get class
     *
     * @return Education\VisualFeedbackBundle\Entity\Class 
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * Set lessonplan
     *
     * @param Education\VisualFeedbackBundle\Entity\Lessonplan $lessonplan
     */
    public function setLessonplan(\Education\VisualFeedbackBundle\Entity\Lessonplan $lessonplan)
    {
        $this->lessonplan = $lessonplan;
    }

    /**
     * Get lessonplan
     *
     * @return Education\VisualFeedbackBundle\Entity\Lessonplan 
     */
    public function getLessonplan()
    {
        return $this->lessonplan;
    }
}
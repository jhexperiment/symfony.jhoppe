<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\SubjectLessonplan
 */
class SubjectLessonplan
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Subject
     */
    private $subject;

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
     * Set subject
     *
     * @param Education\VisualFeedbackBundle\Entity\Subject $subject
     */
    public function setSubject(\Education\VisualFeedbackBundle\Entity\Subject $subject)
    {
        $this->subject = $subject;
    }

    /**
     * Get subject
     *
     * @return Education\VisualFeedbackBundle\Entity\Subject 
     */
    public function getSubject()
    {
        return $this->subject;
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
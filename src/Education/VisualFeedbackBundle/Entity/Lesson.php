<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Lesson
 */
class Lesson
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $name
     */
    private $name;

    /**
     * @var string $subject
     */
    private $subject;

    /**
     * @var string $lessonPlan
     */
    private $lessonPlan;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Tutoringsession
     */
    private $tutoringsession;


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
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set subject
     *
     * @param string $subject
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;
    }

    /**
     * Get subject
     *
     * @return string 
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Set lessonPlan
     *
     * @param string $lessonPlan
     */
    public function setLessonPlan($lessonPlan)
    {
        $this->lessonPlan = $lessonPlan;
    }

    /**
     * Get lessonPlan
     *
     * @return string 
     */
    public function getLessonPlan()
    {
        return $this->lessonPlan;
    }

    /**
     * Set tutoringsession
     *
     * @param Education\VisualFeedbackBundle\Entity\Tutoringsession $tutoringsession
     */
    public function setTutoringsession(\Education\VisualFeedbackBundle\Entity\Tutoringsession $tutoringsession)
    {
        $this->tutoringsession = $tutoringsession;
    }

    /**
     * Get tutoringsession
     *
     * @return Education\VisualFeedbackBundle\Entity\Tutoringsession 
     */
    public function getTutoringsession()
    {
        return $this->tutoringsession;
    }
}
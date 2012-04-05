<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Pupilanswer
 */
class Pupilanswer
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $imageAnswer
     */
    private $imageAnswer;

    /**
     * @var string $textAnswer
     */
    private $textAnswer;

    /**
     * @var integer $timestamp
     */
    private $timestamp;

    /**
     * @var Education\VisualFeedbackBundle\Entity\LessonImagequestion
     */
    private $lessonImagequestion;

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
     * Set imageAnswer
     *
     * @param string $imageAnswer
     */
    public function setImageAnswer($imageAnswer)
    {
        $this->imageAnswer = $imageAnswer;
    }

    /**
     * Get imageAnswer
     *
     * @return string 
     */
    public function getImageAnswer()
    {
        return $this->imageAnswer;
    }

    /**
     * Set textAnswer
     *
     * @param string $textAnswer
     */
    public function setTextAnswer($textAnswer)
    {
        $this->textAnswer = $textAnswer;
    }

    /**
     * Get textAnswer
     *
     * @return string 
     */
    public function getTextAnswer()
    {
        return $this->textAnswer;
    }

    /**
     * Set timestamp
     *
     * @param integer $timestamp
     */
    public function setTimestamp($timestamp)
    {
        $this->timestamp = $timestamp;
    }

    /**
     * Get timestamp
     *
     * @return integer 
     */
    public function getTimestamp()
    {
        return $this->timestamp;
    }

    /**
     * Set lessonImagequestion
     *
     * @param Education\VisualFeedbackBundle\Entity\LessonImagequestion $lessonImagequestion
     */
    public function setLessonImagequestion(\Education\VisualFeedbackBundle\Entity\LessonImagequestion $lessonImagequestion)
    {
        $this->lessonImagequestion = $lessonImagequestion;
    }

    /**
     * Get lessonImagequestion
     *
     * @return Education\VisualFeedbackBundle\Entity\LessonImagequestion 
     */
    public function getLessonImagequestion()
    {
        return $this->lessonImagequestion;
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
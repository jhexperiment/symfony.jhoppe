<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Receptivevocabquestion
 */
class Receptivevocabquestion
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
     * @var Education\VisualFeedbackBundle\Entity\Lesson
     */
    private $lesson;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Audio
     */
    private $audio;


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
     * Set audio
     *
     * @param Education\VisualFeedbackBundle\Entity\Audio $audio
     */
    public function setAudio(\Education\VisualFeedbackBundle\Entity\Audio $audio)
    {
        $this->audio = $audio;
    }

    /**
     * Get audio
     *
     * @return Education\VisualFeedbackBundle\Entity\Audio 
     */
    public function getAudio()
    {
        return $this->audio;
    }
}
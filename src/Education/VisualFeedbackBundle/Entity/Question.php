<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Question
 */
class Question
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
     * @var string $text
     */
    private $text;

    /**
     * @var string $type
     */
    private $type;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Image
     */
    private $image;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Lesson
     */
    private $lesson;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Audio
     */
    private $audio;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Pupilanswer
     */
    private $pupilanswer;


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
     * Set text
     *
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * Get text
     *
     * @return string 
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set type
     *
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set image
     *
     * @param Education\VisualFeedbackBundle\Entity\Image $image
     */
    public function setImage(\Education\VisualFeedbackBundle\Entity\Image $image)
    {
        $this->image = $image;
    }

    /**
     * Get image
     *
     * @return Education\VisualFeedbackBundle\Entity\Image 
     */
    public function getImage()
    {
        return $this->image;
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

    /**
     * Set pupilanswer
     *
     * @param Education\VisualFeedbackBundle\Entity\Pupilanswer $pupilanswer
     */
    public function setPupilanswer(\Education\VisualFeedbackBundle\Entity\Pupilanswer $pupilanswer)
    {
        $this->pupilanswer = $pupilanswer;
    }

    /**
     * Get pupilanswer
     *
     * @return Education\VisualFeedbackBundle\Entity\Pupilanswer 
     */
    public function getPupilanswer()
    {
        return $this->pupilanswer;
    }
}
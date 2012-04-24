<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Expressivevocabquestion
 */
class Expressivevocabquestion
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var integer $orderIndex
     */
    private $orderIndex;

    /**
     * @var string $name
     */
    private $name;

    /**
     * @var string $text
     */
    private $text;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Image
     */
    private $image;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Lesson
     */
    private $lesson;


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
}
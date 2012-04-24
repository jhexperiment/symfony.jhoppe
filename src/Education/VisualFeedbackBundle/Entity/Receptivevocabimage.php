<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Receptivevocabimage
 */
class Receptivevocabimage
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Receptivevocabquestion
     */
    private $receptivevocabquestion;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Image
     */
    private $image;


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
     * Set receptivevocabquestion
     *
     * @param Education\VisualFeedbackBundle\Entity\Receptivevocabquestion $receptivevocabquestion
     */
    public function setReceptivevocabquestion(\Education\VisualFeedbackBundle\Entity\Receptivevocabquestion $receptivevocabquestion)
    {
        $this->receptivevocabquestion = $receptivevocabquestion;
    }

    /**
     * Get receptivevocabquestion
     *
     * @return Education\VisualFeedbackBundle\Entity\Receptivevocabquestion 
     */
    public function getReceptivevocabquestion()
    {
        return $this->receptivevocabquestion;
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
}
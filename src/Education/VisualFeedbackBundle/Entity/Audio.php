<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Audio
 */
class Audio
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $label
     */
    private $label;

    /**
     * @var string $filename
     */
    private $filename;


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
     * Set label
     *
     * @param string $label
     */
    public function setLabel($label)
    {
        $this->label = $label;
    }

    /**
     * Get label
     *
     * @return string 
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * Set filename
     *
     * @param string $filename
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;
    }

    /**
     * Get filename
     *
     * @return string 
     */
    public function getFilename()
    {
        return $this->filename;
    }
}
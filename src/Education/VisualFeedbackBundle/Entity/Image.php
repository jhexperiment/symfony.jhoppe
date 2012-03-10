<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Image
 */
class Image
{
    /**
     * @var string $label
     */
    private $label;

    /**
     * @var string $filename
     */
    private $filename;

    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Imagefolder
     */
    private $imagefolder;


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
     * Set imagefolder
     *
     * @param Education\VisualFeedbackBundle\Entity\Imagefolder $imagefolder
     */
    public function setImagefolder(\Education\VisualFeedbackBundle\Entity\Imagefolder $imagefolder)
    {
        $this->imagefolder = $imagefolder;
    }

    /**
     * Get imagefolder
     *
     * @return Education\VisualFeedbackBundle\Entity\Imagefolder 
     */
    public function getImagefolder()
    {
        return $this->imagefolder;
    }
}
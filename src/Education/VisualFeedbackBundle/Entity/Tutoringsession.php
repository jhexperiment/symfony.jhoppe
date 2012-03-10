<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Tutoringsession
 */
class Tutoringsession
{
    /**
     * @var string $hash
     */
    private $hash;

    /**
     * @var string $displayContent
     */
    private $displayContent;

    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Pupil
     */
    private $pupil;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Tutor
     */
    private $tutor;

    /**
     * @var Education\VisualFeedbackBundle\Entity\LessonImagequestion
     */
    private $lessonImagequestion;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Statuscode
     */
    private $statuscode;


    /**
     * Set hash
     *
     * @param string $hash
     */
    public function setHash($hash)
    {
        $this->hash = $hash;
    }

    /**
     * Get hash
     *
     * @return string 
     */
    public function getHash()
    {
        return $this->hash;
    }

    /**
     * Set displayContent
     *
     * @param string $displayContent
     */
    public function setDisplayContent($displayContent)
    {
        $this->displayContent = $displayContent;
    }

    /**
     * Get displayContent
     *
     * @return string 
     */
    public function getDisplayContent()
    {
        return $this->displayContent;
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
     * Set pupil
     *
     * @param Education\VisualFeedbackBundle\Entity\Pupil $pupil
     */
    public function setPupil(\Education\VisualFeedbackBundle\Entity\Pupil $pupil)
    {
        $this->pupil = $pupil;
    }

    /**
     * Get pupil
     *
     * @return Education\VisualFeedbackBundle\Entity\Pupil 
     */
    public function getPupil()
    {
        return $this->pupil;
    }

    /**
     * Set tutor
     *
     * @param Education\VisualFeedbackBundle\Entity\Tutor $tutor
     */
    public function setTutor(\Education\VisualFeedbackBundle\Entity\Tutor $tutor)
    {
        $this->tutor = $tutor;
    }

    /**
     * Get tutor
     *
     * @return Education\VisualFeedbackBundle\Entity\Tutor 
     */
    public function getTutor()
    {
        return $this->tutor;
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
     * Set statuscode
     *
     * @param Education\VisualFeedbackBundle\Entity\Statuscode $statuscode
     */
    public function setStatuscode(\Education\VisualFeedbackBundle\Entity\Statuscode $statuscode)
    {
        $this->statuscode = $statuscode;
    }

    /**
     * Get statuscode
     *
     * @return Education\VisualFeedbackBundle\Entity\Statuscode 
     */
    public function getStatuscode()
    {
        return $this->statuscode;
    }
}
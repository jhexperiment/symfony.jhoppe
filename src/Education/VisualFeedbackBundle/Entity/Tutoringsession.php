<?php

namespace Education\VisualFeedbackBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Education\VisualFeedbackBundle\Entity\Tutoringsession
 */
class Tutoringsession
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $hash
     */
    private $hash;

    /**
     * @var string $status
     */
    private $status;

    /**
     * @var integer $tutorId
     */
    private $tutorId;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Pupil
     */
    private $pupil;


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
     * Set status
     *
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * Get status
     *
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set tutorId
     *
     * @param integer $tutorId
     */
    public function setTutorId($tutorId)
    {
        $this->tutorId = $tutorId;
    }

    /**
     * Get tutorId
     *
     * @return integer 
     */
    public function getTutorId()
    {
        return $this->tutorId;
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
     * @var Education\VisualFeedbackBundle\Entity\Lesson
     */
    private $lesson;

    /**
     * @var Education\VisualFeedbackBundle\Entity\Tutor
     */
    private $tutor;


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
}
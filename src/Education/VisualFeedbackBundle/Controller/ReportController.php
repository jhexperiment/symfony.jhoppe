<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;


use Education\VisualFeedbackBundle\Entity\Image;
use Education\VisualFeedbackBundle\Entity\Audio;
use Education\VisualFeedbackBundle\Entity\Tutor;
use Education\VisualFeedbackBundle\Entity\Pupil;
use Education\VisualFeedbackBundle\Entity\Lesson;
use Education\VisualFeedbackBundle\Entity\Setting;
use Education\VisualFeedbackBundle\Entity\Question;
use Education\VisualFeedbackBundle\Entity\TutoringSession;


class ReportController extends Controller {
    
    
    
  public function indexAction() {
    
    
    $aViewData = array(
      'sWindowTitle' => 'Report'
      
    );
    
    return $this->render('EducationVisualFeedbackBundle:Report:index.html.php', $aViewData);
  }
    
} 






















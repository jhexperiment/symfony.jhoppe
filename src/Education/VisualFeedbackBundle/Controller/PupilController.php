<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class PupilController extends Controller
{
    
    public function indexAction()
    {
      $aViewData = array(
        'name' => 'Pupil'
      );
      
      return $this->render('EducationVisualFeedbackBundle:Pupil:index.html.php', $aViewData);
    }
}

<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class TutorController extends Controller
{
    
    public function indexAction()
    {
      
      $aSessionList = array();
      for ($i = 1; $i <=10; $i++) {
        
        $aPupilList = array();
        $iCount = rand(2,5);
        for ($j = 1; $j <= $iCount; $j++) {
          
        }
        
        $aSessionList[] = array(
          'iNumber' => $i,
          'sTutor' => "Tutor-$i",
          'sTutorIcon' => '/images/tutor_icons/tutor_default.png',
          'sPupil' => "Pupil-$i",
          'sPupilIcon' => '/images/pupil_icons/pupil_default.gif'
        );
        
      }
      
      $aViewData = array(
        'sUserEmail' => 'user@domain.net',
        'aSessionList' => $aSessionList
      );
      
      return $this->render('EducationVisualFeedbackBundle:Tutor:index.html.php', $aViewData);
    }
    
    public function testAction()
    {
        $aViewData = array(
      );
        return $this->render('EducationVisualFeedbackBundle:Tutor:index.html.php', $aViewData);
    }
}

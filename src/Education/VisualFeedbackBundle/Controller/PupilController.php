<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

use Education\VisualFeedbackBundle\Entity\PupilAnswer;

class PupilController extends Controller {
    
  public function indexAction() {
    $aViewData = array(
      'name' => 'Pupil'
    );
    
    return $this->render('EducationVisualFeedbackBundle:Pupil:index.html.php', $aViewData);
  }
  
  public function lessonAction() {
    $oRequest = $this->getRequest();
    $sHash = $oRequest->get('sHash');
    
    
    $aViewData = array(
      'sHash' => $sHash
    );
    
    return $this->render('EducationVisualFeedbackBundle:Pupil:lesson.html.php', $aViewData);
  }
  
  public function navigateSessionAction() {
    $oRequest = $this->getRequest();
    $sHash = $oRequest->get('sHash');
    $sDir = $oRequest->get('sDir');
    
    $oEntityManager = $this->getDoctrine()->getEntityManager();
    
    $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutoringsession');
    $oSession = $oRepository->findOneByHash($sHash);
    $iCurrentQuestion = $oSession->getCurrentQuestion();
    
    $oLesson = $oSession->getLesson();
      
      
      
    $oQueryBuilder = $oEntityManager->createQueryBuilder();
    $aRecordList = $oQueryBuilder
      ->select('q')
      ->from('EducationVisualFeedbackBundle:Question', 'q')
      ->where("q.lesson = :lesson")
      ->setParameter('lesson', $oLesson->getId())
      ->getQuery()
      ->getResult();
    
    $iTotalQuestions = count($aRecordList);
    
    
    switch ($sDir) {
      case 'prev':
        $iCurrentQuestion = max(1, $iCurrentQuestion - 1);
        break;
      
      case 'next':
        $iCurrentQuestion = min($iTotalQuestions, $iCurrentQuestion + 1);
        break;
    }
    
    $oSession->setCurrentQuestion($iCurrentQuestion);
    $oEntityManager->persist($oSession);
    $oEntityManager->flush();
    
    $aViewData = array(
      'bSuccess' => 'success',
      'iCurrentQuestion' => $iCurrentQuestion,
      'bFirst' => $iCurrentQuestion == 1,
      'bLast' => $iCurrentQuestion == $iTotalQuestions
    );
    
    $oResponse = new Response(json_encode($aViewData));
    
    return $oResponse;
  }

  public function answerAction() {
    $oRequest = $this->getRequest();
    $sHash = $oRequest->get('sHash');
    $sAnswer = $oRequest->get('sAnswer');
    $sType = $oRequest->get('sType');
    
    $oEntityManager = $this->getDoctrine()->getEntityManager();
    $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutoringsession');
    $oSession = $oRepository->findOneByHash($sHash);
    
    $oLesson = $oSession->getLesson();
        
    $oQueryBuilder = $oEntityManager->createQueryBuilder();
    $oQuestion = $oQueryBuilder
      ->select('q')
      ->from('EducationVisualFeedbackBundle:Question', 'q')
      ->where("q.lesson = :lesson")
      ->andWhere("q.orderIndex = :order_index")
      ->setParameter('lesson', $oLesson->getId())
      ->setParameter('order_index', $oSession->getCurrentQuestion())
      ->getQuery()
      ->getSingleResult();

    $oQueryBuilder = $oEntityManager->createQueryBuilder();
    $aRecordList = $oQueryBuilder
      ->select('a')
      ->from('EducationVisualFeedbackBundle:Pupilanswer', 'a')
      ->where("a.question = :question_id")
      ->andWhere("a.tutoringsession = :session_id")
      ->setParameter('question_id', $oQuestion->getId())
      ->setParameter('session_id', $oSession->getId())
      ->getQuery()
      ->getResult();
    
    $oAnswer = null;
    if (empty($aRecordList)) {
      $oAnswer = new PupilAnswer();
    }
    else {
      $oAnswer = $aRecordList[0];
    }
    
    $oAnswer->setTimestamp(time());
    $oAnswer->setTutoringSession($oSession);
    $oAnswer->setQuestion($oQuestion);
    switch ($sType) {
      case 'image':
        $oAnswer->setImageAnswer($sAnswer);
        break;
        
      case 'text':
        $oAnswer->setTextAnswer($sAnswer);
        break;
    }
    $oEntityManager->persist($oAnswer);
    $oEntityManager->flush();
    
    $aViewData = array(
      'bSuccess' => 'success'
    );
    
    $oResponse = new Response(json_encode($aViewData));
    
    return $oResponse;
  }
}























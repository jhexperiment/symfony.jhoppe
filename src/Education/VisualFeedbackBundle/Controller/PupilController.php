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
    
    
    $oEntityManager = $this->getDoctrine()->getEntityManager();
    
    $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutoringsession');
    $oSession = $oRepository->findOneByHash($sHash);
    
    $oLesson = $oSession->getLesson();
    $oPupil = $oSession->getPupil();
    $oPupilImage = $oPupil->getImage();
    $oTutor = $oSession->getTutor();
    $oTutorImage = $oTutor->getImage();
    
    $oQueryBuilder = $oEntityManager->createQueryBuilder();
    $aResultList = $oQueryBuilder
      ->select('q')
      ->from('EducationVisualFeedbackBundle:Question', 'q')
      ->where("q.lesson = :lesson")
      ->setParameter('lesson', $oLesson->getId())
      ->getQuery()
      ->getResult();
    
    
    $aQuestionList = array();
    foreach($aResultList as $oQuestion) {
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      $aAnswerList = $oQueryBuilder
        ->select('a')
        ->from('EducationVisualFeedbackBundle:Pupilanswer', 'a')
        ->where("a.tutoringsession = :tutoringSession")
        ->andWhere("a.question = :question")
        ->setParameter('tutoringSession', $oSession->getId())
        ->setParameter('question', $oQuestion->getId())
        ->getQuery()
        ->getResult();
      $oAnswer = empty($aAnswerList) ? null : $aAnswerList[0];
      
      $oImage = $oQuestion->getImage();
      $iOrderIndex = $oQuestion->getOrderIndex();
      $aQuestionList[$iOrderIndex] = array(
        'iId' => $oQuestion->getId(),
        'iOrderIndex' => $iOrderIndex,
        'sName' => $oQuestion->getName(),
        'sText' => $oQuestion->getText(),
        'sType' => $oQuestion->getType(),
        'aImage' => array(
          'iId' => $oImage->getId(),
          'sLabel' => $oImage->getLabel(),
          'sFilename' => $oImage->getFilename(),
          'sWebPath' => $oImage->getWebPath() . '/' . $oImage->getFilename()
        ),
        'aAnswer' => array(
          'iId' => ($oAnswer == null) ? null : $oAnswer->getId(),
          'sImageAnswer' => ($oAnswer == null) ? null : $oAnswer->getImageAnswer(),
          'sTextAnswer' => ($oAnswer == null) ? null : $oAnswer->getTextAnswer(),
          'iTimestamp' => ($oAnswer == null) ? null : $oAnswer->getTimestamp()
        )
      );
    }
    
    $aSession = array(
      'iId' => $oSession->getId(),
      'sHash' => $oSession->getHash(),
      'iCurrentQuestion' => $oSession->getCurrentQuestion(),
      'sStatus' => $oSession->getStatus(),
      'aLesson' => array(
        'iId' => $oLesson->getId(),
        'sName' => $oLesson->getName(),
        'sSubject' => $oLesson->getSubject(),
        'sLessonPlan' => $oLesson->getLessonPlan(),
        'iQuestionCount' => count($aQuestionList),
        'aQuestionList' => $aQuestionList
      ),
      'aTutor' => array(
        'iId' => $oTutor->getId(),
          'sFirstName' => $oTutor->getFirstName(),
          'sMiddleName' => $oTutor->getMiddleName(),
          'sLastName' => $oTutor->getLastName(),
          'aImage' => array(
            'iId' => $oTutorImage->getId(),
            'sLabel' => $oTutorImage->getLabel(),
            'sFilename' => $oTutorImage->getFilename(),
            'sWebPath' => $oTutorImage->getWebPath() . '/' . $oTutorImage->getFilename()
          )
      ),
      'aPupil' => array(
        'iId' => $oPupil->getId(),
        'sFirstName' => $oPupil->getFirstName(),
        'sMiddleName' => $oPupil->getMiddleName(),
        'sLastName' => $oPupil->getLastName(),
        'aImage' => array(
          'iId' => $oPupilImage->getId(),
          'sLabel' => $oPupilImage->getLabel(),
          'sFilename' => $oPupilImage->getFilename(),
          'sWebPath' => $oPupilImage->getWebPath() . '/' . $oPupilImage->getFilename()
        )
      )
    );
        
    $aViewData = array(
      'sHash' => $sHash,
      'sSessionJson' => json_encode($aSession)
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
    $aQuestion = $oRequest->get('aQuestion');
    
    $oEntityManager = $this->getDoctrine()->getEntityManager();
    $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutoringsession');
    $oSession = $oRepository->findOneByHash($sHash);
    
    $oLesson = $oSession->getLesson();
    
    $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Question');
    $oQuestion = $oRepository->find($aQuestion['iId']);
    
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
    $oAnswer->setImageAnswer($aQuestion['aAnswer']['sImageAnswer']);
    $oAnswer->setTextAnswer($aQuestion['aAnswer']['sTextAnswer']);

    $oEntityManager->persist($oAnswer);
    $oEntityManager->flush();
    
    $aViewData = array(
      'bSuccess' => 'success'
    );
    
    $oResponse = new Response(json_encode($aViewData));
    
    return $oResponse;
  }
}























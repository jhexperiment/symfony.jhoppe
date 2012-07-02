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


class ConfigController extends Controller {
    
    public function ieAction() {
      
      
      
      $aViewData = array(
        'sWindowTitle' => 'Config'
      );
      
      return $this->render('EducationVisualFeedbackBundle:Config:ie.html.php', $aViewData);
    }
    
    public function indexAction() {
      //error_reporting(E_ALL ^ E_NOTICE);
      
        
      if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
        return $this->redirect($this->generateUrl('config_ie'));
      }
      
      $aPath = array();
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Setting');
      $oSetting = $oRepository->findOneByName('root-web-folder');
      
      if (empty($oSetting)) {
        $oSetting = new Setting();
        $oSetting->setName('root-web-folder');
        $oSetting->setValue('/bundles/visualfeedback');
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      $aPath['root-web-folder'] = $oSetting->getValue();
      
      $oSetting = $oRepository->findOneByName('image-upload-folder');
      if (empty($oSetting)) {
        $oSetting = new Setting();
        $oSetting->setName('image-upload-folder');
        $oSetting->setValue('/images/uploads');
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      $aPath['image-upload-folder'] = $oSetting->getValue();
      
      $oSetting = $oRepository->findOneByName('audio-upload-folder');
      if (empty($oSetting)) {
        $oSetting = new Setting();
        $oSetting->setName('audio-upload-folder');
        $oSetting->setValue('/audio/uploads');
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      $aPath['audio-upload-folder'] = $oSetting->getValue();
      
      $oSetting = $oRepository->findOneByName('tutor-upload-folder');
      if (empty($oSetting)) {
        $oSetting = new Setting();
        $oSetting->setName('tutor-upload-folder');
        $oSetting->setValue('/images/tutor_icons');
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      $aPath['tutor-upload-folder'] = $oSetting->getValue();
      
      $oSetting = $oRepository->findOneByName('pupil-upload-folder');
      if (empty($oSetting)) {
        $oSetting = new Setting();
        $oSetting->setName('pupil-upload-folder');
        $oSetting->setValue('/images/pupil_icons');
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      $aPath['pupil-upload-folder'] = $oSetting->getValue();
      
      $aViewData = array(
        'aPath' => $aPath,
        'sWindowTitle' => 'Config'
        
      );
      
      return $this->render('EducationVisualFeedbackBundle:Config:index.html.php', $aViewData);
    }
    
    //Image
    
    public function uploadImageAction() {
      
      $oResponse = new Response(json_encode(array('success' => true)));
      
      if ( ! empty($_FILES)) {
        $tempFile = $_FILES['Filedata']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
        $targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
        move_uploaded_file($tempFile,$targetFile);
        $sReturn = str_replace($_SERVER['DOCUMENT_ROOT'],'',$targetFile);
        
        $oEntityManager = $this->getDoctrine()->getEntityManager();
        
        
        $oImage = new Image();
        $oImage->setLabel($_FILES['Filedata']['name']);
        $oImage->setType($_REQUEST['type']);
        $oImage->setFilename($_FILES['Filedata']['name']);
        $oImage->setLocalPath($_REQUEST['folder']);
        $oImage->setWebPath($_REQUEST['folder']);
        //$oImage->setWebPath(str_replace('/bundles/visualfeedback/images', '', $_REQUEST['folder']));
        
        $oEntityManager->persist($oImage);
        $oEntityManager->flush();
        
        $aReturn = array(
          'sUrl' => "/$sReturn",
          'iId' => $oImage->getId()
        );
        
        return new Response(json_encode($aReturn));
      }
      
      return $oResponse;
    }
    public function updateImageAction() {
      $oRequest = $this->getRequest();
      $aReturn = array();
      $aReturn['sHash'] = $oRequest->get('sHash');
      $aReturn['sLabel'] = $oRequest->get('sLabel');
      $aReturn['iId'] = intval($oRequest->get('iId'));
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oImage = $oEntityManager
        ->getRepository('EducationVisualFeedbackBundle:Image')
        ->find($aReturn['iId']);
  
      if ( ! $oImage) {
          throw $this->createNotFoundException('No image found for id ' . $iId);
      }
      
      $oImage->setLabel($aReturn['sLabel']);
      $oEntityManager->flush();
      
      $aReturn['bSuccess'] = true;
      
      $oResponse = new Response(json_encode($aReturn));
      return $oResponse;
    }
    /**
     * @Route("/config/list/image.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_image_list")
     */
    public function listImageAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      $sFolder = $oRequest->get('sFolder');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      
      $aRecordList = null;
      if (empty($sSearch)) {
        $aRecordList = $oQueryBuilder
          ->select('i')
          ->from('EducationVisualFeedbackBundle:Image', 'i')
          ->where("i.type = 'upload'")
          ->getQuery()
          ->getArrayResult();
      }
      else {
        $aRecordList = $oQueryBuilder
          ->select('i')
          ->from('EducationVisualFeedbackBundle:Image', 'i')
          ->where("i.type = 'upload'")
          ->andwhere( 
            $oQueryBuilder->expr()->orX(
              $oQueryBuilder->expr()->like('i.filename', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')),
              $oQueryBuilder->expr()->like('i.label', $oQueryBuilder->expr()->literal('%' . $sSearch . '%'))
            ))
          ->getQuery()
          ->getArrayResult();
          
      }
      
      
      
      $aImageList = array();
      foreach ($aRecordList as $aImageInfo) {
        
        $aImageList[] = array(
          'iId' => $aImageInfo['id'],
          'sUrl' => "{$aImageInfo['webPath']}/{$aImageInfo['filename']}",
          'sLabel' => $aImageInfo['label'],
          'sType' => $aImageInfo['type']
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      
      return $oResponse;
    }
    
    //Audio
    
    public function uploadAudioAction() {
      
      $oResponse = new Response(json_encode(array('success' => true)));
      
      if ( ! empty($_FILES)) {
        $tempFile = $_FILES['Filedata']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
        $targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
        move_uploaded_file($tempFile,$targetFile);
        $sReturn = str_replace($_SERVER['DOCUMENT_ROOT'],'',$targetFile);
        
        $oEntityManager = $this->getDoctrine()->getEntityManager();
        
        $oAudio = new Audio();
        $oAudio->setLabel($_FILES['Filedata']['name']);
        $oAudio->setFilename($_FILES['Filedata']['name']);
        
        $oEntityManager->persist($oAudio);
        $oEntityManager->flush();
        
        return new Response(json_encode($sReturn));
      }
      
      return $oResponse;
    }
    public function updateAudioAction() {
      $oRequest = $this->getRequest();
      $aReturn = array();
      $aReturn['sHash'] = $oRequest->get('sHash');
      $aReturn['sLabel'] = $oRequest->get('sLabel');
      $aReturn['iId'] = intval($oRequest->get('iId'));
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oAudio = $oEntityManager
        ->getRepository('EducationVisualFeedbackBundle:Audio')
        ->find($aReturn['iId']);
  
      if ( ! $oAudio) {
          throw $this->createNotFoundException('No audio file found for id ' . $iId);
      }
      
      $oAudio->setLabel($aReturn['sLabel']);
      $oEntityManager->flush();
      
      $aReturn['bSuccess'] = true;
      
      $oResponse = new Response(json_encode($aReturn));
      return $oResponse;
    }
    /**
     * @Route("/config/list/image.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_image_list")
     */
    public function listAudioAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      
      $aRecordList = null;
      if (empty($sSearch)) {
        $aRecordList = $oQueryBuilder
          ->select('a')
          ->from('EducationVisualFeedbackBundle:Audio', 'a')
          ->getQuery()
          ->getResult();
      }
      else {
        $aRecordList = $oQueryBuilder
          ->select('a')
          ->from('EducationVisualFeedbackBundle:Audio', 'a')
          ->where( 
            $oQueryBuilder->expr()
              ->like('a.filename', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('a.label', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aAudioList = array();
      foreach ($aRecordList as $oAudio) {
        $aAudioList[] = array(
          'iId' => $oAudio->getId(),
          'sUrl' => '/bundles/visualfeedback/audio/uploads/' . $oAudio->getFilename(),
          'sLabel' => $oAudio->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aAudioList));
      
      return $oResponse;
    }



    //Pupil
    
    /**
     * @Route("/config/list/pupil.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listPupilAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Pupil');
        $aRecordList = $oRepository->findAll();
      }
      else {
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('p')
          ->from('EducationVisualFeedbackBundle:Pupil', 'p')
          ->where( 
            $oQueryBuilder->expr()
              ->like('p.firstName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('p.middleName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('p.lastName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aPupilList = array();
      foreach ($aRecordList as $oPupil) {
        $oImage = $oPupil->getImage();
        $aPupilList[] = array(
          'iId' => $oPupil->getId(),
          'sFirstName' => $oPupil->getFirstname(),
          'sMiddleName' => $oPupil->getMiddlename(),
          'sLastName' => $oPupil->getLastname(),
          'iImageId' => $oImage->getId(),
          'sImageUrl' => $oImage->getWebPath() . '/' . $oImage->getFilename()
        );
      }
      
      $oResponse = new Response(json_encode($aPupilList));
      
      return $oResponse;
    }
    public function createPupilAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
      $oImage = $oRepository->find($oRequest->request->get('iImageId'));
      
      $oPupil = new Pupil();
      $oPupil->setFirstName($oRequest->request->get('sFirstName'));
      $oPupil->setMiddleName($oRequest->request->get('sMiddleName'));
      $oPupil->setLastName($oRequest->request->get('sLastName'));
      
      $oPupil->setImage($oImage); 
      
      $oEntityManager->persist($oPupil);
      $oEntityManager->flush();
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    /**
     * @Route("/config/list/pupil/icon.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listPupilIconAction() {
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $aRecordList = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image') 
        ->createQueryBuilder('i') 
        ->where("i.type = 'pupil_icon'") 
        ->getQuery() 
        ->getResult(); 
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $aImageList[] = array(
          'iId' => $oImage->getId(),
          'sUrl' => $oImage->getWebPath() . '/' . $oImage->getFilename(),
          'sLabel' => $oImage->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }
    
    
    //Tutor
    
    /**
     * @Route("/config/list/tutor.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_tutor_list")
     */
    public function listTutorAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutor');
        $aRecordList = $oRepository->findAll();
      }
      else {
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('t')
          ->from('EducationVisualFeedbackBundle:Tutor', 't')
          ->where( 
            $oQueryBuilder->expr()
              ->like('t.firstName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('t.middleName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('t.lastName', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aTutorList = array();
      foreach ($aRecordList as $oTutor) {
        $oImage = $oTutor->getImage();
        $aTutorList[] = array(
          'iId' => $oTutor->getId(),
          'sFirstName' => $oTutor->getFirstname(),
          'sMiddleName' => $oTutor->getMiddlename(),
          'sLastName' => $oTutor->getLastname(),
          'iImageId' => $oImage->getId(),
          'sImageUrl' => $oImage->getWebPath() . '/' . $oImage->getFilename()
        );
      }
      
      $oResponse = new Response(json_encode($aTutorList));
      
      return $oResponse;
    }
    public function createTutorAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
      
      
      $oImage = $oRepository->find($oRequest->request->get('iImageId'));
      
      $oTutor = new Tutor();
      $oTutor->setFirstName($oRequest->request->get('sFirstName'));
      $oTutor->setMiddleName($oRequest->request->get('sMiddleName'));
      $oTutor->setLastName($oRequest->request->get('sLastName'));
      
      $oTutor->setImage($oImage); 
      
      $oEntityManager->persist($oTutor);
      $oEntityManager->flush();
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    /**
     * @Route("/config/list/tutor/icon.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listTutorIconAction() {
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $aRecordList = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image') 
        ->createQueryBuilder('i') 
        ->where("i.type = 'tutor_icon'") 
        ->getQuery() 
        ->getResult(); 
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $aImageList[] = array(
          'iId' => $oImage->getId(),
          'sUrl' => $oImage->getWebPath() . '/' . $oImage->getFilename(),
          'sLabel' => $oImage->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }
    public function updateTutorAction() {
      $oRequest = $this->getRequest();
      $aReturn = array();
      $aReturn['iTutorId'] = intval($oRequest->get('iTutorId'));
      $aReturn['iImageId'] = intval($oRequest->get('iImageId'));
      $aReturn['sFirstName'] = $oRequest->get('sFirstName');
      $aReturn['sMiddleName'] = $oRequest->get('sMiddleName');
      $aReturn['sLastName'] = $oRequest->get('sLastName');
      
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oTutor = $oEntityManager
        ->getRepository('EducationVisualFeedbackBundle:Tutor')
        ->findOneById($aReturn['iTutorId']);
      
      $oImage = $oEntityManager
        ->getRepository('EducationVisualFeedbackBundle:Image')
        ->findOneById($aReturn['iImageId']);
        
      
      $oTutor->setFirstName($aReturn['sFirstName']);
      $oTutor->setMiddleName($aReturn['sMiddleName']);
      $oTutor->setLastName($aReturn['sLastName']);
      $oTutor->setImage($oImage);
      
      
      $oEntityManager->persist($oTutor);
      $oEntityManager->flush();
        
      
      $aReturn['bSuccess'] = true;
      
      $oResponse = new Response(json_encode($aReturn));
      return $oResponse;
    }
   
    
    //Subject
    
    /**
     * @Route("/config/list/class.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_tutor_list")
     */
    public function listSubjectAction() {
      $oRequest = $this->getRequest();
      
      $oConnection = $this->get('database_connection');
      
      $oQueryBuilder = $oConnection->createQueryBuilder();
      $oExp = $oQueryBuilder->expr();
      $oQueryBuilder->select('DISTINCT(subject)');
      $oQueryBuilder->from('Lesson', 'l');
      $oQueryBuilder->orderBy('l.subject', 'ASC');
      $aSubjectList = $oConnection->fetchAll($oQueryBuilder->getSql()); 
      
      $oResponse = new Response(json_encode($aSubjectList));
      
      return $oResponse;
      
    }
    public function createSubjectAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      
      $oSubject = new Subject();
      $oSubject->setName($oRequest->request->get('sName'));
      
      
      $oEntityManager->persist($oSubject);
      $oEntityManager->flush();
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    
    //Lesson Plan
    
    /**
     * @Route("/config/list/class.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_tutor_list")
     */
    public function listLessonPlanAction() {
      $oRequest = $this->getRequest();
      
      $oConnection = $this->get('database_connection');
      
      $oQueryBuilder = $oConnection->createQueryBuilder();
      $oExp = $oQueryBuilder->expr();
      $oQueryBuilder->select('DISTINCT(lesson_plan)');
      $oQueryBuilder->from('Lesson', 'l');
      $oQueryBuilder->orderBy('l.lesson_plan', 'ASC');
      $aLessonPlanList = $oConnection->fetchAll($oQueryBuilder->getSql()); 
      
      $oResponse = new Response(json_encode($aLessonPlanList));
      
      return $oResponse;
      
      
      
      
      $aRecordList = array();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch) && empty($sSubjectId)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Lessonplan');
        $aRecordList = $oRepository->findAll();
      }
      else if ( ! empty($sSubjectId)) {
        $iSubjectId = intval($sSubjectId);  
        
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:SubjectLessonplan');
        $aTmpRecordList = $oRepository->findBySubject($iSubjectId);
        foreach ($aTmpRecordList as $oSubjectLessonPlan) {
          $aRecordList[] = $oSubjectLessonPlan->getLessonplan();
        }
      }
      else if ( ! empty($sSearch)){
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('lp')
          ->from('EducationVisualFeedbackBundle:Subject', 'lp')
          ->where( 
            $oQueryBuilder->expr()
              ->like('lp.name', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aLessonPlanList = array();
      foreach ($aRecordList as $oLessonPlan) {
        $aLessonPlanList[] = array(
          'iId' => $oLessonPlan->getId(),
          'sName' => $oLessonPlan->getName()
        );
      }
      
      $oResponse = new Response(json_encode($aLessonPlanList));
      
      return $oResponse;
    }
    public function createLessonPlanAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      
      $oLessonPlan = new Lessonplan();
      $oLessonPlan->setName($oRequest->request->get('sName'));
      $oEntityManager->persist($oLessonPlan);
      $oEntityManager->flush();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Subject');
      $oSubject = $oRepository->find($oRequest->request->get('iSubjectId'));
      
      $oSubjectLessonPlan = new SubjectLessonplan;
      $oSubjectLessonPlan->setSubject($oSubject);
      $oSubjectLessonPlan->setLessonplan($oLessonPlan);
      $oEntityManager->persist($oSubjectLessonPlan);
      $oEntityManager->flush();
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    
    //Lesson
    
    /**
     * @Route("/config/list/lesson.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listLessonAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      /*
      $oConnection = $this->get('database_connection');
      
      //$aRecordList = array();
      //$oEntityManager = $this->getDoctrine()->getEntityManager();
      $sSql = 
        'SELECT l.id AS iId, l.name AS sName, ' . 
          's.name AS sSubject, s.id AS iSubjectId, ' .
          'lp.name AS sLessonPlan, lp.id AS iLessonPlanId ' .
        'FROM Lesson AS l ' .
        'LEFT JOIN LessonPlan_Lesson AS lp_l ON (l.id = lp_l.Lesson_id) ' .
        'LEFT JOIN Subject_LessonPlan AS s_lp ON (s_lp.id = lp_l.Subject_LessonPlan_id) ' .
        'LEFT JOIN Subject AS s ON (s.id = s_lp.Subject_id) ' .
        'LEFT JOIN LessonPlan AS lp ON (lp.id = s_lp.LessonPlan_id) ' .
        'WHERE 1 = 1 ';
      
      $aLessonList = array();
      if ( ! empty($sLessonPlanId)) {
        $sSql .= "AND lp.id = '$sLessonPlanId' ";
      }
      
      if ( ! empty($sSubjectId)) {
        $sSql .= "AND s.id = '$sSubjectId' ";
      }
      
      if ( ! empty($sSearch)) {
        $sSql .= "AND l.name LIKE '%$sSearch%' ";
      }
      
      $sSql .= 'ORDER BY s.name ASC, lp.name ASC';
      
      $aLessonList = $oConnection->fetchAll($sSql); 
      */
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      
      $aRecordList = null;
      if (empty($sSearch)) {
        $aRecordList = $oQueryBuilder
          ->select('l')
          ->from('EducationVisualFeedbackBundle:Lesson', 'l')
          ->getQuery()
          ->getArrayResult();
      }
      else {
        $aRecordList = $oQueryBuilder
          ->select('l')
          ->from('EducationVisualFeedbackBundle:Lesson', 'l')
          ->where( 
            $oQueryBuilder->expr()->orX(
              $oQueryBuilder->expr()->like('l.name', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')),
              $oQueryBuilder->expr()->like('l.subject', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')),
              $oQueryBuilder->expr()->like('l.lessonPlan', $oQueryBuilder->expr()->literal('%' . $sSearch . '%'))
            ))
          ->getQuery()
          ->getArrayResult();
      }
      
      $oResponse = new Response(json_encode($aRecordList));
      
      return $oResponse;
       
    }
    public function listLessonImageAction() {
      $oRequest = $this->getRequest();
      $sId = $oRequest->get('sId');
      
      $oConnection = $this->get('database_connection');
      
      $sSql = 
        'SELECT q.order_index AS iIndex, i.id AS iImageId, ' .
        'q.id AS iQuestionId, q.name AS sLabel, q.text AS sText, ' .
        "CONCAT(i.web_path, '/', i.filename) AS sUrl " .
        'From Question AS q ' .
        'LEFT JOIN Image AS i ON (i.id = q.Image_id) ' .
        "WHERE q.Lesson_id = $sId " .
        'ORDER BY q.order_index';
      
      $aLessonImageList = $oConnection->fetchAll($sSql); 
      
      $oResponse = new Response(json_encode($aLessonImageList));
      
      return $oResponse;
       
    }
    public function createLessonAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $sType = $oRequest->request->get('sType');
      
      $oLesson = new Lesson();
      $oLesson->setName($oRequest->request->get('sName'));
      $oLesson->setSubject($oRequest->request->get('sSubject'));
      $oLesson->setLessonPlan($oRequest->request->get('sLessonPlan'));
      $oEntityManager->persist($oLesson);
      $oEntityManager->flush();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
      $aQuestionList = $oRequest->request->get('aQuestionList');
      foreach ($aQuestionList as $aQuestion) {
        $oImage = $oRepository->find($aQuestion['iImageId']);
        
        $oQuestion = new Question();
        $oQuestion->setOrderIndex(intval($aQuestion['iIndex']));
        $oQuestion->setName($aQuestion['sText']);
        $oQuestion->setText($aQuestion['sText']);
        $oQuestion->setType($sType);
        $oQuestion->setImage($oImage);
        $oQuestion->setLesson($oLesson);
        $oEntityManager->persist($oQuestion);
        $oEntityManager->flush();
      }
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    public function updateLessonAction() {
      $oRequest = $this->getRequest();
      $aReturn = array();
      $aReturn['sType'] = $oRequest->get('sType');
      $aReturn['iLessonId'] = intval($oRequest->get('iLessonId'));
      $aReturn['sName'] = $oRequest->get('sName');
      $aReturn['sSubject'] = $oRequest->get('sSubject');
      $aReturn['sLessonPlan'] = $oRequest->get('sLessonPlan');
      
      $aQuestionList = $oRequest->get('aQuestionList');
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oLesson = $oEntityManager
        ->getRepository('EducationVisualFeedbackBundle:Lesson')
        ->findOneById($aReturn['iLessonId']);
      
      $oLesson->setName($aReturn['sName']);
      $oLesson->setSubject($aReturn['sSubject']);
      $oLesson->setLessonPlan($aReturn['sLessonPlan']);
      $oEntityManager->persist($oLesson);
      $oEntityManager->flush();
        
      $sSql = "
        DELETE FROM Question 
        WHERE Lesson_id = {$aReturn['iLessonId']}
      ";
      
      $oConnection = $this->get('database_connection');
      $oConnection->query($sSql);
      
      
      $oImageRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
      $oQuestionRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Question');
      foreach ($aQuestionList as $aQuestion) {
        $oImage = $oImageRepository->find(intval($aQuestion['iImageId']));
        
        $oQuestion = new Question();
        $oQuestion->setOrderIndex(intval($aQuestion['iIndex']));
        $oQuestion->setName($aQuestion['sText']);
        $oQuestion->setText($aQuestion['sText']);
        $oQuestion->setType($aReturn['sType']);
        $oQuestion->setImage($oImage);
        $oQuestion->setLesson($oLesson);
        $oEntityManager->persist($oQuestion);
        $oEntityManager->flush();
      }
      
      /*
      if ( ! $oImage) {
          throw $this->createNotFoundException('No lesson found for id ' . $iId);
      }
      
      $oImage->setLabel($aReturn['sLabel']);
      $oEntityManager->flush();
      */
      $aReturn['bSuccess'] = true;
      
      $oResponse = new Response(json_encode($aReturn));
      return $oResponse;
    }
   /**
     * @Route("/config/list/lesson.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function getLessonAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Lesson');
        $aRecordList = $oRepository->findAll();
      }
      else {
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('l')
          ->from('EducationVisualFeedbackBundle:Lesson', 'l')
          ->where( 
            $oQueryBuilder->expr()
              ->like('l.name', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aLessonList = array();
      foreach ($aRecordList as $oLesson) {
        $aLessonList[] = array(
          'iId' => $oLesson->getId(),
          'sName' => $oLesson->getName()
        );
      }
      
      $oResponse = new Response(json_encode($aLessonList));
      
      return $oResponse;
    }

    
    //Session

    /**
     * @Route("/config/list/session.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listSessionAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      
      
      
      $aRecordList = null;
      if (empty($sSearch)) {
        $aRecordList = $oQueryBuilder
          ->select('s')
          ->from('EducationVisualFeedbackBundle:Tutoringsession', 's')
          ->getQuery()
          ->getResult();
      }
      else {
        $aRecordList = $oQueryBuilder
          ->select('s')
          ->from('EducationVisualFeedbackBundle:Tutoringsession', 's')
          ->leftJoin('s.Tutor', 't', 'WITH', 't.name = ' . $oQueryBuilder->expr()->literal('%' . $sSearch . '%'))
          ->leftJoin('s.Pupil', 'p', 'WITH', 'p.name = ' . $oQueryBuilder->expr()->literal('%' . $sSearch . '%'))
          ->leftJoin('s.Lesson', 'l', 'WITH', 'l.name = ' . $oQueryBuilder->expr()->literal('%' . $sSearch . '%'))
          ->getQuery()
          ->getResult();
      }
      
      
      
      $aSessionList = array();
      foreach ($aRecordList as $oSession) {
        $oTutor = $oSession->getTutor();
        $oTutorIcon = $oTutor->getImage();
        
        $oPupil = $oSession->getPupil();
        $oPupilIcon = $oPupil->getImage();
        
        $oLesson = $oSession->getLesson();
        
        $iCurrentQuestion = $oSession->getCurrentQuestion();
        
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aList = $oQueryBuilder
          ->select('q')
          ->from('EducationVisualFeedbackBundle:Question', 'q')
          ->where("q.lesson = :lesson")
          ->setParameter('lesson', $oLesson->getId())
          ->getQuery()
          ->getResult();
          
        $aCurrentQuestion = null;
        $aPercentList = array(
          'aImage' => array(
            'iCorrect' => 0,
            'iIncorrect' => 0,
            'iSkipped' => 0
          ),
          'aText' => array(
            'iCorrect' => 0,
            'iIncorrect' => 0,
            'iSkipped' => 0
          )
        );
        $aQuestionList = array();
        foreach ($aList as $oQuestion) {
          $oQueryBuilder = $oEntityManager->createQueryBuilder();
          $aAnswerList = $oQueryBuilder
            ->select('a')
            ->from('EducationVisualFeedbackBundle:Pupilanswer', 'a')
            ->where("a.tutoringsession = :tutoring_session")
            ->andWhere("a.question = :question")
            ->setParameter('tutoring_session', $oSession->getId())
            ->setParameter('question', $oQuestion->getId())
            ->getQuery()
            ->getResult();
          
          $oAnswer = null;
          $sImageAnswer = '';
          $sTextAnswer = '';
          if ( ! empty($aAnswerList)) {
            $oAnswer = $aAnswerList[0];
            $sImageAnswer = $oAnswer->getImageAnswer();
            $sTextAnswer = $oAnswer->getTextAnswer();
          }
           
          $aPercentList['aImage']['iCorrect'] += ($sImageAnswer == 'yes') ? 1 : 0;
          $aPercentList['aImage']['iIncorrect'] += ($sImageAnswer == 'no') ? 1 : 0;
          $aPercentList['aImage']['iSkipped'] += ($sImageAnswer == '') ? 1 : 0;
          
          $aPercentList['aText']['iCorrect'] += ($sTextAnswer == 'yes') ? 1 : 0;
          $aPercentList['aText']['iIncorrect'] += ($sTextAnswer == 'no') ? 1 : 0;
          $aPercentList['aText']['iSkipped'] += ($sTextAnswer == '') ? 1 : 0;
                   
          $oQuestionIcon = $oQuestion->getImage();
          $aQuestion = array(
            'iQuestionId' => $oQuestion->getId(),
            'iOrderIndex' => $oQuestion->getOrderIndex(),
            'sIconUrl' => $oQuestionIcon->getWebPath() . '/' . $oQuestionIcon->getFilename(),
            'sText' => $oQuestion->getText(),
            'sImageAnswer' => empty($sImageAnswer) ? '&nbsp;' : $sImageAnswer,
            'sTextAnswer' => empty($sTextAnswer) ? '&nbsp;' : $sTextAnswer
          );
          
          if ($aQuestion['iOrderIndex'] == $iCurrentQuestion) {
            $aCurrentQuestion = $aQuestion;
          }
          
          $aQuestionList[] = $aQuestion;
        }
        
        $aSessionList[] = array(
          'iSessionId' => $oSession->getId(),
          'sHash' => $oSession->getHash(),
          'sStatus' => $oSession->getStatus(),
          'aCurrentQuestion' => $aCurrentQuestion,
          'aQuestionList' => $aQuestionList,
          'aPercentList' => $aPercentList,
          'aTutor' => array(
            'iTutorId' => $oTutor->getId(),
            'sFirstName' => $oTutor->getFirstName(),
            'sMiddleName' => $oTutor->getMiddleName(),
            'sLastName' => $oTutor->getLastName(),
            'sIconUrl' => $oTutorIcon->getWebPath() . '/' . $oTutorIcon->getFilename()
          ),
          'aPupil' => array(
            'iPupilId' => $oPupil->getId(),
            'sFirstName' => $oPupil->getFirstName(),
            'sMiddleName' => $oPupil->getMiddleName(),
            'sLastName' => $oPupil->getLastName(),
            'sIconUrl' => $oPupilIcon->getWebPath() . '/' . $oPupilIcon->getFilename()
          ),
          'aLesson' => array(
            'iLessonId' => $oLesson->getId(),
            'sName' => $oLesson->getName(),
            'sSubject' => $oLesson->getSubject(),
            'sLessonPlan' => $oLesson->getLessonPlan()
          )
          
        );
      }
      
      $oResponse = new Response(json_encode($aSessionList));
      
      return $oResponse;
    }
    public function createSessionAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutor');
      $oTutor = $oRepository->findOneById($oRequest->request->get('iTutorId'));
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Pupil');
      $oPupil = $oRepository->findOneById($oRequest->request->get('iPupilId'));
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Lesson');
      $oLesson = $oRepository->findOneById($oRequest->request->get('iLessonId'));
      
      
      
      $oSession = new TutoringSession();
      $oSession->setHash(uniqid());
      $oSession->setStatus('New');
      $oSession->setCurrentQuestion(1);
      $oSession->setPupil($oPupil);
      $oSession->setTutor($oTutor);
      $oSession->setLesson($oLesson);
      
      $oEntityManager->persist($oSession);
      $oEntityManager->flush();
      
      
      $oResponse = new Response(json_encode(array('success' => true)));
      return $oResponse;
    }
    public function getSessionAction() {
      $oRequest = $this->getRequest();
      $sHash = $oRequest->get('sHash');
      $iCurrentQuestion = intval($oRequest->get('iCurrentQuestion'));
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oQueryBuilder = $oEntityManager->createQueryBuilder();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Tutoringsession');
      $oSession = $oRepository->findOneByHash($sHash);
      
     
      
      /*  
      $bContinue = true;
      do {
        $oSession = $oRepository->findOneByHash($sHash);
        $bContinue = ($oSession->getCurrentQuestion() == $iCurrentQuestion);
        sleep(1);
      } while ($bContinue);
      
      $bContinue = true;
      $iCounter = 0;
      $atmp = array();
      while ($bContinue) {
        //$oEntityManager->flush();
        //$oSession = $oRepository->findOneByHash($sHash);
       
        $aRecordList = $oQueryBuilder
          ->select('s')
          ->from('EducationVisualFeedbackBundle:Tutoringsession', 's')
          ->where("s.hash = '{$sHash}'")
          ->getQuery()
          ->getResult();
        
        $oSession = $aRecordList[0];
        
        $iSessionQuestion = $oSession->getCurrentQuestion();
        $atmp[] = "{$iCounter} - {$iSessionQuestion}";
        if ($iSessionQuestion != $iCurrentQuestion) {
          $bContinue = false;
        }
        
        if ($iCounter > 20) {
          $bContinue = false;
        }
        
        $iCounter++;
        //sleep(1);
        usleep(500000);
      }
      */
      $aSession = null;
      if ($oSession->getCurrentQuestion() != $iCurrentQuestion) {
          
        $oTutor = $oSession->getTutor();
        $oTutorIcon = $oTutor->getImage();
        
        $oPupil = $oSession->getPupil();
        $oPupilIcon = $oPupil->getImage();
        
        $oLesson = $oSession->getLesson();
        
        
        
        $oQuestion = $oQueryBuilder
          ->select('q')
          ->from('EducationVisualFeedbackBundle:Question', 'q')
          ->where("q.lesson = :lesson")
          ->andWhere("q.orderIndex = :order_index")
          ->setParameter('lesson', $oLesson->getId())
          ->setParameter('order_index', $oSession->getCurrentQuestion())
          ->getQuery()
          ->getSingleResult();
        
          
        $oQuestionIcon = $oQuestion->getImage();
        $aSession = array(
          'iSessionId' => $oSession->getId(),
          'sHash' => $oSession->getHash(),
          'sStatus' => $oSession->getStatus(),
          'iCurrentQuestion' => $oSession->getCurrentQuestion(),
          'aQuestion' => array(
            'sIconUrl' => $oQuestionIcon->getWebPath() . '/' . $oQuestionIcon->getFilename(),
            'sText' => $oQuestion->getText()
          ),
          'aTutor' => array(
            'iTutorId' => $oTutor->getId(),
            'sFirstName' => $oTutor->getFirstName(),
            'sMiddleName' => $oTutor->getMiddleName(),
            'sLastName' => $oTutor->getFirstName(),
            'sIconUrl' => $oTutorIcon->getWebPath() . '/' . $oTutorIcon->getFilename()
          ),
          'aPupil' => array(
            'iPupilId' => $oPupil->getId(),
            'sFirstName' => $oPupil->getFirstName(),
            'sMiddleName' => $oPupil->getMiddleName(),
            'sLastName' => $oPupil->getFirstName(),
            'sIconUrl' => $oPupilIcon->getWebPath() . '/' . $oPupilIcon->getFilename()
          ),
          'aLesson' => array(
            'iLessonId' => $oLesson->getId(),
            'sName' => $oLesson->getName(),
            'sSubject' => $oLesson->getSubject(),
            'sLessonPlan' => $oLesson->getLessonPlan()
          )
          
        );
      }
      
      $oResponse = new Response(json_encode($aSession));
      
      return $oResponse;
    }
    
    //Setting
    public function listSettingAction() {
      
    }
    
    public function updateSettingAction() {
      $oRequest = $this->getRequest();
      $aSettingList = $oRequest->get('aSettingList');
      print_r($aSettingList);
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Setting');
      foreach ($aSettingList as $aSetting) {
        $oSetting = $oRepository->findOneByName($aSetting['sName']);
        $oSetting->setValue($aSetting['sValue']);
        $oEntityManager->persist($oSetting);
        $oEntityManager->flush();
      }
      
      $oResponse = new Response(json_encode(array('success' => true)));
      $oResponse->headers->set('Content-Type', 'application/json');
      return $oResponse;
      
    }
} 






















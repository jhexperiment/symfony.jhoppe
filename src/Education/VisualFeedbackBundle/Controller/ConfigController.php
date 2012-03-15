<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;


use Education\VisualFeedbackBundle\Entity\Image;
use Education\VisualFeedbackBundle\Entity\Imagefolder;
use Education\VisualFeedbackBundle\Entity\Tutor;
use Education\VisualFeedbackBundle\Entity\Pupil;
use Education\VisualFeedbackBundle\Entity\Subject;
use Education\VisualFeedbackBundle\Entity\SubjectLessonplan;
use Education\VisualFeedbackBundle\Entity\Lessonplan;
use Education\VisualFeedbackBundle\Entity\LessonplanLesson;
use Education\VisualFeedbackBundle\Entity\Lesson;
use Education\VisualFeedbackBundle\Entity\Imagequestion;
use Education\VisualFeedbackBundle\Entity\LessonImagequestion;


class ConfigController extends Controller {
    
    public function ieAction() {
        
      
      
      $aViewData = array(
        'sWindowTitle' => 'Config'
      );
      
      return $this->render('EducationVisualFeedbackBundle:Config:ie.html.php', $aViewData);
    }
    
    public function indexAction() {
        
      if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
        return $this->redirect($this->generateUrl('config_ie'));
      }
      
      
      $aViewData = array(
        'sWindowTitle' => 'Config'
      );
      
      return $this->render('EducationVisualFeedbackBundle:Config:index.html.php', $aViewData);
    }
    
    // Image
    
    public function uploadImageAction() {
      
      $oResponse = new Response(json_encode(array('success' => true)));
      
      if ( ! empty($_FILES)) {
        $tempFile = $_FILES['Filedata']['tmp_name'];
        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
        $targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
        move_uploaded_file($tempFile,$targetFile);
        $sReturn = str_replace($_SERVER['DOCUMENT_ROOT'],'',$targetFile);
        
        $em = $this->getDoctrine()->getEntityManager();
        
        $repository = $em->getRepository('EducationVisualFeedbackBundle:Imagefolder');
        $oImageFolder = $repository->findOneByRootPath($_REQUEST['folder']);
        if (empty($oImageFolder)) {
          $oImageFolder = new Imagefolder();
          $oImageFolder->setName(str_replace('/bundles/visualfeedback/images/', '', $_REQUEST['folder']));
          $oImageFolder->setRootPath($_REQUEST['folder']);
          $em->persist($oImageFolder);
          $em->flush();
        }
        
        $oImage = new Image();
        $oImage->setLabel($_FILES['Filedata']['name']);
        $oImage->setFilename($_FILES['Filedata']['name']);
        $oImage->setImagefolder($oImageFolder);
        
        $em->persist($oImage);
        $em->flush();
        
        return new Response(json_encode($sReturn));
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
          ->leftJoin('i.imagefolder', 'f')
          ->where("f.name = '$sFolder'")
          ->getQuery()
          ->getResult();
      }
      else {
        $aRecordList = $oQueryBuilder
          ->select('i')
          ->from('EducationVisualFeedbackBundle:Image', 'i')
          ->leftJoin('i.imagefolder', 'f')
          ->where( 
            $oQueryBuilder->expr()
              ->like('i.filename', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('i.label', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->andwhere("f.name = '$sFolder'")
          ->getQuery()
          ->getResult();
      }
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $oImageFolder = $oImage->getImagefolder();
        $aImageList[] = array(
          'iId' => $oImage->getId(),
          'sUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename(),
          'sLabel' => $oImage->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      
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
        $oImageFolder = $oImage->getImagefolder();
        $aPupilList[] = array(
          'iId' => $oPupil->getId(),
          'sFirstName' => $oPupil->getFirstname(),
          'sMiddleName' => $oPupil->getMiddlename(),
          'sLastName' => $oPupil->getLastname(),
          'iImageId' => $oImage->getId(),
          'sImageUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename()
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
        ->leftJoin('i.imagefolder', 'f')
        ->where("f.name = 'pupil_icons'") 
        ->getQuery() 
        ->getResult(); 
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $oImageFolder = $oImage->getImagefolder();
        $aImageList[] = array(
          'iId' => $oImage->getId(),
          'sUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename(),
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
        $oImageFolder = $oImage->getImagefolder();
        $aTutorList[] = array(
          'iId' => $oTutor->getId(),
          'sFirstName' => $oTutor->getFirstname(),
          'sMiddleName' => $oTutor->getMiddlename(),
          'sLastName' => $oTutor->getLastname(),
          'iImageId' => $oImage->getId(),
          'sImageUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename()
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
        ->leftJoin('i.imagefolder', 'f')
        ->where("f.name = 'tutor_icons'") 
        ->getQuery() 
        ->getResult(); 
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $oImageFolder = $oImage->getImagefolder();
        $aImageList[] = array(
          'iId' => $oImage->getId(),
          'sUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename(),
          'sLabel' => $oImage->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }

    
    //Subject
    
    /**
     * @Route("/config/list/class.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_tutor_list")
     */
    public function listSubjectAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Subject');
        $aRecordList = $oRepository->findAll();
      }
      else {
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('s')
          ->from('EducationVisualFeedbackBundle:Subject', 's')
          ->where( 
            $oQueryBuilder->expr()
              ->like('s.name', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
      }
      
      $aSubjectList = array();
      foreach ($aRecordList as $oSubject) {
        $aSubjectList[] = array(
          'iId' => $oSubject->getId(),
          'sName' => $oSubject->getName()
        );
      }
      
      $oResponse = new Response(json_encode($aSubjectList));
      
      return $oResponse;
    }
    
    
    //Lesson Plan
    
    /**
     * @Route("/config/list/class.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_tutor_list")
     */
    public function listLessonPlanAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Lessonplan');
        $aRecordList = $oRepository->findAll();
      }
      else {
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
    
    
    //Lesson
    
    /**
     * @Route("/config/list/lesson.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listLessonAction() {
      $aItem = array(
        'id' => '8',
        'lesson_name' => 'RadTadTootin',
        'question_info_list' =>  array(
          array(
            'ImageQuestions_id' => '62',
            'Lessons_id' => '8',
            'LessonPlan_Lessons_id' => '8',
            'Images_id' => '2',
            'icon' => '/bundles/visualfeedback/images/tutor_icons/tutor_default.png',
            'order_index' => '1',
            'text' => 'tutor',
            'Lesson_ImageQuestions_id' => '61'
          )
        )
      );

      $aList = array(
        $aItem
      );
      
      $oResponse = new Response(json_encode($aList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }


    public function createLessonAction() {
      $oRequest = Request::createFromGlobals();
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Subject');
      $oSubject = $oRepository->find($oRequest->request->get('iSubjectId'));
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Lessonplan');
      $oLessonPlan = $oRepository->find($oRequest->request->get('iLessonPlanId'));
      
      $oSubjectLessonPlan = new SubjectLessonplan();
      $oSubjectLessonPlan->setSubject($oSubject);
      $oSubjectLessonPlan->setLessonplan($oLessonPlan);
      $oEntityManager->persist($oSubjectLessonPlan);
      $oEntityManager->flush();
      
      
      $oLesson = new Lesson();
      $oLesson->setName($oRequest->request->get('sName'));
      $oEntityManager->persist($oLesson);
      $oEntityManager->flush();
      
      $oLessonPlanLesson = new LessonplanLesson();
      $oLessonPlanLesson->setLesson($oLesson);
      $oLessonPlanLesson->setSubjectLessonplan($oSubjectLessonPlan);
      $oEntityManager->persist($oLessonPlanLesson);
      $oEntityManager->flush();
      
      
      $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
      $aQuestionList = $oRequest->request->get('aQuestionList');
      foreach ($aQuestionList as $aQuestion) {
        $oImage = $oRepository->find($aQuestion['iImageId']);
        
        $oImageQuestion = new Imagequestion();
        $oImageQuestion->setName($aQuestion['sText']);
        $oImageQuestion->setText($aQuestion['sText']);
        $oImageQuestion->setImage($oImage);
        $oEntityManager->persist($oImageQuestion);
        $oEntityManager->flush();
        
        $oLessonImageQuestion = new LessonImagequestion();
        $oLessonImageQuestion->setOrderIndex($aQuestion['iIndex']);
        $oLessonImageQuestion->setImageQuestion($oImageQuestion);
        $oLessonImageQuestion->setLessonplanLesson($oLessonPlanLesson);
        $oEntityManager->persist($oLessonImageQuestion);
        $oEntityManager->flush();
      }
      
      
      $oResponse = new Response(json_encode(array('success' => true)));
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
      $aItem = array(
        'id' => '2',
        'hash' => 'f80ee1084e630c19cf78c04dfbb5350d',
        'display_content' => 'text',
        'Pupils_id' => '35',
        'Tutors_id' => '2',
        'Lesson_ImageQuestions_id' => '64',
        'StatusCodes_id' => '1',
        'pupil_info' => array(
          'id' => '35',
          'first_name' => 'pupil5',
          'middle_name' => '',
          'last_name' => 'mana',
          'Images_id' => '1',
          'icon' => '/bundles/visualfeedback/images/pupil_icons/pupil_default.gif'
        ),
        'tutor_info' => array(
          'id' => '2',
          'first_name' => 'Seymore',
          'middle_name' => '',
          'last_name' => 'Butts',
          'Images_id' => '21',
          'icon' => '/bundles/visualfeedback/images/uploads/evilmonkey.jpg'
        ),
        'lesson_info' => array(
          'id' => '8',
          'name' => 'RadTadTootin',
          'lesson_name' => 'RadTadTootin',
          'question_info_list' => array(
            array(
            'id' => '61',
            'name' => null,
            'text' => 'aligator',
            'Images_id' => '3',
            'icon' => '/images/uploads/aligator.jpg'
            ),
            array(
            'id' => '62',
            'name' => null,
            'text' => 'tutor',
            'Images_id' => '2',
            'icon' => '/bundles/visualfeedback/images/tutor_icons/tutor_default.png'
            ),
            array(
            'id' => '63',
            'name' => null,
            'text' => 'tiger',
            'Images_id' => '6',
            'icon' => '/bundles/visualfeedback/images/uploads/tiger.jpg'
            )
          )
        )

      );

      $aList = array(
        $aItem
      );
      
      $oResponse = new Response(json_encode($aList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }
}






















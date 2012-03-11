<?php

namespace Education\VisualFeedbackBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Education\VisualFeedbackBundle\Entity\Image;
use Education\VisualFeedbackBundle\Entity\Imagefolder;


class ConfigController extends Controller {
    
    public function indexAction() {
        
      
      
      $aViewData = array(
        
      );
      
      return $this->render('EducationVisualFeedbackBundle:Config:index.html.php', $aViewData);
    }
    
    public function uploadImageAction() {
      
      $oResponse = new Response(json_encode('blah'));
      
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
          $oImageFolder->setName('upload');
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
    
    /**
     * @Route("/config/list/image.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_image_list")
     */
    public function listImageAction() {
      $oRequest = $this->getRequest();
      $sSearch = $oRequest->get('sSearch');
      
      
      $oEntityManager = $this->getDoctrine()->getEntityManager();
      if (empty($sSearch)) {
        $oRepository = $oEntityManager->getRepository('EducationVisualFeedbackBundle:Image');
        $aRecordList = $oRepository->findAll();
      }
      else {
        $sSql = 
          'SELECT i ' +
          'FROM EducationVisualFeedbackBundle:Image i ' + 
          'WHERE i.label LIKE :label ' +
            'OR i.name LIKE :name ' +
          'ORDER BY i.name ASC';
        
        $oQueryBuilder = $oEntityManager->createQueryBuilder();
        $aRecordList = $oQueryBuilder
          ->select('i')
          ->from('EducationVisualFeedbackBundle:Image', 'i')
          ->where( 
            $oQueryBuilder->expr()
              ->like('i.filename', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->orwhere( 
            $oQueryBuilder->expr()
              ->like('i.label', $oQueryBuilder->expr()->literal('%' . $sSearch . '%')) 
          )
          ->getQuery()
          ->getResult();
        
        
        /*
        $oQuery = $oEntityManager->createQuery($sSql)->setParameters(array(
          'name' => $sSearch,
          'label' => $sSearch
        ));
        
        
        $aRecordList = $oQuery->getResult();
        */
      }
      
      $aImageList = array();
      foreach ($aRecordList as $oImage) {
        $oImageFolder = $oImage->getImagefolder();
        $aImageList[] = array(
          'sUrl' => $oImageFolder->getRootPath() . '/' . $oImage->getFilename(),
          'sLabel' => $oImage->getLabel()
        );
      }
      
      $oResponse = new Response(json_encode($aImageList));
      
      return $oResponse;
    }
    
    /**
     * @Route("/config/list/pupil.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listPupilAction() {
      $aItem = array(
        'id' => '30',
        'first_name' => 'Less ',
        'middle_name' => 'going on upstairs',
        'last_name' => 'Thanaonestorybuilding',
        'Images_id' => '23',
        'icon' => '/bundles/visualfeedback/images/uploads/evilmonkey.jpg'
      );
      $aList = array(
        $aItem
      );
      
      $oResponse = new Response(json_encode($aList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }
    
    /**
     * @Route("/config/list/pupil.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function listTutorAction() {
      $aItem = array(
        'id' => '2',
        'first_name' => 'Seymore',
        'middle_name' => '',
        'last_name' => 'Butts',
        'Images_id' => '21',
        'icon' => '/bundles/visualfeedback/images/uploads/evilmonkey.jpg'
      );
      $aList = array(
        $aItem
      );
      
      $oResponse = new Response(json_encode($aList));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }

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

   /**
     * @Route("/config/list/lesson.{_format}", defaults={"_format"="json"}, requirements={"_format"="json|xml"}, name="_pupil_list")
     */
    public function getLessonAction() {
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

      
      
      $oResponse = new Response(json_encode($aItem));
      //$oResponse->headers->set('Content-Type', 'application/json');
      
      return $oResponse;
    }

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

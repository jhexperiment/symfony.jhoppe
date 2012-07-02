<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/pupilLesson.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/pupilLesson.js"></script>

<input id="hash" type="hidden" value="<?=$sHash?>" />

<div class="view-container">
  <div id="lesson" class="view">
    <div class="head">
      
      <div class="title">Lesson</div>
      
    </div>
    <div class="body">
      <div id="display-image">
        <img src="" alt="Image Loading...">
      </div>
      <div id="display-text" class="state-hide">&nbsp;</div>
    </div>
    </div>
  </div>
</div>

<div id="answer-controls">
  <div class="prev-question ui-icon ui-icon-seek-prev ui-state-default" title="Previous Question"></div>
  <div class="content-type ui-icon-seek-next ui-widget ui-button ui-state-default" title="Image/Text Toggle">image</div>
  <div class="next-question ui-icon ui-icon-seek-next ui-state-default" title="Next Question"></div>
  <div class="yes-button ui-widget ui-button ui-state-default">Yes</div>
  <div class="no-button ui-widget ui-button ui-state-default">No</div>
</div>
<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/pupilLesson.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/pupilLesson.js"></script>

<input id="hash" type="hidden" value="<?=$sHash?>" />


<div id="display-image">
  <img src="" alt="Image Loading...">
</div>
<div id="display-text state-hide" class="">&nbsp;</div>


<div id="answer-controls">
  <div class="wrapper">
    <div class="pull-tab">
      <div class="down icon state-hide">
        <div class="row">
          <div class="line long">&nbsp;</div>
        </div>
        <div class="row">
          <div class="line med">&nbsp;</div>
        </div>
        <div class="row">
          <div class="line small">&nbsp;</div>
        </div>
      </div>
      <div class="up icon">
        <div class="row">
          <div class="line small">&nbsp;</div>
        </div>
        <div class="row">
          <div class="line med">&nbsp;</div>
        </div>
        <div class="row">
          <div class="line long">&nbsp;</div>
        </div>
      </div>
    </div>
    <img class="background" src="/bundles/visualfeedback/images/chalkboard.small.png" />
    <div class="prev-question icon" title="Previous Question">Prev</div>
    <div class="content-type icon" title="Image/Text Toggle">Image</div>
    <div class="next-question icon" title="Next Question">Next</div>
    <div class="yes-button icon">Yes</div>
    <div class="no-button icon">No</div>
  </div>
</div>




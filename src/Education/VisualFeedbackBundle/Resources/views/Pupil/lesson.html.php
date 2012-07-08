<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/pupilLesson.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/pupilLesson.js"></script>
<script type="text/javascript">
  var aSessionInfo = <?=$sSessionJson?>;
</script>


<input id="hash" type="hidden" value="<?=$sHash?>" />

<div id="display-image">
  <img src="" alt="Image Loading...">
</div>
<div id="display-text" class="state-hide">&nbsp;</div>


<div id="answer-control-small">
  <div class="wrapper">
    <div class="prev-question arrow-icon" title="Previous Question">&nbsp;</div>
    <div class="center">
      <span>&nbsp;</span>
    </div>
    <div class="next-question arrow-icon" title="Next Question">&nbsp;</div>
  </div>
</div>

<div id="answer-control-large" class="state-hide">
  <div class="wrapper">
    <div class="prev-question arrow-icon" title="Previous Question"></div>
    <div class="center">
      <span class="yes-button button">
        <img id="white" alt="Yes" class="" src="/bundles/visualfeedback/images/check.mark.FFFFFF.png" />
        <img id="green" alt="Yes" class="state-hide" src="/bundles/visualfeedback/images/check.mark.008000.png" />
      </span>
      <span class="no-button button">
        <img id="white" alt="No" class="" src="/bundles/visualfeedback/images/close.FFFFFF.png" />
        <img id="red" alt="No" class="" src="/bundles/visualfeedback/images/close.FF0000.png" />
      </span>
    </div>
    
    <div class="next-question arrow-icon" title="Next Question"></div>
    
    <div class="content-type icon" title="Image/Text Toggle">
      <img id="image" alt="Image" class="" src="/bundles/visualfeedback/images/photo.png" />
      <img id="text" alt="Text" class="state-hide" src="/bundles/visualfeedback/images/abc.icon.64x64.png" class="state-hide" />
    </div>
    
    <table id="details">
      <thead>
        
      </thead>
      <tbody>
        <tr>
          <th class="label">Current Question:</th>
          <td class="current-question value">&nbsp;</td>
        </tr>
        <tr>
          <th class="label">Text Answer:</th>
          <td class="text-answer value">&nbsp;</td>
        </tr>
        <tr>
          <th class="label">Image Answer:</th>
          <td class="image-answer value">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>




<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/tutor.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/tutor.js"></script>

<div id="userMenu">
      <div class="text"><?=$sUserEmail?></div>
      <div class="icon">
        <span class="ui-icon ui-icon-triangle-1-s"></span>
      </div>
      <div class="menu">
        <div class="menuItem firstItem">Tools</div>
        <div class="menuItem lastItem">Sign out</div>
      </div>
    </div>
    <div id="modalBackground"></div>
    <div id="sessionChooser">
      <div class="pulldownButton">
        <!--<div class="borderHide"></div>-->
        <div class="text">SESSIONS</div>
        <div class="icon">
          <span class="ui-icon ui-icon-triangle-1-e"></span>
        </div>
      </div>
      <div class="content">
<?
foreach ($aSessionList as $aSession) {
?>
        <div class="sessionItem">
          <div class="number"><?=$aSession['iNumber']?></div>
          <div class="tutor">
            <div class="image">
              <img src="<?=$aSession['sTutorIcon']?>" />
            </div>
            <div class="text"><?=$aSession['sTutor']?></div>
          </div>
          <div class="pupil">
            <div class="image">
              <img src="<?=$aSession['sPupilIcon']?>" />
            </div>
            <div class="text"><?=$aSession['sPupil']?></div>
          </div>
        </div>
<?
}
?>
      </div>
    </div>

    
    <div id="header">
      <div class="tutor">
        <div class="image"><img src="/images/tutor_icons/tutor_default.png" /></div>
        
        <div class="text">Tutor</div>
      </div>
      <div class="pupil">
        <div class="image"><img src="/images/pupil_icons/pupil_default.gif" /></div>
        <div class="text">Pupil</div>
      </div>
    </div>


    <div id="sessionDisplay">
      <div class="image">
        <div class="number">1</div>
        <div class="innerBorder">
          <img src="/images/uploads/aligator.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Aligator</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">2</div>
        <div class="innerBorder selected">
          <img src="/images/uploads/star.png" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Star</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">3</div>
        <div class="innerBorder">
          <img src="/images/uploads/evilmonkey.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Monkey</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">4</div>
        <div class="innerBorder">
          <img src="/images/uploads/lightsaber-animals.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Lightsaber</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">5</div>
        <div class="innerBorder">
          <img src="/images/uploads/tiger.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Tiger</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">6</div>
        <div class="innerBorder">
          <img src="/images/uploads/evilmonkey.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Monkey</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">7</div>
        <div class="innerBorder">
          <img src="/images/uploads/aligator.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Aligator</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">8</div>
        <div class="innerBorder">
          <img src="/images/uploads/star.png" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Star</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="image">
        <div class="number">9</div>
        <div class="innerBorder">
          <img src="/images/uploads/evilmonkey.jpg" />
        </div>
        <table class="controls">
          <tr>
            <th colspan="2" class="ui-widget-header">Monkey</th>
          </tr>
          <tr>
            <th class="selected">Image:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <th>Text:</th>
            <td>
              <div id="textChoice" class="ui-buttonset">
                <label id="yes" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left">
                    <span class="ui-button-text">Yes</span>
                </label>
                <label id="skip" class="ui-button ui-widget ui-state-default ui-button-text-only">
                    <span class="ui-button-text">Skip</span>
                </label>
                <label id="no" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right">
                  <span class="ui-button-text">No</span>
                </label>
              </div>
            </td>
          </tr>
        </table>
      </div>
      
    </div>
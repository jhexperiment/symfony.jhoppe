<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/config.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/config.js"></script>

<link rel="stylesheet" href="/bundles/visualfeedback/js/uploadify/uploadify.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/uploadify/jquery.uploadify.v2.1.4.min.js"></script>
<script type="text/javascript" src="/bundles/visualfeedback/js/uploadify/swfobject.js"></script>
<script type="text/javascript" src="/bundles/visualfeedback/js/crypto-js/crypto-md5/crypto-md5.js"></script>

<?
foreach ($aPath as $sName => $sValue) {
?>
<input id="<?=$sName?>" type="hidden" value="<?=$sValue?>"/>
<?
}
?>



<div class="top-bar">
  <span class="navigation-bar">
    <span id="config" class="navigation-item">Config</span>
    <span id="tutor" class="navigation-item">Tutor</span>
    <span id="pupil" class="navigation-item">Pupil</span>
  </span>
  <span class="account-menu">
    <span id="user-name" class="account-menu-item">User Name</span>
    <span id="sign-out-button" class="account-menu-item">Sign Out</span>
  </span>
</div>

<div class="main-menu-container">
  <div class="main-menu state-hide">
    <span id="image" class="menu-item">
      <span class="text">Image Bank</span>
    </span>
    <span id="audio" class="menu-item">
      <span class="text">Audio Clips</span>
    </span>
    <span id="tutor" class="menu-item">
      <span class="text">Tutors</span>
    </span>
    <span id="pupil" class="menu-item">
      <span class="text">Pupils</span>
    </span>
    <span id="subject" class="menu-item state-hide">
      <span class="text">Subjects</span>
    </span>
    <span id="lesson-plan" class="menu-item state-hide">
      <span class="text">Lesson Plans</span>
    </span>
    <span id="lesson" class="menu-item">
      <span class="text">Lessons</span>
    </span>
    <span id="session" class="menu-item">
      <span class="text">Sessions</span>
    </span>
    <span id="setting" class="menu-item">
      <span class="text">Settings</span>
    </span>
  </div>
</div>

<div class="sub-menu-container">
  <div class="search-bar">
    <input type="text" />
    <span class="search-button button">Search</span>
  </div>
  <span class="filter-list">
    <span class="text">Filter:</span>
    <span id="subject">
      <span class="text">Subject:</span>
      <select>
        <option value="">All</option>
      </select>
    </span>
    <span id="lesson-plan">
      <span class="text">Lesson Plan:</span>
      <select>
        <option value="">All</option>
      </select>
    </span>
    <span class="text">Name:</span>
  </span>
  
  <div id="image" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
      <span class="input state-hide">
        <input id="image-file-upload" type="file" name="image-file-upload" />
      </span>
    </span>
  </div>
  <div id="audio" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
      <span class="input state-hide">
        <input id="audio-file-upload" type="file" name="audio-file-upload" />
      </span>
    </span>
  </div>
  <div id="tutor" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="pupil" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="subject" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="lesson-plan" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="lesson" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="session" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Create</span>
    </span>
  </div>
  <div id="setting" class="sub-menu state-hide">
    <span id="blah" class="menu-item">
      <span class="text">Blah??</span>
    </span>
  </div>
</div>


<div class="view-container">
  <div id="image" class="view state-hide">
    <div class="head">
      <div class="title">Image Bank</div>
      
    </div>
    <div class="body">
      <div class="image-list"></div>
    </div>
  </div>
  
  <div id="audio" class="view state-hide">
    <div class="head">
      <div class="title">Audio Files</div>
      
    </div>
    <div class="body">
      <div class="audio-list"></div>
    </div>
  </div>
  
  <div id="tutor" class="view state-hide">
    <div class="head">
      <div class="title">Tutors</div>
    </div>
    <div class="body">
      <div class="tutor-list"></div>
    </div>
  </div>
  
  <div id="pupil" class="view state-hide">
    <div class="head">
      <div class="title">Pupils</div>
    </div>
    <div class="body">
      <div class="pupil-list"></div>
    </div>
  </div>
  
  <div id="subject" class="view state-hide">
    <div class="head">
      <div class="title">Subjects</div>
    </div>
    <div class="body">
      <table class="subject-list">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="subject">Subject</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
  
  <div id="lesson-plan" class="view state-hide">
    <div class="head">
      <div class="title">Lesson Plans</div>
    </div>
    <div class="body">
      <table class="lesson-plan-list">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="subject">Subject</th>
            <th class="lesson-plan">Lesson Plan</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
  
  <div id="lesson" class="view state-hide">
    <div class="head">
      <div class="title">Lessons</div>
      
    </div>
    <div class="body">
      <table class="lesson-list">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="subject">Subject</th>
            <th class="lesson-plan">Lesson Plan</th>
            <th class="lesson">Lesson</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
  
  <div id="setting" class="view state-hide">
    <div class="head">
      <div class="title">Settings</div>
      
    </div>
    <div class="body">
<?
foreach ($aPath as $sName => $sValue) {
?>
      <div id="<?=$sName?>" class="setting-item">
        <span class="label"><?=$sName?>:</span>
        <span class="value">
          <input type="text" value="<?=$sValue?>" />
        </span>
      </div>
  
<?
}
?>
      <div class="action-list">
        <span id="save-button" class="button">Save</span>
      </div>
    </div>
  </div>
</div>

<div id="add-tutor-popup" class="add-popup add-person-popup state-hide">
  <div class="popup-view-container">
    <div id="main" class="popup-view">
      <div class="head">
        <span id="action">New</span> Tutor
      </div>
      <div class="body">
        <span class="left">
          <div class="picture">
            <input type="hidden" id="image-id" value="" />
            <img src="" />
          </div>
          <div class="upload">
            <div class="label">Choose Photo:</div>
            <div id="choose-button" class="button">Use Existing</div>
            <div id="new-button" class="button">Upload New</div>
            <div class="file-upload">
              <input id="tutor-file-upload" type="file" name="tutor-file-upload" />
            </div>
          </div>
        </span>
        <span class="right">
          <div id="first-name" class="data-item">
            <span class="label">
              First Name:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
          <div id="middle-name" class="data-item">
            <span class="label">Middle Name:</span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
          <div id="last-name" class="data-item">
            <span class="label">
              Last Name:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
        </span>
      </div>
      <div class="foot">
        <span id="cancel-button" class="button">Cancel</span>
        <span id="create-button" class="button state-hide">Create Tutor</span>
        <span id="update-button" class="button state-hide">Update Tutor</span>
      </div>
    </div>
    <div id="image-list" class="popup-view state-hide">
      <div class="head">Choose Existing</div>
      <div class="body">
        
      </div>
      <div class="foot">
        <span id="return-button" class="button">Return</span>
      </div>
    </div>
  </div>
  
</div>

<div id="add-pupil-popup" class="add-popup add-person-popup state-hide">
  <div class="popup-view-container">
    <div id="main" class="popup-view">
      <div class="head">
        <span id="action">New</span> Pupil
      </div>
      <div class="body">
        <span class="left">
          <div class="picture">
            <input type="hidden" id="image-id" value="" />
            <img src="" />
          </div>
          <div class="upload">
            <div class="label">Choose Photo:</div>
            <div id="choose-button" class="button">Use Existing</div>
            <div id="new-button" class="button">Upload New</div>
            <div class="file-upload">
              <input id="pupil-file-upload" type="file" name="pupil-file-upload" />
            </div>
          </div>
        </span>
        <span class="right">
          <div id="first-name" class="data-item">
            <span class="label">
              First Name:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
          <div id="middle-name" class="data-item">
            <span class="label">Middle Name:</span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
          <div id="last-name" class="data-item">
            <span class="label">
              Last Name:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </div>
        </span>
      </div>
      <div class="foot">
        <span id="cancel-button" class="button">Cancel</span>
        <span id="create-button" class="button state-hide">Create Pupil</span>
        <span id="update-button" class="button state-hide">Update Pupil</span>
      </div>
    </div>
    <div id="image-list" class="popup-view state-hide">
      <div class="head">Choose Existing</div>
      <div class="body">
        
      </div>
      <div class="foot">
        <span id="return-button" class="button">Return</span>
      </div>
    </div>
  </div>
</div>

<div id="add-subject-popup" class="add-popup state-hide">
  <div class="popup-view-container">
    <div id="main" class="popup-view">
      <div class="head">
        <span id="action">New</span> Subject
      </div>
      <div class="body">
        <div id="name" class="data-item">
          <span class="label">
            Name:
            <sup><span class="red">*</span></sup>
          </span>
          <span class="value">
            <input type="text" value="" />
          </span>
        </div>
      </div>
      <div class="foot">
        <span id="cancel-button" class="button">Cancel</span>
        <span id="create-button" class="button state-hide">Create Subject</span>
        <span id="update-button" class="button state-hide">Update Subject</span>
      </div>
    </div>
  </div>
</div>

<div id="add-lesson-plan-popup" class="add-popup state-hide">
  <div class="popup-view-container">
    <div id="main" class="popup-view">
      <div class="head">
        <span id="action">New</span> Lesson Plan
      </div>
      <div class="body">
        <div id="subject" class="data-item">
          <span class="label">
            Subject:
            <sup><span class="red">*</span></sup>
          </span>
          <span class="value">
            <select>
              
            </select>
          </span>
        </div>
        <div id="name" class="data-item">
          <span class="label">
            Name:
            <sup><span class="red">*</span></sup>
          </span>
          <span class="value">
            <input type="text" value="" />
          </span>
        </div>
      </div>
      <div class="foot">
        <span id="cancel-button" class="button">Cancel</span>
        <span id="create-button" class="button state-hide">Create Lesson Plan</span>
        <span id="update-button" class="button state-hide">Update Lesson Plan</span>
      </div>
    </div>
  </div>
</div>

<div id="add-lesson-popup" class="add-popup state-hide">
  <div class="popup-view-container">
    <div id="top-move-handle" class="move-handle"></div>
    <div id="right-move-handle" class="move-handle"></div>
    <div id="bottom-move-handle" class="move-handle"></div>
    <div id="left-move-handle" class="move-handle"></div>
    <div id="main" class="popup-view">
      <div class="head">
        <input id="lesson-id" type="hidden" value="" />
        <span id="action">New</span> Lesson
      </div>
      <div class="body">
        <div class="input">
          <span id="name" class="data-item required">
            <span class="label">
              Lesson:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <input type="text" value="" />
            </span>
          </span>
          <span id="subject" class="data-item required">
            <span class="label">
              Subject:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <select>
                <option value="">Select</option>
              </select>
            </span>
          </span>
          <span id="lesson-plan" class="data-item required">
            <span class="label">
              Lesson Plan:
              <sup><span class="red">*</span></sup>
            </span>
            <span class="value">
              <select>
                <option value="">Select</option>
              </select>
            </span>
          </span>
        </div>
        <div class="label">Lesson Order:</div>
        <div class="selected-images">
          <div class="wrapper image-drag-drop">
            <div class="drop-message">Drag & Drop Image Here</div>
          </div>
        </div>
        
        <div id="image-list-label" class="label">
          <span class="text">Choose from Image Bank:</span>
          <span class="filter">
            <input type="text" />
            <span id="filter-button" class="button">Search</span>
          </span>
        </div>
        <div class="image-list image-drag-drop"></div>
      </div>
      <div class="foot">
        <span id="cancel-button" class="button">Cancel</span>
        <span id="create-button" class="button state-hide">Create Lesson</span>
        <span id="update-button" class="button state-hide">Update Lesson</span>
      </div>
    </div>
  </div>
  
</div>

<div class="modal"></div>


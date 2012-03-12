<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/config.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/config.js"></script>

<link rel="stylesheet" href="/bundles/visualfeedback/js/uploadify/uploadify.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/uploadify/jquery.uploadify.v2.1.4.min.js"></script>
<script type="text/javascript" src="/bundles/visualfeedback/js/uploadify/swfobject.js"></script>




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
      <span class="text">Image</span>
    </span>
    <span id="tutor" class="menu-item">
      <span class="text">Tutor</span>
    </span>
    <span id="pupil" class="menu-item">
      <span class="text">Pupil</span>
    </span>
    <span id="lesson" class="menu-item">
      <span class="text">Lesson</span>
    </span>
    <span id="session" class="menu-item">
      <span class="text">Session</span>
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
  
  <div id="image" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
      <span class="input state-hide">
        <input id="image-file-upload" type="file" name="image-file-upload" />
      </span>
    </span>
  </div>
  <div id="tutor" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
    </span>
  </div>
  <div id="pupil" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
    </span>
  </div>
  <div id="lesson" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
    </span>
  </div>
  <div id="session" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
    </span>
  </div>
  <div id="setting" class="sub-menu state-hide">
    <span id="add" class="menu-item">
      <span class="text">Add</span>
    </span>
  </div>
</div>


<div class="view-container">
  <div id="image" class="view state-hide">
    <div class="head">
      <div class="title">Images</div>
      
    </div>
    <div class="body">
      <div class="image-list"></div>
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
</div>

<div id="add-teacher-popup" class="state-hide">
  <div class="popup-view-container">
    <div id="main" class="popup-view">
      <div class="head">Add Tutor</div>
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
        <span id="create-button" class="button">Create Tutor</span>
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

<div class="modal"></div>

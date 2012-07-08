<?php $view->extend('EducationVisualFeedbackBundle::layout.html.php') ?>

<link rel="stylesheet" href="/bundles/visualfeedback/css/report.css" type="text/css">
<script type="text/javascript" src="/bundles/visualfeedback/js/report.js"></script>


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
</div>

<div class="view-container">
  
  <div id="session" class="view">
    <div class="head">
      <div class="title">Reports</div>
      
    </div>
    <div class="body">
      <table class="session-list">
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="hash">Hash</th>
            <th class="tutor-id">Tutor ID</th>
            <th class="tutor">Tutor</th>
            <th class="pupil-id">Pupil ID</th>
            <th class="pupil">Pupil</th>
            <th class="lesson">Lesson</th>
            <th class="image-correct">Correct Image</th>
            <th class="text-correct">Correct Text</th>
            <th class="current-question">Current Question</th>
            <th class="answer-list">Answers</th>
          </tr>
        </thead>
        <tbody id="main">
          
        </tbody>
      </table>
    </div>
  </div>
  
</div>

<div class="modal"></div>


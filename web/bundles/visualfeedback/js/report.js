$(document).ready(function() {
  oMain.fnInit();
  
  oThisPage.fnInit();

  $(window).load(function() {
  
  });
});

oThisPage = {
  'fnInit': function() {
    
    
    var sHover = 
      "";
    $(sHover).hover(
      function() {
        $(this).addClass("state-hover");
      },
      function() {
        $(this).removeClass("state-hover");
      }
    );
    
    
    
    
    oThisPage.fnRenderSessionTable();
    
  },
  
  
  // Session
  'fnGetSessionList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/session.json",
      'success': fnCallback
    });
  },
  'fnRenderSessionTable': function() {
    var aPost = {
      'sSearch' : $(".sub-menu-container .search-bar input").val()
    }
    $("#session.view .body table.session-list tbody").html("");
    oThisPage.fnGetSessionList(aPost, function(aData, textStatus, jqXHR) {
      $.each(aData, function() {
        oThisPage.fnRenderSessionRow(this);
      });
    });
  },
  'fnRenderSessionRow': function(aSession) {
    var sAnswerList = '';
    if ( ! $.fnIsEmpty(aSession.aQuestionList)) {
      var sHeader = '';
      var sImageAnswer = '';
      var sTextAnswer = '';
      var sCss = '';
      $.each(aSession.aQuestionList, function() {
        sTitle = this.sText;
        sHeader += '<th title="' + sTitle + '">' + this.iOrderIndex + '</th>';
        sCss = this.sImageAnswer;
        sImageAnswer += '<td class="' + sCss + '">' + this.sImageAnswer + '</td>';
        sCss = this.sTextAnswer;
        sTextAnswer += '<td class="' + sCss + '">'  + this.sTextAnswer + '</td>'; 
      });
      
      sAnswerList = 
        '<table class="answer-list">' +
          '<thead>' +
            '<tr>' +
              '<th>&nbsp;</th>' +
              sHeader +
            '</tr>' +
          '</thead>' +
          '<tbody class="sub">' +
            '<tr>' +
              '<td class="label">Image</td>' +
              sImageAnswer +
            '</tr>' +
            '<tr>' +
              '<td class="label">Text</td>' +
              sTextAnswer +
            '</tr>' +
          '</tbody>' +
        '</table>';
    }
    
    var sImageCorrect = 
      $.fnFormatNumber(aSession.aPercentList.aImage.iCorrect / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aImage.iCorrect + ')'
    var sImageIncorrect = 
      $.fnFormatNumber(aSession.aPercentList.aImage.iIncorrect / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aImage.iIncorrect + ')'
    var sImageSkipped = 
      $.fnFormatNumber(aSession.aPercentList.aImage.iSkipped / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aImage.iSkipped + ')'
    var sTextCorrect = 
      $.fnFormatNumber(aSession.aPercentList.aText.iCorrect / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aText.iCorrect + ')'
    var sTextIncorrect = 
      $.fnFormatNumber(aSession.aPercentList.aText.iIncorrect / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aText.iIncorrect + ')'
    var sTextSkipped = 
      $.fnFormatNumber(aSession.aPercentList.aText.iSkipped / aSession.aQuestionList.length * 100, 1) + 
      '% (' + aSession.aPercentList.aText.iSkipped + ')'
    
    var sHtml = 
        '<tr>' + 
          '<td class="id">' + aSession.iSessionId + '</td>' +
          '<td class="hash">' + aSession.sHash + '</td>' +
          '<td class="tutor-id">' + aSession.aTutor.iTutorId + '</td>' +
          '<td class="tutor">' + 
            $.trim(aSession.aTutor.sFirstName + ' ' + aSession.aTutor.sLastName) + 
          '</td>' +
          '<td class="pupil-id">' + aSession.aPupil.iPupilId + '</td>' +
          '<td class="pupil">' +  
            $.trim(aSession.aPupil.sFirstName + ' ' + aSession.aPupil.sLastName) + 
          '</td>' +
          '<td class="lesson">' + aSession.aLesson.sName + '</td>' +
          '<td class="image-correct percent">' + sImageCorrect + '</td>' +
          '<td class="image-incorrect percent">' + sImageIncorrect + '</td>' +
          '<td class="image-skipped percent">' + sImageSkipped + '</td>' +
          '<td class="text-correct percent">' + sTextCorrect + '</td>' +
          '<td class="text-incorrect percent">' + sTextIncorrect + '</td>' +
          '<td class="text-skipped percent">' + sTextSkipped + '</td>' +
          '<td class="current-question">' + aSession.aCurrentQuestion.iOrderIndex + '</td>' +
          '<td class="answer-list-column" colspan="9">' + 
            sAnswerList + 
          '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    oHtml.fnTrackHover();
    oHtml.click(function() {
      var sHash = $.trim($(this).find(".hash").html());
      //window.location.href = 'lesson?sHash=' + sHash;
    });
    $("#session.view .body table.session-list tbody#main").append(oHtml);
  },
  
  
  'fnGetLessonList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/lesson.json",
      'success': fnCallback
    });
  },
  'fnRenderLessonTable': function() {
    var aPost = {
      'sSearch' : $(".sub-menu-container .search-bar input").val()
    }
    $("#lesson.view .body table.lesson-list tbody").html("");
    oThisPage.fnGetLessonList(aPost, function(aData, textStatus, jqXHR) {
      $.each(aData, function() {
        oThisPage.fnRenderLessonRow(this);
      });
    });
    
    aPost = {};
    oThisPage.fnGetSubjectList(aPost, function(aData, textStatus, jqXHR) {
      var oSelect = $(".sub-menu-container .filter-list #subject select");
      oSelect.html('<option value="">All</option>');
      $.each(aData, function() {
        var sHtml = 
          '<option value="' + this.subject + '">' +
            this.subject +
          '</option>';
        oSelect.append(sHtml);
      });
    });
    oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
      var oSelect = $(".sub-menu-container .filter-list #lesson-plan select");
      oSelect.html('<option value="">All</option>');
      $.each(aData, function() {
        var sHtml = 
          '<option value="' + this.lesson_plan + '">' +
            this.lesson_plan +
          '</option>';
        oSelect.append(sHtml);
      });
    });
  },
  'fnRenderLessonRow': function(aLesson) {
    var sHtml = 
        '<tr>' + 
          '<td class="id">' + aLesson.id + '</td>' +
          '<td class="lesson">' +
            '<span class="text">' + 
              aLesson.name +
            '</span>' + 
          '</td>' +
          '<td class="lesson-plan">' +  aLesson.lessonPlan + '</td>' +
          '<td class="subject">' + aLesson.subject + '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    oHtml.find(".lesson .text").hover(
      function() {
        $(this).addClass('state-hover');
      },
      function() {
        $(this).removeClass('state-hover');
      }
    ).click(function() {
      var oTr = $(this).parents('tr');
      var sSubject = $.trim(oTr.find("td.subject").html());
      var sLessonPlan = $.trim(oTr.find("td.lesson-plan").html());
      var sLessonName = $.trim(oTr.find("td.lesson .text").html());
      var iLessonId = parseInt($.trim(oTr.find("td.id").html()));
      
      oThisPage.fnShowLessonPopup();
      
      var oPopup = $("#add-lesson-popup");
      oPopup.find("#lesson-id").val(iLessonId);
      oPopup.find("#name input").val(sLessonName);
      oPopup.find("#subject input").val(sSubject);
      oPopup.find("#lesson-plan input").val(sLessonPlan);
      oPopup.find(".popup-view .head #action").html('Edit');
      oPopup.find(".popup-view .foot #create-button").addClass('state-hide');
      oPopup.find(".popup-view .foot #update-button").removeClass('state-hide');
      
      var aPost = {
        'sId': $.trim(oTr.find("td.id").html())
      };
      
      $.ajax({
        'data': aPost,
        'dataType': 'json',
        'type': 'POST',
        'url': "list/lessonImage.json",
        'success': function(aData, textStatus, jqXHR) {
          $("#add-lesson-popup .body .selected-images .drop-message").addClass('state-hide');
          $.each(aData, function() {
            if ($.fnIsEmpty(aData) || $.fnIsEmpty(aData[0].iQuestionId)) {
              return false;
            }
            var sHtml = 
              '<span class="image">' +
                '<input id="question-id" type="hidden" value="' + this.iQuestionId + '" />' +
                '<input id="image-id" type="hidden" value="' + this.iImageId + '" />' +
                '<span class="index">' + this.iIndex + '</span>' + 
                '<img src="' + this.sUrl + '" />' +
                '<div class="label">' + this.sLabel + '</div>' +
              '</span>';
            var oHtml = $(sHtml);
            oHtml.data("aData", this);
            oThisPage.fnLessonAppendImage(oHtml);
          });
        }
      });
    });
    
    $("#lesson.view .body table.lesson-list tbody").append(oHtml);
  },
  // Subject
  'fnGetSubjectList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/subject.json",
      'success': fnCallback
    });
  },
  // LessonPlan
  'fnGetLessonPlanList': function(aPost, fnCallback) {
    
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/lessonplan.json",
      'success': fnCallback
    });
  },
  
  
};

$(document).ready(function() {
	oMain.fnInit();
	oThisPage.fnInit();

  
	$(window).load(function() {
		
	});
});



var oThisPage = {
  'bLessonComplete': false,
  'iCurrentQuestion': null,
  'bAnswerControlMoving': false,
	'bIsResizing': false,
	
	'fnInit': function() {
	  
		var sHover = 
      "#answer-control-large .icon, " +
      "#answer-control-large .center .button, " +
      "#answer-control-large .arrow-icon";
    $(sHover).fnTrackHover();
    
    $(sHover).mousedown(function() {
      $(this).addClass("state-press");
    });
    $(sHover).mouseup(function() {
      $(this).removeClass("state-press");
    });
    
    
		$("#answer-control-large .yes-button").click(function() {
      oThisPage.fnAnswerQuestion('yes');
    });
    $("#answer-control-large .no-button").click(function() {
      oThisPage.fnAnswerQuestion('no');
    });
    $("#answer-control-large .prev-question").click(function() {
       if ( ! $(this).hasClass('state-disabled')){
        oThisPage.fnPrevQuestion();
      }
    });
    $("#answer-control-large .next-question").click(function() {
      if ( ! $(this).hasClass('state-disabled')){
        oThisPage.fnNextQuestion();
      }
      
      
    });
    $("#answer-control-large .content-type").click(function() {
      oThisPage.fnFlipContentType($(this));
    });
    
    
    $("#answer-control-small").hover(
      function() {
        if ( ! oThisPage.bLessonComplete) {
          oThisPage.fnAnswerControlShow();
        }
      },
      function() {
        //setTimeout('oThisPage.fnAnswerControlHide()', 3000);
      }
    );
    $("#answer-control-large").hover(
      function() {
        $(this).addClass("state-hover");
      },
      function() {
        $(this).removeClass("state-hover");
        setTimeout('oThisPage.fnAnswerControlHide()', 1000);
      }
    );
    
    //oThisPage.fnPollQuestion();
    var aCurrentQuestion = oThisPage.fnGetCurrentQuestion();
		oThisPage.fnSetQuestion(aCurrentQuestion, 'image');
		$(window).resize(oThisPage.fnWindowResizeCallback);
	},
	
	
	'fnRecordAnswer': function(aQuestion) {
	  var aPost = {
      'aQuestion': aQuestion,
      'sHash': $("#hash").val()
    };
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "answer",
      'success': function(aData, textStatus, jqXHR) {
        
      }
    });
	  
	  
	},
	'fnFlipContentType': function(oContentType) {
	  if (oContentType == null) {
	    oContentType = $("#answer-control-large .content-type");
	  }
	  var oImage = oContentType.find("#image");
    var oText = oContentType.find("#text");
    
    var oDisplayImage = $("#display-image");
    var oDisplayText = $("#display-text");
    
    var aCurrentQuestion = oThisPage.fnGetCurrentQuestion();
    
	  var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    
    switch (sCurrentType) {
      case 'image':
        // Hide Image
        oImage.addClass('state-hide');
        oDisplayImage.addClass('state-hide');
        // Show Text
        oText.removeClass('state-hide');
        oDisplayText.removeClass('state-hide');
        oThisPage.fnHighlightAnswer(aCurrentQuestion.aAnswer.sTextAnswer);
        break;
      
      case 'text':
        // Hide Text
        oText.addClass('state-hide');
        oDisplayText.addClass('state-hide');
        // Show Image
        oImage.removeClass('state-hide');
        oDisplayImage.removeClass('state-hide');
        oThisPage.fnHighlightAnswer(aCurrentQuestion.aAnswer.sImageAnswer);
        break;
    }
	  
    oThisPage.fnWindowResizeCallback();
	},
	'fnShowLessonComplete': function() {
	  oThisPage.fnAnswerControlHide(true)
	  
	  var oDisplayImage = $("#display-image");
    var oDisplayText = $("#display-text");
    
    var sUrl = '/bundles/visualfeedback/images/star.png';
    oDisplayImage.removeClass('state-hide').find("img").attr("src", sUrl);
    oDisplayText.addClass('state-hide').html("Pau. Hana maika'i.");
  },
  'fnGetCurrentQuestion': function() {
    return aSessionInfo.aLesson.aQuestionList[aSessionInfo.iCurrentQuestion];
  },
  'fnNextQuestion': function() {
    var oContentType = $("#answer-control-large .content-type");
    var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    aSessionInfo.iCurrentQuestion++;
    oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), sCurrentType);
  },
  'fnNextStep': function() {
    var oContentType = $("#answer-control-large .content-type");
    var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    switch (sCurrentType) {
      case 'image':
       oContentType.click();
       oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), 'text');
       break;
      
      case 'text':
       if ( ! oThisPage.fnIsLastQuestion(oThisPage.fnGetCurrentQuestion())) {
         aSessionInfo.iCurrentQuestion++;
       }
       oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), 'image');
       break;
    }
  },
  'fnPrevQuestion': function() {
    var oContentType = $("#answer-control-large .content-type");
    var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    aSessionInfo.iCurrentQuestion--;
    oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), sCurrentType);
  },
  'fnPrevStep': function() {
    var oContentType = $("#answer-control-large .content-type");
    var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    switch (sCurrentType) {
      case 'image':
       oContentType.click();
       oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), 'text');
       break;
      
      case 'text':
       if ( ! oThisPage.fnIsFirstQuestion(oThisPage.fnGetCurrentQuestion())) {
         aSessionInfo.iCurrentQuestion--;
       }
       oThisPage.fnSetQuestion(oThisPage.fnGetCurrentQuestion(), 'image');
       break;
    }
  },
  'fnIsFirstQuestion': function(aQuestion) {
    return (aQuestion.iOrderIndex == 1);
  },
  'fnIsLastQuestion': function(aQuestion) {
    return (aQuestion.iOrderIndex == aSessionInfo.aLesson.iQuestionCount);
  },
  'fnIsQuestionComplete': function(aQuestion) {
    return (aQuestion.sImageAnswer != null) && (aQuestion.sTextAnswer != null);
  },
  'fnIsLessonComplete': function() {
    var bComplete = true;
    $.each(aSessionInfo.aLesson.aQuestionList, function() {
      if (this.aAnswer.sImageAnswer == null || this.aAnswer.sTextAnswer == null) {
        bComplete = false;
        return true;
      }
      if (this.aAnswer.sImageAnswer == "null" || this.aAnswer.sTextAnswer == "null") {
        bComplete = false;
        return true;
      }
    });
    oThisPage.bLessonComplete = bComplete;
    return bComplete;
  },
  'fnSetQuestion': function(aQuestion, sType) {
    oThisPage.fnFillDetailsTable();
    
	  if (oThisPage.fnIsLastQuestion(aQuestion)) {
      $("#answer-control-large .next-question").addClass('state-disabled');
    }
    else {
      $("#answer-control-large .next-question").removeClass('state-disabled');
    }
    
    if (oThisPage.fnIsFirstQuestion(aQuestion)) {
      $("#answer-control-large .prev-question").addClass('state-disabled');
    }
    else {
      $("#answer-control-large .prev-question").removeClass('state-disabled');
    }
    
    
    if (oThisPage.fnIsLessonComplete()) {
      oThisPage.fnShowLessonComplete();
    }
    else {
      var sUrl = aQuestion.aImage.sWebPath;
    
      $("#display-image img").attr("src", sUrl);
      $("#display-text").html(aQuestion.sText);
      
      var oContentType = $("#answer-control-large .content-type");
      var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
      
      if (sCurrentType != sType) {
        oContentType.click();
        sCurrentType = sType;
      }
      
      var oYesButton = $("#answer-control-large .center .yes-button");
      var oNoButton = $("#answer-control-large .center .no-button");
      
      switch (sCurrentType) {
        case 'image':
          oThisPage.fnHighlightAnswer(aQuestion.aAnswer.sImageAnswer, oYesButton, oNoButton);
          break;
        
        case 'text':
          oThisPage.fnHighlightAnswer(aQuestion.aAnswer.sTextAnswer, oYesButton, oNoButton);
          break;
      }
    }
    
	  oThisPage.fnWindowResizeCallback();
	},
	'fnFillDetailsTable': function() {
    var aCurrentQuestion = oThisPage.fnGetCurrentQuestion();
    var oTable = $("table#details");

    var sCurrentQuestion = '' + aCurrentQuestion.iOrderIndex + '. ' + aCurrentQuestion.sText; 
    oTable.find(".current-question").html(sCurrentQuestion);
    
    oTable.find(".image-answer").html(aCurrentQuestion.aAnswer.sImageAnswer);
    oTable.find(".text-answer").html(aCurrentQuestion.aAnswer.sTextAnswer);
  },
  'fnHighlightAnswer': function(sAnswer, oYesButton, oNoButton) {
    if (oYesButton == null) {
      oYesButton = $("#answer-control-large .center .yes-button");
    }
    if (oNoButton == null) {
      oNoButton = $("#answer-control-large .center .no-button");
    }
    
    
    // has answer
    if (sAnswer != null && sAnswer != "null") {
      // Answer is
      switch (sAnswer.toLowerCase()) {
        case 'yes':
          // show green check mark on yes button
          oThisPage.fnHighlightYesButton(oYesButton);
          
          // show white close on no button
          oThisPage.fnResetNoButton(oNoButton);
          break;
          
        case 'no':
          // show red close on no button
          oThisPage.fnHighlightNoButton(oNoButton);
          
          // show white check mark on yes button
          oThisPage.fnResetYesButton(oYesButton);
          break;
      }
      
    } // no answer (skipped)
    else {
      // show white check mark on yes button
      oThisPage.fnResetYesButton(oYesButton);
      
      // show white close on no button
      oThisPage.fnResetNoButton(oNoButton);            
    }
  },
  'fnHighlightYesButton': function(oYesButton) {
    if (oYesButton == null) {
      oYesButton = $("#answer-control-large .center .yes-button");
    }
    oYesButton.find("img#white").addClass('state-hide');
    oYesButton.find("img#green").removeClass('state-hide');
  },
  'fnResetYesButton': function(oYesButton) {
    if (oYesButton == null) {
      oYesButton = $("#answer-control-large .center .yes-button");
    }
    
    oYesButton.find("img#white").removeClass('state-hide');
    oYesButton.find("img#green").addClass('state-hide');
  },
  'fnHighlightNoButton': function(oNoButton) {
    if (oNoButton == null) {
      oNoButton = $("#answer-control-large .center .no-button");
    }
    
    oNoButton.find("img#white").addClass('state-hide');
    oNoButton.find("img#red").removeClass('state-hide');
  },
  'fnResetNoButton': function(oNoButton) {
    if (oNoButton == null) {
      oNoButton = $("#answer-control-large .center .no-button");
    }
    
    oNoButton.find("img#white").removeClass('state-hide');
    oNoButton.find("img#red").addClass('state-hide');
  },
  'fnAnswerQuestion': function(sAnswer) {
    var oContentType = $("#answer-control-large .content-type");
    var sCurrentType = oContentType.find("#image").hasClass('state-hide') ? 'text' : 'image';
    var aCurrentQuestion = oThisPage.fnGetCurrentQuestion();
    
    switch (sCurrentType) {
      case 'image':
        aCurrentQuestion.aAnswer.sImageAnswer = sAnswer;
        break;
      
      case 'text':
        aCurrentQuestion.aAnswer.sTextAnswer = sAnswer;
        break;
    }
    aCurrentQuestion.aAnswer.iTimestamp = Math.round(new Date().getTime() / 1000);
    
    oThisPage.fnRecordAnswer(aCurrentQuestion);
    
    oThisPage.fnHighlightAnswer(sAnswer);
    //oThisPage.fnSetQuestion(aCurrentQuestion, sCurrentType);
    setTimeout("oThisPage.fnNextStep();", 500);
    
  },
  'fnWindowResizeCallback': function() {
	  if ( ! oThisPage.bIsResizing ) {
        oThisPage.bIsResizing = true;
        var oImage = $("#display-image");
        var oText = $("#display-text"); 
        $.fnCenter(oImage);
        $.fnCenter(oText);
        oThisPage.bIsResizing = false;
      }
	},
	'fnPollQuestion': function() {
	  var aPost = {
      'sHash': $("#hash").val(),
      'iCurrentQuestion': oThisPage.iCurrentQuestion
    };
    
    oThisPage.fnGetSession(aPost, function(aData, textStatus, jqXHR) {
      if (aData != null) {
        oThisPage.iCurrentQuestion = aData.iCurrentQuestion;
        $("#display-text").html(aData.aQuestion.sText);
        $("#display-image img").attr('src', aData.aQuestion.sIconUrl);
        oThisPage.fnWindowResizeCallback();
      }
      setTimeout("oThisPage.fnPollQuestion()", 2000);
    });
	},
	'fnNavigateLesson': function(sDir) {
    var aPost = {
      'sDir': sDir,
      'sHash': $("#hash").val()
    };
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "navigate",
      'success': function(aData, textStatus, jqXHR) {
        var oAnswerControl = $("#answer-controls");
        if (aData.bFirst) {
          oAnswerControl.find(".prev-question").addClass('ui-state-disabled');
        }
        else {
          oAnswerControl.find(".prev-question").removeClass('ui-state-disabled');
        }
        
        if (aData.bLast) {
          oAnswerControl.find(".next-question").addClass('ui-state-disabled');
        }
        else {
          oAnswerControl.find(".next-question").removeClass('ui-state-disabled');
        }
      }
    });
  },
  'fnAnswerControlHide': function(bForce) {
    var oAnswerControlSmall = $("#answer-control-small"); 
    var oAnswerControlLarge = $("#answer-control-large"); 
    if (bForce || ( ! oAnswerControlLarge.hasClass('state-hover') ) ) {
      
      oAnswerControlLarge.fadeOut(250, function() {
        $(this).addClass('state-hide');
        oAnswerControlSmall.removeAttr('style').css('opacity',0).removeClass('state-hide');
        oAnswerControlSmall.animate({
          "opacity": 0.2
        }, 250, function() {
          
        });
      });
      
      
    }
  },
  'fnAnswerControlShow': function() {
    var oAnswerControlSmall = $("#answer-control-small"); 
    var oAnswerControlLarge = $("#answer-control-large"); 
    
    oAnswerControlSmall.fadeOut(250, function() {
      $(this).addClass('state-hide');
      oAnswerControlLarge.removeAttr('style').css('opacity',0).removeClass('state-hide');
      oAnswerControlLarge.animate({
        "opacity": 1
      }, 250, function() {
        
      });
    });
    
    
    
  },
  
	// Pupil
	'fnRenderPupilList': function() {
    $("#pupil.view .body .pupil-list").html("");
    
    var aPost = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    oThisPage.fnGetPupilList(aPost, function(aData, textStatus, jqXHR) {
      $.each(aData, function() {
        var sHtml = 
            '<div class="image">' + 
              '<div class="icon">' +
                '<img src="' + this.sImageUrl + '" />' +
              '</div>' + 
              '<div class="label">' +
                $.trim($.trim(this.sFirstName + ' ' + this.sMiddleName) + ' ' + this.sLastName) + 
              '</div>' +
            '</div>';
        var oHtml = $(sHtml);
        oHtml.data("aData", this);
        oHtml.click(function() {
          var aData = $(this).data("aData");
          var oPopup = $("#add-pupil-popup");
          $(".modal").addClass('state-show');
          oPopup.removeClass('state-hide');
          oPopup.find(".head #action").html("Edit");
          oPopup.find("#create-button").addClass("state-hide");
          oPopup.find("#update-button").removeClass("state-hide");
          oPopup.find(".picture img").attr('src', aData.sImageUrl);
          oPopup.find(".picture #image-id").val(aData.iImageId);
          oPopup.find("#first-name input").val(aData.sFirstName);
          oPopup.find("#middle-name input").val(aData.sMiddleName);
          oPopup.find("#last-name input").val(aData.sLastName);
        });
        $("#pupil.view .body .pupil-list").append(oHtml);
      });
    });   
  },
  'fnGetPupilList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/pupil.json",
      'success': fnCallback
    });
  },
  
  // Session
	'fnGetSession': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "get/session.json",
      'success': fnCallback
    });
  },
  'fnGetSessionList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/session.json",
      'success': fnCallback
    });
  },
  
  
	
	
	
	
	
	'contentTypeAnimateFlip': function(oElement, sText) {
    oElement.animate({
        'height': 'toggle',
        'bottom': '+=25'
      }, 1000,
      function() {
        oElement.animate({
            'height': 'toggle',
            'bottom': '-=25'
          }, 1000,
          function() {
            oElement.html(sText);
          }
        );
      }
    );
  },
  'contentTypeMouseUp': function()
	{
		$("body").css("cursor", "progress");
		var display_content_dom = $(this);
		var display_content = display_content_dom.html();
		display_content = (display_content == 'image') ? 'text' : 'image';
		display_content_dom.html('');
		display_content_dom.removeClass('ui-state-active');

		//thisPage.contentTypeAnimateFlip(content_type_dom, content_type);

		var icon_dom = $("#display_image img");
		var display_text_dom = $("#display_text");

		
		switch (display_content)
		{
			case 'image':
				thisPage.showImage(display_text_dom, icon_dom);
				break;

			case 'text':
				thisPage.showText(display_text_dom, icon_dom);
				break;
		}
		display_content_dom.html(display_content);

		var post_info =
		{
			'id': $("#pupil_display").data('info').id,
			'display_content': display_content
		};
		postData('tutor', 'update_tutoring_session', post_info, function(response_text){});
	},
	'run': function()
	{
		getDataList('pupil', 'session_list', {}, this.loadSessionList);
	},
	'loadSessionList': function(response_text)
	{
		var session_list = eval(response_text);

		$.each(session_list, function(index)
		{
			var html =	'<div class="session_icon thumbnail_container">'
								+		'<center>'
								+			'<div class="pupil_icon thumbnail_container data_point">'
								+				'<div class="icon image">'
								+					'<img id="icon" src="' + this.pupil_info.icon + '" alt="?">'
								+				'</div>'
								+				'<div id="pupil_name">' + this.pupil_info.first_name + '</div>'
								+			'</div>'
								+			'<div class="tutor_icon thumbnail_container data_point">'
								+				'<div class="icon image">'
								+					'<img id="icon" src="' + this.tutor_info.icon + '" alt="?">'
								+				'</div>'
								+				'<div id="tutor_name">' + this.tutor_info.last_name + '</div>'
								+			'</div>'
								+		'</center>'
								+		'<input type="hidden" id="session_id" value="' + this.id + '">'
								+ '</div>';
			var html_dom = $(html);
			html_dom.children('.pupil_icon').data('info', this.pupil_info);
			html_dom.children('.tutor_icon').data('info', this.tutor_info);
			html_dom.children('.lesson_icon').data('info', this.lesson_info);
			html_dom.data("info", this);
			html_dom.disableTextSelect();
			html_dom.dblclick(thisPage.showImageDisplay);

			$("#session_list_display .content").append(html_dom);
		});
	},
	'showImageDisplay': function()
	{
		var session_info = $(this).data('info');
		$('#session_list_display').hide();
		$('#pupil_display').show();

		$('#session_hash').val(session_info.hash);

		var cur_win_height = $("input[name='cur_win_height']");
		cur_win_height.val($(window).height());
		var cur_win_width = $("input[name='cur_win_width']");
		cur_win_width.val($(window).width());

		var progress_bar = $("#progress_bar");
		var display_image = $('#display_image img');
		//display_image.height(cur_win_height - progress_bar.height());

		$("#display_text").hide();
		$("#display_image").hide();
		$("#answer_controls").css('bottom', '-60px');

		var yes_button_dom = $("#answer_controls .yes_button");
		yes_button_dom.hoverIntent(thisPage.buttonHoverOn, thisPage.buttonHoverOff);
		yes_button_dom.mousedown(thisPage.buttonMouseDown);
		yes_button_dom.mouseup(thisPage.buttonMouseUp);
		yes_button_dom.disableTextSelect();

		var no_button_dom = $("#answer_controls .no_button");
		no_button_dom.hoverIntent(thisPage.buttonHoverOn, thisPage.buttonHoverOff);
		no_button_dom.mousedown(thisPage.buttonMouseDown);
		no_button_dom.mouseup(thisPage.buttonMouseUp);
		no_button_dom.disableTextSelect();

		var content_type_dom = $("#answer_controls .content_type");
		content_type_dom.hoverIntent(thisPage.buttonHoverOn, thisPage.buttonHoverOff);
		content_type_dom.mousedown(thisPage.buttonMouseDown);
		content_type_dom.mouseup(thisPage.contentTypeMouseUp);
		content_type_dom.disableTextSelect();
		content_type_dom.click(thisPage.contentTypeClick)

		var prev_question_dom = $("#answer_controls .prev_question");
		prev_question_dom.hoverIntent(thisPage.buttonHoverOn, thisPage.buttonHoverOff);
		prev_question_dom.mousedown(thisPage.buttonMouseDown);
		prev_question_dom.mouseup(thisPage.buttonMouseUp);

		var next_question_dom = $("#answer_controls .next_question");
		next_question_dom.hoverIntent(thisPage.buttonHoverOn, thisPage.buttonHoverOff);
		next_question_dom.mousedown(thisPage.buttonMouseDown);
		next_question_dom.mouseup(thisPage.buttonMouseUp);

		thisPage.getCurrentImage();

		$(window).resize(function() {thisPage.onWindowResize($(window));});

		thisPage.onWindowResize($(window));
		
	},
	'contentTypeClick': function()
	{
		var content_type_dom = $(this);
		var icon_dom = $("#display_image img");
		var display_text_dom = $("#display_text");

		var content_type = content_type_dom.html();
		content_type = (content_type == 'image') ? 'text' : 'image';
		switch (content_type)
		{
			case 'image':
				thisPage.showImage(display_text_dom, icon_dom);
				break;

			case 'text':
				thisPage.showText(display_text_dom, icon_dom);
				break;
		}
		content_type_dom.html(content_type);
	},
	'onWindowResize': function(window)
	{
		var progress_bar = $("#progress_bar");

		var new_win_height = window.height() - progress_bar.height();

		var icon_dom = $('#display_image img');
		icon_dom.height(new_win_height * .99);
		icon_dom.css('line-height', new_win_height + 'px');

		$("#display").height(new_win_height);

		var display_text_dom = $("#display_text");

		display_text_dom.css('line-height', new_win_height + 'px');
		display_text_dom.css('height', new_win_height + 'px');
	},
	'getCurrentImage': function()
	{
		var session_hash = $("#session_hash").val();
		getData('pupil', 'current_image', {'session_hash' : session_hash}, function(responseText)
		{
			var pupil_display_dom = $("#pupil_display");
			var cur_image_info = pupil_display_dom.data('info');
			var new_image_info = eval('(' + responseText + ')');
			if (util.isEmpty(cur_image_info) 
						|| (parseInt(cur_image_info.order_index) != parseInt(new_image_info.order_index))
						|| (cur_image_info.display_content != new_image_info.display_content))
			{
				pupil_display_dom.data('info', new_image_info);

				var icon_dom = $("#display_image img");
				var display_text_dom = $("#display_text");
				icon_dom.attr('src', new_image_info.icon);
				display_text_dom.html(new_image_info.question_text);

				$("#answer_controls .content_type").html(new_image_info.display_content);
					
				switch (new_image_info.display_content)
				{
					case 'image':
						thisPage.showImage(display_text_dom, icon_dom);
						break;

					case 'text':
						thisPage.showText(display_text_dom, icon_dom);
						break;
				}
				thisPage.fillProgressBar($("#progress_bar"), new_image_info.order_index, new_image_info.total_questions, '/images/uploads/star.png');
				$(window).resize();
			}
			setTimeout( "thisPage.getCurrentImage()", 1000 );
		});
	},
	'showImage': function(display_text_dom, icon_dom)
	{
		display_text_dom.hide();
		icon_dom.parent('#display_image').fadeIn(500, function()
		{
			$("body").css("cursor", "pointer");
		});

	},
	'showText': function(display_text_dom, icon_dom)
	{
		icon_dom.parent('#display_image').hide();
		display_text_dom.fadeIn(500, function()
		{
			$("body").css("cursor", "pointer");
		});

	},
	'fillProgressBar': function(progress_bar_obj, index, max, icon)
	{
		progress_bar_obj.html('');
		var html = '';
		for (var i = 1; i <= max; i++)
		{
			var bg_color = i % 2 == 0 ? 'bg1' : 'bg2';
			html += '<div class="cell ' + bg_color + '">';
			html +=	(i <= index) ? '<img src="' + icon + '">' : '';
			html += '</div>';
		}
		html += '<div class="cell cell_label">';
		html +=		'Question: ' + index + ' of ' + max
		html += '</div>';

		progress_bar_obj.html(html);
	}
}







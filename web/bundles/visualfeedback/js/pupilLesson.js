$(document).ready(function() {
	oMain.fnInit();
	oThisPage.fnInit();

  
	$(window).load(function() {
		
	});
});



var oThisPage = {
  'iCurrentQuestion': null,
  'bAnswerControlMoving': false,
	'fnInit': function() {
	  
		var sHover = 
      "#answer-controls .ui-icon, " +
      "#answer-controls .ui-button";
    $(sHover).hover(
      function() {
        $(this).addClass("ui-state-hover");
      },
      function() {
        $(this).removeClass("ui-state-hover");
      }
    );
    
    sHover = 
      "";
    $(sHover).fnTrackHover();
    
		$("#answer-controls .yes-button").click(function() {
      oThisPage.fnAnswerQuestion('yes');
    });
    $("#answer-controls .no-button").click(function() {
      oThisPage.fnAnswerQuestion('no');
    });
    $("#answer-controls .prev-question").click(function() {
      if ( ! $(this).hasClass("ui-state-disabled")) {
        oThisPage.fnNavigateLesson('prev');
      }
    });
    $("#answer-controls .next-question").click(function() {
      if ( ! $(this).hasClass("ui-state-disabled")) {
        oThisPage.fnNavigateLesson('next');
      }
    });
    $("#answer-controls .content-type").click(function() {
      var oView = $("#lesson.view");
      var sCurrent = $.trim($(this).html());
      switch (sCurrent) {
        case 'image':
          oView.find("#display-image").addClass('state-hide');
          oView.find("#display-text").removeClass('state-hide');
          $(this).html('text');
          break;
        
        case 'text':
          oView.find("#display-text").addClass('state-hide');
          oView.find("#display-image").removeClass('state-hide');
          $(this).html('image');
          break;
      }
    });
    
    $("#answer-controls .content-type").hover(
      function() {
        oThisPage.fnAnswerControlShow();
      },
      function() {
        
      }
    );
    
    $("#answer-controls").hover(
      function() {
        
      },
      function() {
        //setTimeout('oThisPage.fnAnswerControlHide()', 3000);
      }
    );
    
    oThisPage.fnAnswerControlHide();
		oThisPage.fnPollQuestion();
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
  'fnAnswerQuestion': function(sAnswer) {
    var aPost = {
      'sType': $.trim($("#answer-controls .content-type").html()),
      'sAnswer': sAnswer,
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
  'fnAnswerControlHide': function()
  {
    $("#answer-controls").animate({bottom: '-60px'}, 500);
  },
  'fnAnswerControlShow': function()
  {
    $("#answer-controls").animate({bottom: '0px'}, 500);
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
        '</tr>';
    var oHtml = $(sHtml);
    oHtml.fnTrackHover();
    oHtml.click(function() {
      var sHash = $.trim($(this).find(".hash").html());
      window.location.href = 'lesson?hash=' + sHash;
    });
    $("#session.view .body table.session-list tbody").append(oHtml);
  },
  
	
	'buttonMouseDown': function()
	{
		var answer_button_dom = $(this);
		answer_button_dom.addClass('ui-state-active');
	},
	'buttonMouseUp': function()
	{
		var answer_button_dom = $(this);
		answer_button_dom.removeClass('ui-state-active');
	},
	'buttonHoverOn': function()
	{
		var answer_button_dom = $(this);
		answer_button_dom.addClass('ui-state-hover');
	},
	'buttonHoverOff': function()
	{
		var answer_button_dom = $(this);
		answer_button_dom.removeClass('ui-state-hover');
		answer_button_dom.removeClass('ui-state-active');
	},

	'contentTypeAnimateFlip': function(content_type_dom, content_type)
	{
		content_type_dom.animate
		(
			{
				'height': 'toggle',
				'bottom': '+=25'

			}, 1000,
			function()
			{

				content_type_dom.animate
				(
					{
						'height': 'toggle',
						'bottom': '-=25'

					}, 1000,
					function()
					{
						content_type_dom.html(content_type);
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







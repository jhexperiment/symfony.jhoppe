$(document).ready(function() {
  oMain.fnInit();
  
  oThisPage.fnInit();

  $(window).load(function() {
  
  });
});

oThisPage = {
  'aTmpData': null,
  'sRootWebFolder': null,
  'sImageUploadFolder': null,
  'sAudioUploadFolder': null,
  'sTutorUploadFolder': null,
  'sPupilUploadFolder': null,
    
  'fnInit': function() {
    oThisPage.sRootWebUrl = $("#root-web-folder").val();
    oThisPage.sImageUploadFolder = $("#image-upload-folder").val();
    oThisPage.sAudioUploadFolder = $("#audio-upload-folder").val();
    oThisPage.sTutorUploadFolder = $("#tutor-upload-folder").val();
    oThisPage.sPupilUploadFolder = $("#pupil-upload-folder").val();
    
    
    var oMainMenu = $(".main-menu")
    oMainMenu.removeClass('state-hide');
    var iWidth = oMainMenu.width();
    oMainMenu.css("margin-left", "-" + iWidth +"px")
    oMainMenu.data('orig-width', iWidth);
    oMainMenu.animate({
      "margin-left": 0
    }, 500, function() {
      
    });
    
    var sHover = 
      ".main-menu .menu-item, " +
      ".sub-menu .menu-item, " + 
      ".sub-menu-container .search-bar .search-button";
    $(sHover).hover(
      function() {
        $(this).addClass("state-hover");
      },
      function() {
        $(this).removeClass("state-hover");
      }
    );
    
    $(".main-menu .menu-item").click(function() {
      var sId = $(this).attr("id");
      var oContainer = $(".sub-menu-container");
      oContainer.find(".sub-menu").addClass("state-hide");
      var oSubMenu = oContainer.find("#" + sId + ".sub-menu");
      oSubMenu.removeClass('state-hide');
      var iWidth = oSubMenu.width();
      oSubMenu.css("margin-left", "-" + iWidth +"px")
      oSubMenu.data('orig-width', iWidth);
      
      $(".main-menu .menu-item").removeClass('state-selected');
      $(this).addClass('state-selected');
      
      $(".view").addClass('state-hide');
      $("#" + sId + ".view").removeClass('state-hide');
      
      $(".sub-menu-container .search-bar input").val("");
      
      
      oSubMenu.animate({
        "margin-left": 0
      }, 250, function() {
        
      });
    });
    
    
    $(document).keypress(function(event) {
      if (event.keyCode == $.KEY.ESCAPE) {
        $.each($(".add-popup"), function() {
          if ( ! $(this).hasClass("state-hide")) {
            $(this).find(".foot #cancel-button").click();
          }
        });
      }
    });
    
    // Image
    $(".main-menu #image.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      var sSearch = $(".sub-menu-container .search-bar input").val();
      oThisPage.fnGetImageList(sSearch, 'uploads', oThisPage.fnDisplayImageTabImages);
    });
    $("#image.sub-menu .menu-item .input input").uploadify({
      'swf' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'uploader' : 'upload/image',
      'buttonClass': 'uploader-button',
      'buttonText' : 'BROWSE...',
      'fileTypeExts' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileTypeDesc' : 'Image Files',
      'multi' : true,
      //'uploadLimit': 10,
      'auto' : true,
      'method'   : 'post',
      'formData' : { 
        'type': 'upload',
        'folder' : oThisPage.sRootWebUrl + oThisPage.sImageUploadFolder, 
      },
      'onQueueComplete' : function(event, ID, fileObj, response, data) {
        var oInput = $("#image.sub-menu .menu-item .input");
        oInput.animate({
          'width': 0
        }, 250, function() {
          oInput.addClass('state-hide');
          oInput.width(oInput.data("original-width"));
          oInput.removeAttr("style");
        });
      },
      'onUploadError' : function(file, errorCode, errorMsg, errorString) {
        var tmp = '';
      },
      'onUploadSuccess' : function(file, data, response) {
        //alert('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
      }
    });
    $("#image.sub-menu #add.menu-item").click(function() {
      var oInput = $(this).parent().find(".input");
      oInput.data("original-width", oInput.width());
      oInput.width(0);
      oInput.removeClass("state-hide");
      
      oInput.animate({
        'width': oInput.data("original-width")
      }, 250, function() {
        oInput.css("width", "auto");
      });
    });
    
    
    // Audio
    $(".main-menu #audio.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      var sSearch = $(".sub-menu-container .search-bar input").val();
      oThisPage.fnGetAudioList(sSearch, 'uploads', oThisPage.fnDisplayAudioTabFiles);
    });
    $("#audio.sub-menu .menu-item .input input").uploadify({
      'swf' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'uploader' : 'upload/audio',
      'buttonClass': 'uploader-button',
      'buttonText' : 'BROWSE...',
      'fileTypeExts' : '*.mp3;*.m4a;*.oga;',
      'fileTypeDesc' : 'Audio Files',
      'multi' : true,
      //'uploadLimit': 10,
      'auto' : true,
      'method'   : 'post',
      'formData' : { 
        'folder' : oThisPage.sRootWebUrl + oThisPage.sAudioUploadFolder, 
      },
      'onQueueComplete' : function(event, ID, fileObj, response, data) {
        var oInput = $("#audio.sub-menu .menu-item .input");
        oInput.animate({
          'width': 0
        }, 250, function() {
          oInput.addClass('state-hide');
          oInput.width(oInput.data("original-width"));
          oInput.removeAttr("style");
        });
      },
      'onUploadError' : function(event,ID,fileObj,errorObj) {
        var tmp = '';
      }
    });
    $("#audio.sub-menu #add.menu-item").click(function() {
      var oInput = $(this).parent().find(".input");
      oInput.data("original-width", oInput.width());
      oInput.width(0);
      oInput.removeClass("state-hide");
      
      oInput.animate({
        'width': oInput.data("original-width")
      }, 250, function() {
        oInput.css("width", "auto");
      });
    });
    
    
    // Tutor
    $(".main-menu #tutor.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      oThisPage.fnRenderTutorList();
    });
    $("#tutor.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-tutor-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
      oPopup.find("#update-button").addClass('state-hide');
      oPopup.find(".picture img").attr("src", "");
      oPopup.find("input").val("");
      
      $.fnCenter(oPopup);
      $(".modal").addClass('state-show');
    });
    $("#add-tutor-popup").draggable({
      'handle': '.move-handle'
    });
    $("#add-tutor-popup .upload input").uploadify({
      'swf' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'uploader' : 'upload/image',
      'buttonClass': 'uploader-button',
      'buttonText' : '',
      'fileTypeExts' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileTypeDesc' : 'Image Files',
      'multi' : false,
      'auto' : true,
      'method'   : 'post',
      'formData' : { 
        'type': 'tutor_icon',
        'folder' : oThisPage.sRootWebUrl + oThisPage.sTutorUploadFolder, 
      },
      'onQueueComplete' : function(aQueueData) {
        var tmp = '';
      },
      'onUploadSuccess' : function(aFile, aData) {
        aData = eval('(' + aData + ')');
        //var sUrl = oThisPage.sRootWebUrl + oThisPage.sTutorUploadFolder + '/' + aFile.name;
        var oPicture = $("#add-tutor-popup #main.popup-view .body .left .picture");
        oPicture.find("#image-id").val(aData.iId);
        oPicture.find("img").attr("src", aData.sUrl);
      },
      'onUploadError' : function(event, ID, fileObj, errorObj) {
        var tmp = '';
      }
    });
    $("#add-tutor-popup .upload #choose-button").click(function() {
      var oPopup = $(this).parents("#add-tutor-popup");
      oPopup.find(".popup-view").addClass('state-hide');
      oPopup.find("#image-list").removeClass('state-hide');
      
      var aData = {
        
      };
      
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "list/tutor/icon.json",
        'success': function(aData, textStatus, jqXHR) {
          var oBody = $("#add-tutor-popup #image-list.popup-view .body");
          oBody.html("");
          if (aData == null || aData.length == 0) {
            var sHtml = 
              '<div class="message">No Tutor images found.</div>';
            oBody.append(sHtml);
          }
          else {
            $.each(aData, function() {
              var sHtml = 
                  '<div class="image">' + 
                    '<input type="hidden" id="image-id" value="' + this.iId + '"/>' + 
                    '<div class="icon">' +
                      '<img src="' + this.sUrl + '" />' +
                    '</div>' + 
                    '<div class="label state-hide">' +
                      this.sLabel +
                    '</div>' +
                  '</div>';
              var oHtml = $(sHtml);
              oHtml.click(function() {
                var oPopup = $(this).parents("#add-tutor-popup");
                oPopup.find(".popup-view").addClass('state-hide');
                var iId = $(this).find("#image-id").val();
                var sUrl = $(this).find("img").attr('src');
                var oPicture = oPopup.find("#main.popup-view .body .left .picture");
                oPicture.find("img").attr('src', sUrl);
                oPopup.find("#image-id").val(iId);
                oPopup.find("#main.popup-view").removeClass('state-hide');
              });
              oBody.append(oHtml);
            });
          }
          
        }
      });
    });
    $("#add-tutor-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $("#add-tutor-popup");
      oPopup.addClass('state-hide');
      /*
      oPopup.animate({
        'opacity': 0.0
      }, 1000, function() {
        oPopup.addClass("state-hide");
        oPopup.removeAttr('style');
      });
      */
    });
    $("#add-tutor-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      var aData = {
        'sFirstName' : oContainer.find("#first-name input").val(),
        'sMiddleName' : oContainer.find("#middle-name input").val(),
        'sLastName' : oContainer.find("#last-name input").val(),
        'iImageId' : oView.find(".picture #image-id").val()
      }
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "create/tutor",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-tutor-popup").addClass('state-hide');
        }
      });
    });
    $("#add-tutor-popup #image-list.popup-view .foot #return-button").click(function() {
      var oPopup = $(this).parents("#add-tutor-popup");
      oPopup.find("#image-list.popup-view").addClass("state-hide");
      oPopup.find("#main.popup-view").removeClass("state-hide");
    });
    $("#add-tutor-popup #main.popup-view .foot #update-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      var aPost = {
        'iTutorId': oView.find(".head #tutor-id").val(),
        'iImageId': oView.find(".body #image-id").val(),
        'sFirstName': oView.find(".body #first-name input").val(),
        'sMiddleName': oView.find(".body #middle-name input").val(),
        'sLastName': oView.find(".body #last-name input").val()
      }
      $.ajax({
        'data': aPost,
        'dataType': 'json',
        'type': 'POST',
        'url': "update/tutor",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-tutor-popup").addClass('state-hide');
          
        }
      });
    });
    
    
    //Pupil
    $(".main-menu #pupil.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      oThisPage.fnRenderPupilList();
    });
    $("#pupil.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-pupil-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
      oPopup.find("input, select").val("");
      
      $.fnCenter(oPopup);
      $(".modal").addClass('state-show');
      /*
      oPopup.css('opacity', 0.0);
      
      oPopup.animate({
        'opacity': 1.0
      }, 1000, function() {
        //oPopup.removeAttr('style');
      });
      */
    });
    $("#add-pupil-popup").draggable({
      'handle': '.move-handle'
    });
    $("#add-pupil-popup .upload input").uploadify({
      'swf' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'uploader' : 'upload/image',
      'buttonClass': 'uploader-button',
      'buttonText' : '',
      'fileTypeExts' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileTypeDesc' : 'Image Files',
      'multi' : false,
      'auto' : true,
      'method'   : 'post',
      'formData' : { 
        'type': 'pupil_icon',
        'folder' : oThisPage.sRootWebUrl + oThisPage.sPupilUploadFolder, 
      },
      'onQueueComplete' : function(aQueueData) {
        var tmp = '';
      },
      'onUploadSuccess' : function(aFile, aData) {
        aData = eval('(' + aData + ')');
        //var sUrl = oThisPage.sRootWebUrl + oThisPage.sPupilUploadFolder + '/' + aFile.name;
        var oPicture = $("#add-pupil-popup #main.popup-view .body .left .picture");
        oPicture.find("#image-id").val(aData.iId);
        oPicture.find("img").attr("src", aData.sUrl);
      },
      'onUploadError' : function(event, ID, fileObj, errorObj) {
        var tmp = '';
      }
    });
    $("#add-pupil-popup .upload #choose-button").click(function() {
      var oPopup = $(this).parents("#add-pupil-popup");
      oPopup.find(".popup-view").addClass('state-hide');
      oPopup.find("#image-list").removeClass('state-hide');
      
      var aData = {
        
      };
      
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "list/pupil/icon.json",
        'success': function(aData, textStatus, jqXHR) {
          var oBody = $("#add-pupil-popup #image-list.popup-view .body");
          oBody.html("");
          if (aData == null || aData.length == 0) {
            var sHtml = 
              '<div class="message">No Pupil images found.</div>';
            oBody.append(sHtml);
          }
          else {
            $.each(aData, function() {
              var sHtml = 
                  '<div class="image">' + 
                    '<input type="hidden" id="image-id" value="' + this.iId + '"/>' + 
                    '<div class="icon">' +
                      '<img src="' + this.sUrl + '" />' +
                    '</div>' + 
                    '<div class="label state-hide">' +
                      this.sLabel +
                    '</div>' +
                  '</div>';
              var oHtml = $(sHtml);
              oHtml.click(function() {
                var oPopup = $(this).parents("#add-pupil-popup");
                oPopup.find(".popup-view").addClass('state-hide');
                var iId = $(this).find("#image-id").val();
                var sUrl = $(this).find("img").attr('src');
                var oPicture = oPopup.find("#main.popup-view .body .left .picture");
                oPicture.find("img").attr('src', sUrl);
                oPopup.find("#image-id").val(iId);
                oPopup.find("#main.popup-view").removeClass('state-hide');
              });
              oBody.append(oHtml);
            });
          }
          
        }
      });
    });
    $("#add-pupil-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $(this).parents(".add-popup");
      oPopup.addClass('state-hide');
      
    });
    $("#add-pupil-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      var aData = {
        'sFirstName' : oContainer.find("#first-name input").val(),
        'sMiddleName' : oContainer.find("#middle-name input").val(),
        'sLastName' : oContainer.find("#last-name input").val(),
        'iImageId' : oView.find(".picture #image-id").val()
      }
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "create/pupil",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-pupil-popup").addClass('state-hide');
        }
      });
    });
    $("#add-pupil-popup #image-list.popup-view .foot #return-button").click(function() {
      var oPopup = $(this).parents("#add-pupil-popup");
      oPopup.find("#image-list.popup-view").addClass("state-hide");
      oPopup.find("#main.popup-view").removeClass("state-hide");
    });
    
    //Lesson
    $(".main-menu #lesson.menu-item").click(function() {
      var oFilterList = $(".sub-menu-container .filter-list");
      oFilterList.removeClass('state-hide');
      oFilterList.find("#lesson-plan").removeClass('state-hide');
      
      oThisPage.fnRenderLessonTable();
    });
    $("#lesson.sub-menu #add.menu-item").click(function() {
      oThisPage.fnShowLessonPopup();
    });
    $("#add-lesson-popup").draggable({
      'handle': '.move-handle'
    });
    $("#add-lesson-popup .body .selected-images .wrapper").sortable({
      //'appendTo': "#add-lesson-popup .body .image-list",
      'connectWith': ".image-drag-drop",
      'placeholder': "ui-state-highlight image",
      //'containment': 'parent',
      'forcePlaceHolderSize': true,
      'helper': 'clone',
      //'forceHelperSize': true,
      //'grid': [64, 64],
      //'cursorAt': { 'left': 32 },
      //'delay': 250
      //'refreshPositions': true,
      //'items': '.image',
      'axis': 'x',
      'tolerance': 'pointer',
      'dropOnEmpty': true,
      'revert': false,
      'delay': 100,
      'opacity': 0.8,
      'receive': function(event, ui) {
        oThisPage.fnReorderLessonImages(ui.item.clone());
        $(this).find(".drop-message").addClass('state-hide');
        oThisPage.fnResizeLessonImageList(ui.item);
      },
      'stop': function(event, ui) {
        var sHtml = 
          '<input type="text" class="new-value" value="' + $.trim(ui.item.find(".label").html()) + '"/>';
        var oHtml = $(sHtml);
        
        ui.item.find(".label").html(oHtml);
        
        oThisPage.fnReorderLessonImages(ui.item);
      }
      
    }).sortable("refresh");
    $("#add-lesson-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $(this).parents(".add-popup");
      oPopup.addClass('state-hide');
    });
    $("#add-lesson-popup .body #image-list-label .filter #filter-button").click(function() {
      var oBody = $(this).parents(".body");
      var oImageList = oBody.find(".image-list");
      var sFilter = oBody.find(".filter input").val();
      
      var oRegExp = new RegExp(sFilter);
      
      $.each(oImageList.find(".image"), function() {
        if (sFilter == undefined || sFilter == "") {
          $(this).removeClass('state-hide');
        }
        else if ($(this).data("aData").sLabel.search(oRegExp) != -1) {
          $(this).removeClass('state-hide');
        }
        else {
          $(this).addClass('state-hide');
        }
      });
    });
    $("#add-lesson-popup .body #image-list-label .filter input").keypress(function(event) {
      if (event.keyCode == $.KEY.RETURN) {
        $(this).parents(".filter").find("#filter-button").click();
      }
    });
    $("#add-lesson-popup #main.popup-view #subject select").change(function() {
      
      var aPost = {
        'iSubjectId': $(this).val()
      };
      
      oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
        var oSelect = $("#add-lesson-popup .body .input #lesson-plan select");
        oSelect.html('<option value="">Select</option>');
        $.each(aData, function() {
          var sSelected = '';
          if ( ! $.fnIsEmpty(oThisPage.aTmpData) && ! $.fnIsEmpty(oThisPage.aTmpData.iLessonPlanId)) {
            if (oThisPage.aTmpData.iLessonPlanId == this.iId) {
              sSelected = 'selected="selected"';
            }
          }
          var sHtml = 
              '<option value="' + this.iId + '" ' + sSelected + '>' + 
                 this.sName +
              '</option>';
          var oHtml = $(sHtml);
          
          oSelect.append(oHtml);
        });
        
        if ( ! $.fnIsEmpty(oThisPage.aTmpData)) {
          oThisPage.aTmpData = null;
        }
      
      });
    });
    $("#add-lesson-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      var aQuestionList = {};
      var iCount = 0;
      $.each(oView.find(".selected-images .image"), function(iIndex) {
        aQuestionList[iIndex] = {
          'iIndex': iIndex,
          'iImageId': $(this).find("input").val(),
          'sText': $.trim($(this).find(".label input").val())
        };
        iCount++;
      });
      
      var bValid = iCount > 0;
      if ( ! bValid) {
        oView.find(".selected-images").addClass('state-error');
      }
      else {
        oView.find(".selected-images").removeClass('state-error');
      }
      
      var aRequiredItems = oView.find(".required");
      if (oThisPage.fnValidateRequiredItems(aRequiredItems) && bValid) {
        var aData = {
          'sType': 'Image Question',
          'sName': oView.find(".body .input .value input").val(),
          'sSubject': oView.find(".body .input #subject input").val(),
          'sLessonPlan': oView.find(".body .input #lesson-plan input").val(),
          'aQuestionList': aQuestionList
        }
        $.ajax({
          'data': aData,
          'dataType': 'json',
          'type': 'POST',
          'url': "create/lesson",
          'success': function(aData, textStatus, jqXHR) {
            $(".modal").removeClass('state-show');
            $("#add-lesson-popup").addClass('state-hide');
          }
        });
      }
      
      
    });
    $("#add-lesson-popup #main.popup-view .foot #update-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      var aPost = {
        'sType': 'Image Question',
        'iLessonId': oView.find(".head #lesson-id").val(),
        'sName': oView.find(".body .input .value input").val(),
        'sSubject': oView.find(".body .input #subject input").val(),
        'sLessonPlan': oView.find(".body .input #lesson-plan input").val(),
        'aQuestionList': oThisPage.fnReadLessonPopupImageList(oView)
      }
      $.ajax({
        'data': aPost,
        'dataType': 'json',
        'type': 'POST',
        'url': "update/lesson",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-lesson-popup").addClass('state-hide');
          oThisPage.fnRenderLessonTable();
        }
      });
    });
    $("#add-lesson-popup .body .image-list").resizable({
      'handles': "s",
      'alsoResize': "#add-lesson-popup, #add-lesson-popup .body, #add-lesson-popup .popup-view, #add-lesson-popup .background"
    });
    
    //Session
    $(".main-menu #session.menu-item").click(function() {
      oThisPage.fnRenderSessionTable();
    });
    $("#session.sub-menu #add.menu-item").click(function() {
      oThisPage.fnShowSessionPopup();
    });
    $("#add-session-popup").draggable({
      'handle': '.move-handle'
    });
    $("#add-session-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $(this).parents(".add-popup");
      oPopup.addClass('state-hide');
      oPopup.find("table tbody").empty();
    });
    $("#add-session-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      
      var aData = {
        'iTutorId': $.trim(oView.find(".body #tutor-list tr.state-selected td.id").html()),
        'iPupilId': $.trim(oView.find(".body #pupil-list tr.state-selected td.id").html()),
        'iLessonId': $.trim(oView.find(".body #lesson-list tr.state-selected td.id").html())
        
      }
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "create/session",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-session-popup").addClass('state-hide');
        }
      });
      
      
      
    });
    $("#add-session-popup #main.popup-view .foot #update-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      var aPost = {
        'sType': 'Image Question',
        'iLessonId': oView.find(".head #lesson-id").val(),
        'sName': oView.find(".body .input .value input").val(),
        'sSubject': oView.find(".body .input #subject input").val(),
        'sLessonPlan': oView.find(".body .input #lesson-plan input").val(),
        'aQuestionList': oThisPage.fnReadLessonPopupImageList(oView)
      }
      $.ajax({
        'data': aPost,
        'dataType': 'json',
        'type': 'POST',
        'url': "update/session",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-lesson-popup").addClass('state-hide');
          oThisPage.fnRenderLessonTable();
        }
      });
    });
    
    
    //Setting 
    $(".main-menu #setting.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
    });
    $("#setting.view .body .action-list #save-button").click(function() {
      oThisPage.fnUpdateAllSettings();
    });
    
    // General
    $(".sub-menu-container .search-bar input").keypress(function(event) {
      if (event.keyCode == $.KEY.RETURN) {
        $(this).parents(".search-bar").find(".search-button").click();
      }
    });
    $(".sub-menu-container .search-bar .search-button").click(function() {
      var oContainer = $(this).parents(".sub-menu-container");
      var oFilterList = oContainer.find(".filter-list");
      
      var oSelected = $(".main-menu .menu-item.state-selected");
      var sId = oSelected.attr("id");
      var aPost = {
        'sSearch': $(".sub-menu-container .search-bar input").val()
      };
      
      if (sId == "image") {
        var sSearch = $(".sub-menu-container .search-bar input").val();
        oThisPage.fnGetImageList(sSearch, 'uploads', oThisPage.fnDisplayImageTabImages);
      }
      else if (sId == "tutor") {
        oThisPage.fnRenderTutorList();
      }
      else if (sId == "lesson") {
        //aPost['iSubjectId'] = oFilterList.find("#subject select").val();
        //aPost['iLessonPlanId'] = oFilterList.find("#lesson-plan select").val();
        oThisPage.fnGetLessonList(aPost, function(aData, textStatus, jqXHR) {
          $("#lesson.view .body table.lesson-list tbody").html("");
          $.each(aData, function() {
            oThisPage.fnRenderLessonRow(this);
          });
        });
      }
      
    });
    $(".sub-menu-container .filter-list #subject select").change(function() {
      $(".sub-menu-container .search-bar .search-button").click();
      
      var aPost = {
        'iSubjectId': $(this).val()
      };
      
      oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
        var oSelect = $(".sub-menu-container .filter-list #lesson-plan select");
        oSelect.html('<option value="">All</option>');
        $.each(aData, function() {
          var sHtml = 
              '<option value="' + this.iId + '">' + 
                 this.sName +
              '</option>';
          var oHtml = $(sHtml);
          
          oSelect.append(oHtml);
        });
        
        $(".sub-menu-container .search-bar .search-button").click();
      });
      
    });
    $(".sub-menu-container .filter-list #lesson-plan select").change(function() {
      $(".sub-menu-container .search-bar .search-button").click();
    });
    
    // default to image tab
    setTimeout('$(".main-menu #session.menu-item").click()', 750);
  },
    
  // General
  'fnPreload': function() {
    var oImg = new Image(16,16);
    oImg.src = "/bundles/visualfeedback/images/chalkboard.med.png";
  },
  'fnValidateRequiredItems': function(aRequiredItems) {
    var bValid = true;
    $.each(aRequiredItems, function() {
      // process each input for required item
      $.each($(this).find("input, select"), function() {
        var sValue = $(this).val();
        $(this).removeClass("state-error");
        if (sValue == "" && ( ! $(this).hasClass('state-hide'))) {
          // value is required, mark as error
          $(this).addClass("state-error");
          bValid = false;
        }
        else {
          // value exists, check if valid
          var aValidationReturn = $(this).fnIsValid();
          if ( ! aValidationReturn.bValid ) {
            $(this).addClass("state-error");
            $(this).attr("title", aValidationReturn.sError);
            bValid = false;
          }
          else {
            $(this).removeClass("state-error");
            $(this).removeAttr("title");
          }
        }
      });
    });
    
    return bValid;
  },
  
  // Session
  'fnShowSessionPopup': function() {
    var oPopup = $("#add-session-popup");
    oPopup.find(".head #action").html("Add");
    oPopup.find(".foot #update-button").addClass("state-hide");
    oPopup.find(".foot #create-button").removeClass("state-hide");
    oPopup.find("input, select").val("");
    oPopup.removeClass("state-hide");
    $.fnCenter(oPopup);
    $(".modal").addClass('state-show');
    
    var aPost = {
      'sSearch': ''
    };
    
    oThisPage.fnGetTutorList(aPost, function(aData, textStatus, jqXHR) {
      var oPopup = $("#add-session-popup");
      var oTutorList = oPopup.find("#tutor-list tbody").empty();
      $.each(aData, function() {
        var sHtml = 
          '<tr>' +
            '<td class="id">' + this.iId + '</td>' +
            '<td class="name">' + 
              $.trim(this.sFirstName + ' ' + this.sLastName) + 
            '</td>' +
          '</tr>';
        var oHtml = $(sHtml);
        oHtml.find("td.name").fnTrackHover().click(function() {
          var oPopup = $("#add-session-popup");
          oPopup.find("#tutor-list .state-selected").removeClass('state-selected');
      
          $(this).parents("tr").addClass('state-selected');
        });
        
        oTutorList.append(oHtml);
      });
      
      var tmp = '';
    });
    
    oThisPage.fnGetPupilList(aPost, function(aData, textStatus, jqXHR) {
      var oPopup = $("#add-session-popup");
      var oTutorList = oPopup.find("#pupil-list tbody").empty();
      $.each(aData, function() {
        var sHtml = 
          '<tr>' +
            '<td class="id">' + this.iId + '</td>' +
            '<td class="name">' + 
              $.trim(this.sFirstName + ' ' + this.sLastName) + 
            '</td>' +
          '</tr>';
        var oHtml = $(sHtml);
        oHtml.find("td.name").fnTrackHover().click(function() {
          var oPopup = $("#add-session-popup");
          oPopup.find("#pupil-list .state-selected").removeClass('state-selected');
      
          $(this).parents("tr").addClass('state-selected');
        });
        oTutorList.append(oHtml);
      });
      
      var tmp = '';
    });
    
    oThisPage.fnGetLessonList(aPost, function(aData, textStatus, jqXHR) {
      var oPopup = $("#add-session-popup");
      var oTutorList = oPopup.find("#lesson-list tbody").empty();
      
      $.each(aData, function() {
        var sHtml = 
          '<tr>' +
            '<td class="id">' + this.id + '</td>' +
            '<td class="name">' + 
              this.name + 
            '</td>' +
          '</tr>';
        var oHtml = $(sHtml);
        oHtml.find("td.name").fnTrackHover().click(function() {
          var oPopup = $("#add-session-popup");
          oPopup.find("#lesson-list .state-selected").removeClass('state-selected');
      
          $(this).parents("tr").addClass('state-selected');
        });
        oTutorList.append(oHtml);
      });
      
      var tmp = '';
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
          '<td class="status">' + aSession.sStatus + '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    
    $("#session.view .body table.session-list tbody").append(oHtml);
  },
  
  
  // Lesson
  'fnReorderLessonImages': function(oImage) {
    if ($.fnIsEmpty(oImage)) {
      return false;
    }
    
    var oLeft = oImage.prev();
    var iIndex = 0;
    if ( (! $.fnIsEmpty(oLeft))  && oLeft.hasClass('image')) {
      iIndex = parseInt($.trim(oLeft.find('.index').html()));
    }
    iIndex += 1;
    
    if (oImage.find(".index").length == 0) {
      oImage.append('<span class="index">' + iIndex + '</span>');
    }
    
    if (oImage.find(".remove").length == 0) {
      var oRemove = $('<span class="remove">x</span>');
      oRemove.click(function() {
        var oRight = $(this).parents(".image").next();
        $(this).parents(".image").remove();
        
        if ( ! $.fnIsEmpty(oRight)) {
          oThisPage.fnReorderLessonImages(oRight);
          oThisPage.fnResizeLessonImageList(oRight);
        }
        
        
      });
      oImage.append(oRemove);
    }
    
    while ( ! $.fnIsEmpty(oImage)) {
      oImage.find('.index').html(iIndex++);
      oImage = oImage.next();
    }
  },
  'fnReadLessonPopupImageList':function(oView) {
    var aQuestionList = {};
    $.each(oView.find(".selected-images .image"), function(iIndex) {
      aQuestionList[iIndex] = {
        'iIndex': parseInt($.trim($(this).find(".index").html())),
        'sText': $.trim($(this).find(".label input").val()),
        'iImageId': $(this).find('#image-id').val()
      };
      
    });
    
    return aQuestionList;
  },
  'fnShowLessonPopup': function() {
    var oPopup = $("#add-lesson-popup");
    oPopup.find(".head #action").html("Add");
    oPopup.find(".foot #update-button").addClass("state-hide");
    oPopup.find(".foot #create-button").removeClass("state-hide");
    oPopup.find("input, select").val("");
    var oSelectedImages = oPopup.find(".selected-images .wrapper");
    oSelectedImages.find(".image").remove();
    oPopup.removeClass("state-hide");
    oPopup.find("#create-button").removeClass('state-hide');
    $.fnCenter(oPopup);
    $(".modal").addClass('state-show');
    
    var sSearch = $(".sub-menu-container .search-bar input").val();
    oThisPage.fnGetImageList(sSearch, 'uploads', function(aData, textStatus, jqXHR) {
      var oImageList = $("#add-lesson-popup .body .image-list");
      oImageList.find(".image").remove();
      $.each(aData, function() {
        var sHtml = 
        '<span class="image">' +
          '<input id="image-id" type="hidden" value="' + this.iId + '" />' + 
          '<img src="' + this.sUrl + '" />' +
          '<div class="label">' + this.sLabel + '</div>' +
        '</span>';
        var oHtml = $(sHtml);
        oHtml.data("aData", this);
        oHtml.dblclick(function() {
          var oSelectedImages = $("#add-lesson-popup .body .selected-images .wrapper");
          oSelectedImages.find(".drop-message").addClass('state-hide');
          
          var oImage = $(this).clone();
          oImage.data("aData", $(this).data("aData"));
          oThisPage.fnLessonAppendImage(oImage);
        });
        oHtml.draggable({
          'connectToSortable': ".image-drag-drop",
          //'containment': '#add-lesson-popup',
          //'cursor': 'move',
          //snap: '#content',
          //stack: true
          'helper': 'clone',
          'revert': false
        });
        oHtml.disableSelection();
        oImageList.append(oHtml);
      });
      
      oImageList.sortable({
        'disabled': true,
        'handle': '.image',
        'connectWith': ".image-drag-drop",
        'revert': false,
        'receive': function(event, ui) {
          event.stopPropagation();
          return false;
        }
      });
      
      oImageList.disableSelection();
      
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
  'fnLessonAppendImage': function(oImage) {
    var sHtml = 
      '<input type="text" class="new-value" value="' + $.trim(oImage.find(".label").html()) + '"/>';
    var oHtml = $(sHtml);
    oImage.find(".label").html(oHtml);
    var oSelectedImages = $("#add-lesson-popup .body .selected-images .wrapper");
    oSelectedImages.append(oImage);
    oThisPage.fnReorderLessonImages(oImage);
    oThisPage.fnResizeLessonImageList(oImage);
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
  'fnResizeLessonImageList': function(oImage) {
    var oSelectedImages = $("#add-lesson-popup .body .selected-images .wrapper");
    var iWidth = oImage.width();
    iWidth += parseInt(oImage.css("padding-left").replace('px', ''));
    iWidth += parseInt(oImage.css("padding-right").replace('px', ''));
    iWidth += parseInt(oImage.css("margin-left").replace('px', ''));
    iWidth += parseInt(oImage.css("margin-right").replace('px', ''));
    var iCount = oSelectedImages.find(".image").length;
    oSelectedImages.width(iWidth * (iCount + 2));
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
  
  // Image
  'fnUpdateImage': function(aData) {
    
  },
  'fnDisplayImageTabImages': function(aData, textStatus, jqXHR) {
    $("#image.view .body .image-list").html("");
    var i = 1;
    
    $.each(aData, function() {
      var sHtml = 
          '<div class="image">' + 
            '<div class="icon">' +
              '<img src="' + this.sUrl + '" />' +
            '</div>' + 
            '<div class="label">' +
              this.sLabel +
            '</div>' +
          '</div>';
      var oHtml = $(sHtml);
      oHtml.data("aData", this);
      
      oHtml.find(".label").dblclick(function() {
        // dblclick event on image label
        var sOldValue = $.trim($(this).html());
        $(this).data("sOldValue", sOldValue);
        
        var oImage = $(this).parents(".image");
        var iWidth = oImage.width();
        var sHtml = '<input type="text" value="' + sOldValue + '" />';
        var oInput = $(sHtml);
        oInput.width(iWidth);
        
        oInput.dblclick(function(event) {
          event.stopPropagation();
        });
        
        oInput.keypress(function(event) {
          // keypress event on input used to edit label
          var oLabel = $(this).parents(".label");
          var oOldValue = oLabel.data("sOldValue");
          
          if (event.keyCode == $.KEY.ESC) {
            var oImage = $(this).parents(".image");
            var oLabel = oImage.find(".label");
            oLabel.html(sOldValue);
          }
          else if (event.keyCode == $.KEY.RETURN) {
            // on RETURN key
            var sNewValue = $(this).val();
            if (sNewValue != sOldValue) {
              // new value is not the same as old value
              var oImage = $(this).parents(".image");
              var sHash = "image-" + $.fnGenerateHash(32);
              oImage.attr("id", sHash);
      
              var aData = {
                'sLabel': sNewValue,
                'iId': oImage.data("aData").iId,
                'sHash': sHash
              }; 
              // update database
              $.ajax({
                'data': aData,
                'dataType': 'json',
                'type': 'POST',
                'url': "update/image",
                'success': function(aData, textStatus, jqXHR) {
                  if (aData.bSuccess == true) {
                    var oImage = $("#image.view .body #" + aData.sHash + ".image");
                    var oLabel = oImage.find(".label");
                    oLabel.html(aData.sLabel);
                  }
                }
              });
            }
          }
        });
        $(this).html(oInput);
        oInput.focus();
      });
      
      $("#image.view .body .image-list").append(oHtml);
    });
  },
  'fnGetImageList': function(sSearch, sFolder, fnCallback) {
    var aData = {
      'sFolder': sFolder,
      'sSearch': sSearch
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/image.json",
      'success': fnCallback
    });
  },
  
  // Settings
  'fnUpdateAllSettings': function() {
    var aItemList = $("#setting.view .body .setting-item");
    var aSettingList = {};
    $.each(aItemList, function() {
      var sName = $(this).attr("id");
      var sValue = $(this).find("input").val();
      aSettingList[sName] = {
        'sName': sName,
        'sValue': sValue
      };
    });
    
    var aPost = {
      'aSettingList': aSettingList
    };
    
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "update/setting",
      'success': function(aData, textStatus, jqXHR) {
        
      }
    });
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
  
  // Tutor
  'fnRenderTutorList': function() {
    $("#tutor.view .body .tutor-list").html("");
    
    var aPost = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    oThisPage.fnGetTutorList(aPost, function(aData, textStatus, jqXHR) {
      $.each(aData, function() {
        var sHtml = 
            '<div class="tutor image">' + 
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
          var oPopup = $("#add-tutor-popup");
          $(".modal").addClass('state-show');
          oPopup.removeClass('state-hide');
          oPopup.find(".head #action").html("Edit");
          oPopup.find(".head #tutor-id").val(aData.iId);
          oPopup.find("#create-button").addClass("state-hide");
          oPopup.find("#update-button").removeClass("state-hide");
          oPopup.find(".picture img").attr('src', aData.sImageUrl);
          oPopup.find(".picture #image-id").val(aData.iImageId);
          oPopup.find("#first-name input").val(aData.sFirstName);
          oPopup.find("#middle-name input").val(aData.sMiddleName);
          oPopup.find("#last-name input").val(aData.sLastName);
        });
        $("#tutor.view .body .tutor-list").append(oHtml);
      });
    });
  },
  'fnGetTutorList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/tutor.json",
      'success': fnCallback
    });
  },
  
  // Audio
  'fnDisplayAudioTabFiles': function(aData, textStatus, jqXHR) {
    $("#audio.view .body .audio-list").html("");
    var i = 1;
    
    $.each(aData, function() {
      var sHtml = 
          '<div class="audio">' + 
            '<div class="icon">' +
              '<img src="/bundles/visualfeedback/images/audio-file.png" />' +
            '</div>' + 
            '<div class="label">' +
              this.sLabel +
            '</div>' +
          '</div>';
      var oHtml = $(sHtml);
      oHtml.data("aData", this);
      
      oHtml.find(".label").dblclick(function() {
        // dblclick event on image label
        var sOldValue = $.trim($(this).html());
        $(this).data("sOldValue", sOldValue);
        
        var oAudio = $(this).parents(".audio");
        var iWidth = oAudio.width();
        var sHtml = '<input type="text" value="' + sOldValue + '" />';
        var oInput = $(sHtml);
        oInput.width(iWidth);
        
        oInput.dblclick(function(event) {
          event.stopPropagation();
        });
        
        oInput.keypress(function(event) {
          // keypress event on input used to edit label
          var oLabel = $(this).parents(".label");
          var oOldValue = oLabel.data("sOldValue");
          
          if (event.keyCode == $.KEY.ESC) {
            var oAudio = $(this).parents(".audio");
            var oLabel = oAudio.find(".label");
            oLabel.html(sOldValue);
          }
          else if (event.keyCode == $.KEY.RETURN) {
            // on RETURN key
            var sNewValue = $(this).val();
            if (sNewValue != sOldValue) {
              // new value is not the same as old value
              var oAudio = $(this).parents(".audio");
              var sHash = "image-" + $.fnGenerateHash(32);
              oAudio.attr("id", sHash);
      
              var aData = {
                'sLabel': sNewValue,
                'iId': oAudio.data("aData").iId,
                'sHash': sHash
              }; 
              // update database
              $.ajax({
                'data': aData,
                'dataType': 'json',
                'type': 'POST',
                'url': "update/audio",
                'success': function(aData, textStatus, jqXHR) {
                  if (aData.bSuccess == true) {
                    var oAudio = $("#audio.view .body #" + aData.sHash + ".audio");
                    var oLabel = oAudio.find(".label");
                    oLabel.html(aData.sLabel);
                  }
                }
              });
            }
          }
        });
        $(this).html(oInput);
        oInput.focus();
      });
      
      $("#audio.view .body .audio-list").append(oHtml);
    });
  },
  'fnGetAudioList': function(sSearch, sFolder, fnCallback) {
    var aData = {
      'sSearch': sSearch
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/audio.json",
      'success': fnCallback
    });
  }

};

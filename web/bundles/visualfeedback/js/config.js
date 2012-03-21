$(document).ready(function() {
  oMain.fnInit();
  
  oThisPage.fnInit();

  $(window).load(function() {
  
  });
});

oThisPage = {
  'sRootWebFolder': null,
  'sImageUploadFolder': null,
  'sAudioUploadFolder': null,
  'sTutorUploadFolder': null,
  'sPupilUploadFolder': null,
  'fnInit': function() {
    oThisPage.sRootWebUrl = $("#root-web-folder").val();
    oThisPage.sImageUploadFolder = $("#image-upload-folder").val();
    oThisPage.sAudioUploadFolder = $("#action-upload-folder").val();
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
      
      oSubMenu.animate({
        "margin-left": 0
      }, 250, function() {
        
      });
    });
    
    // Image
    $(".main-menu #image.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      var sSearch = $(".sub-menu-container .search-bar input").val();
      oThisPage.fnGetImageList(sSearch, 'uploads', oThisPage.fnDisplayImageTabImages);
    });
    $("#image.sub-menu .menu-item .input input").uploadify({
      'uploader' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : oThisPage.sRootWebUrl + '/js/uploadify/cancel.png',
      'folder' : oThisPage.sRootWebUrl + oThisPage.sImageUploadFolder,
      'fileExt' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileDesc' : 'Image Files',
      'multi' : true,
      'simUploadLimit': 10,
      'auto' : true,
      'onAllComplete' : function(event, ID, fileObj, response, data) {
        var oInput = $("#image.sub-menu .menu-item .input");
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
    
    
    
    // Tutor
    $(".main-menu #tutor.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      oThisPage.fnGetTutorList();
    });
    $("#tutor.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-tutor-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
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
    $("#add-tutor-popup .upload input").uploadify({
      'uploader' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : oThisPage.sRootWebUrl + '/js/uploadify/cancel.png',
      'folder' : oThisPage.sRootWebUrl + oThisPage.sTutorUploadFolder,
      'fileExt' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileDesc' : 'Image Files',
      'multi' : false,
      'auto' : true,
      'hideButton': true,
      'wmode': 'transparent',
      'onAllComplete' : function(event, ID, fileObj, response, data) {
       var tmp = '';
      },
      'onComplete' : function(event, ID, fileObj, response, data) {
       var tmp = '';
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
                    '<div class="label">' +
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
    
    
    //Pupil
    $(".main-menu #pupil.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      oThisPage.fnGetPupilList();
    });
    $("#pupil.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-pupil-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
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
    $("#add-pupil-popup .upload input").uploadify({
      'uploader' : oThisPage.sRootWebUrl + '/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : oThisPage.sRootWebUrl + '/js/uploadify/cancel.png',
      'folder' : oThisPage.sRootWebUrl + oThisPage.sPupilUploadFolder,
      'fileExt' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileDesc' : 'Image Files',
      'multi' : false,
      'auto' : true,
      'hideButton': true,
      'wmode': 'transparent',
      'onAllComplete' : function(event, ID, fileObj, response, data) {
       var tmp = '';
      },
      'onComplete' : function(event, ID, fileObj, response, data) {
       var tmp = '';
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
                    '<div class="label">' +
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
      var oPopup = $("#add-pupil-popup");
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
    
    //Subject
    $(".main-menu #subject.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
      
      var aPost = {
        'sSearch': $(".sub-menu-container .search-bar input").val()
      }
      
      $("#subject.view .body table.subject-list tbody").html("");
      oThisPage.fnGetSubjectList(aPost, function(aData, textStatus, jqXHR) {
        $.each(aData, function() {
          oThisPage.fnRenderSubjectRow(this);
        });
      });
    });
    $("#subject.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-subject-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
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
    $("#add-subject-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $("#add-subject-popup");
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
    $("#add-subject-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body");
      var aData = {
        'sName' : oContainer.find("#name input").val()
      }
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "create/subject",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-subject-popup").addClass('state-hide');
        }
      });
    });
    
    //Lesson Plan
    $(".main-menu #lesson-plan.menu-item").click(function() {
      var oFilterList = $(".sub-menu-container .filter-list");
      oFilterList.removeClass('state-hide');
      oFilterList.find("#lesson-plan").addClass('state-hide');
      var sSearch = $(".sub-menu-container .search-bar input").val();
      $("#lesson-plan.view .body table.lesson-plan-list tbody").html("");
      var aPost = {
        'sSearch': sSearch
      };
      oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
        $.each(aData, function() {
          oThisPage.fnRenderLessonPlanRow(this);
        });
      });
    });
    $("#lesson-plan.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-lesson-plan-popup");
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
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
      
      var aPost = {
        
      };
      oThisPage.fnGetSubjectList(aPost, function(aData, textStatus, jqXHR) {
        var oSelect = $("#add-lesson-plan-popup #main.popup-view .body #subject select");
        oSelect.html('<option value="">Select</option>');
        $.each(aData, function() {
          var sHtml = 
              '<option value="' + this.iId + '">' + 
                  this.sName + 
              '</option>';
          oSelect.append(sHtml);
        });
      });
    });
    $("#add-lesson-plan-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $("#add-lesson-plan-popup");
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
    $("#add-lesson-plan-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body");
      var aData = {
        'iSubjectId' : oContainer.find("#subject select").val(),
        'sName' : oContainer.find("#name input").val()
      }
      $.ajax({
        'data': aData,
        'dataType': 'json',
        'type': 'POST',
        'url': "create/lessonPlan",
        'success': function(aData, textStatus, jqXHR) {
          $(".modal").removeClass('state-show');
          $("#add-lesson-plan-popup").addClass('state-hide');
        }
      });
    });
    
    //Lesson
    $(".main-menu #lesson.menu-item").click(function() {
      var oFilterList = $(".sub-menu-container .filter-list");
      oFilterList.removeClass('state-hide');
      oFilterList.find("#lesson-plan").removeClass('state-hide');
      
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
            '<option value="' + this.iId + '">' +
              this.sName +
            '</option>';
          oSelect.append(sHtml);
        });
      });
    });
    $("#lesson.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-lesson-popup");
      var oSelectedImages = oPopup.find(".selected-images");
      oSelectedImages.find(".image").remove();
      oSelectedImages.find("")
      oPopup.removeClass("state-hide");
      oPopup.find("#create-button").removeClass('state-hide');
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
      
      $("#subject.view .body .subject-list").html("");
      var aPost = {};
      oThisPage.fnGetSubjectList(aPost, function(aData, textStatus, jqXHR) {
        var oSelect = $("#add-lesson-popup .body .input #subject select");
        oSelect.html('<option value="">Select</option>');
        $.each(aData, function() {
          var sHtml = 
              '<option value="' + this.iId + '">' + 
                 this.sName +
              '</option>';
          var oHtml = $(sHtml);
          
          oSelect.append(oHtml);
        });
      });
      
      var sSearch = $(".sub-menu-container .search-bar input").val();
      oThisPage.fnGetImageList(sSearch, 'uploads', function(aData, textStatus, jqXHR) {
        var oImageList = $("#add-lesson-popup .body .image-list");
        $.each(aData, function() {
          var sHtml = 
          '<span class="image">' +
            '<input type="hidden" value="' + this.iId + '" />' + 
            '<img src="' + this.sUrl + '" />' +
            '<div class="label">' + this.sLabel + '</div>' +
          '</span>';
          var oHtml = $(sHtml);
          oHtml.data("aData", this);
          oHtml.dblclick(function() {
            var oSelectedImages = $("#add-lesson-popup .body .selected-images");
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
          'handle': '.image',
          'connectWith': ".image-drag-drop",
          'revert': false
        });
    
        oImageList.disableSelection();
        
      });
    });
    $("#add-lesson-popup .body .selected-images").sortable({
      //'appendTo': "#add-lesson-popup .body .image-list",
      'connectWith': ".image-drag-drop",
      //'placeholder': "image ui-state-highlight",
      //'containment': 'parent',
      //'forcePlaceHolderSize': true,
      'helper': 'clone',
      //'forceHelperSize': true,
      //'grid': [64, 64],
      //'cursorAt': { 'left': 32 },
      //'delay': 250
      //'refreshPositions': true,
      //'items': '.image',
      'tolerance': 'pointer',
      'dropOnEmpty': true,
      'revert': true,
      'receive': function(event, ui) {
        var tmp = '';
        $(this).find(".drop-message").addClass('state-hide');
      },
      'stop': function(event, ui) {
        var tmp = '';
      }
      
    });
    /*
    .droppable({
      'drop': function( event, ui ) {
        $(this).find(".drop-message").addClass('state-hide');
        
        var draggable = ui.draggable;
        // append only if dropped from image-list 
        if (draggable.parent().hasClass("image-list")) {
          var oImage = draggable.clone();
          oImage.data("aData", draggable.data("aData"));
          oThisPage.fnLessonAppendImage(oImage);
        }
      }
    });
    */
    $("#add-lesson-popup .body .selected-images").disableSelection();
    $("#add-lesson-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $("#add-lesson-popup");
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
    $("#add-lesson-popup #main.popup-view .foot #create-button").click(function() {
      var oView = $(this).parents(".popup-view");
      var oContainer = oView.find(".body .right");
      
      var aQuestionList = {};
      $.each(oView.find(".selected-images .image"), function(iIndex) {
        aQuestionList[iIndex] = {
          'iIndex': iIndex,
          'iImageId': $(this).find("input").val(),
          'sText': $.trim($(this).find(".label").html())
        };
      });
      
      
      var aData = {
        'sName': oView.find(".body .input .value input").val(),
        'iSubjectId': oView.find(".body .input #subject select").val(),
        'iLessonPlanId': oView.find(".body .input #lesson-plan select").val(),
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
    });
    $("#add-lesson-popup #main.popup-view #subject select").change(function() {
      
      var aPost = {
        'iSubjectId': $(this).val()
      };
      
      oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
        var oSelect = $("#add-lesson-popup .body .input #lesson-plan select");
        oSelect.html('<option value="">Select</option>');
        $.each(aData, function() {
          var sHtml = 
              '<option value="' + this.iId + '">' + 
                 this.sName +
              '</option>';
          var oHtml = $(sHtml);
          
          oSelect.append(oHtml);
        });
      });
    });
    
    //Setting 
    $(".main-menu #setting.menu-item").click(function() {
      $(".sub-menu-container .filter-list").addClass('state-hide');
    });
    $("#setting.view .body .action-list #save-button").click(function() {
      oThisPage.fnUpdateAllSettings();
    });
    
    
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
        oThisPage.fnGetTutorList();
      }
      else if (sId == "lesson") {
        aPost['iSubjectId'] = oFilterList.find("#subject select").val();
        aPost['iLessonPlanId'] = oFilterList.find("#lesson-plan select").val();
        oThisPage.fnGetLessonList(aPost, function(aData, textStatus, jqXHR) {
          $("#lesson.view .body table.lesson-list tbody").html("");
          $.each(aData, function() {
            oThisPage.fnRenderLessonRow(this);
          });
        });
      }
      else if (sId == "lesson-plan") {
        aPost['iSubjectId'] = oFilterList.find("#subject select").val();
        oThisPage.fnGetLessonPlanList(aPost, function(aData, textStatus, jqXHR) {
          $("#lesson-plan.view .body table.lesson-plan-list tbody").html("");
          $.each(aData, function() {
            oThisPage.fnRenderLessonPlanRow(this);
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
    setTimeout('$(".main-menu #setting.menu-item").click()', 750);
  },
  'fnUpdateImage': function(aData) {
    
  },
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
  'fnRenderSubjectRow': function(aSubject) {
    var sHtml = 
        '<tr>' + 
          '<td class="id">' + aSubject.iId + '</td>' +
          '<td class="subject">' +
            aSubject.sName + 
          '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    
    $("#subject.view .body table.subject-list tbody").append(oHtml);
  },
  'fnRenderLessonPlanRow': function(aLessonPlan) {
    var sHtml = 
        '<tr>' + 
          '<td class="id">' + aLessonPlan.iId + '</td>' +
          '<td class="subject">' +
            '<input type="hidden" value="' + aLessonPlan.iSubjectId + '" />' +
            aLessonPlan.sSubject + 
          '</td>' +
          '<td class="lesson-plan">' + 
            aLessonPlan.sName + 
          '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    
    $("#lesson-plan.view .body table.lesson-plan-list tbody").append(oHtml);
  },
  'fnRenderLessonRow': function(aLesson) {
    var sHtml = 
        '<tr>' + 
          '<td class="id">' + aLesson.iId + '</td>' +
          '<td class="subject">' +
            '<input type="hidden" value="' + aLesson.iSubjectId + '" />' +
            aLesson.sSubject + 
          '</td>' +
          '<td class="lesson-plan">' + 
            '<input type="hidden" value="' + aLesson.iLessonPlanId + '" />' +
            aLesson.sLessonPlan + 
          '</td>' +
          '<td class="lesson">' + aLesson.sName + '</td>' +
        '</tr>';
    var oHtml = $(sHtml);
    
    $("#lesson.view .body table.lesson-list tbody").append(oHtml);
  },
  'fnGetLessonList': function(sSearch, fnCallback) {
    var aData = {
      'sSearch': sSearch
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/lesson.json",
      'success': fnCallback
    });
  },
  'fnLessonAppendImage': function(oImage) {
    
    var sHtml = 
      '<div class="input">' +
        oImage.data("aData").sLabel +  
      '</div>';
    var oHtml = $(sHtml);
    //oImage.append(oHtml);
    $("#add-lesson-popup .body .selected-images").append(oImage);
  },
  'fnGetSubjectList': function(aPost, fnCallback) {
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/subject.json",
      'success': fnCallback
    });
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
  'fnGetLessonPlanList': function(aPost, fnCallback) {
    
    $.ajax({
      'data': aPost,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/lessonplan.json",
      'success': fnCallback
    });
  },
  'fnGetPupilList': function() {
    $("#pupil.view .body .pupil-list").html("");
    
    var aData = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/pupil.json",
      'success': function(aData, textStatus, jqXHR) {
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
      }
    });
  },
  'fnGetTutorList': function() {
    $("#tutor.view .body .tutor-list").html("");
    
    var aData = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/tutor.json",
      'success': function(aData, textStatus, jqXHR) {
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
            var oPopup = $("#add-tutor-popup");
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
          $("#tutor.view .body .tutor-list").append(oHtml);
        });
      }
    });
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
  }

};

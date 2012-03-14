$(document).ready(function() {
  oMain.fnInit();
  
  oThisPage.fnInit();

  $(window).load(function() {
  
  });
});

oThisPage = {
  'fnInit': function() {
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
      oThisPage.fnGetImageList('uploads', oThisPage.fnDisplayImageTabImages);
    });
    $("#image.sub-menu .menu-item .input input").uploadify({
      'uploader' : '/bundles/visualfeedback/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : '/bundles/visualfeedback/js/uploadify/cancel.png',
      'folder' : '/bundles/visualfeedback/images/uploads',
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
      'uploader' : '/bundles/visualfeedback/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : '/bundles/visualfeedback/js/uploadify/cancel.png',
      'folder' : '/bundles/visualfeedback/images/tutor_icons',
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
      'uploader' : '/bundles/visualfeedback/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      'cancelImg' : '/bundles/visualfeedback/js/uploadify/cancel.png',
      'folder' : '/bundles/visualfeedback/images/pupil_icons',
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
    
    //Class
    $(".main-menu #class.menu-item").click(function() {
      oThisPage.fnGetClassList();
    });
    
    
    
    
    //Lesson Plan
    
    
    
    
    //Lesson
    $(".main-menu #lesson.menu-item").click(function() {
      oThisPage.fnGetLessonList();
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
     
      oThisPage.fnGetImageList('uploads', function(aData, textStatus, jqXHR) {
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
          'iImageId': $(this).find("input").val(),
          'sText': $.trim($(this).find(".label").html())
        };
      });
      
      
      var aData = {
        'sName': oView.find(".body .input .value input").val(),
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
    
    
    $(".sub-menu-container .search-bar .search-button").click(function() {
      var oSelected = $(".main-menu .menu-item.state-selected");
      var sId = oSelected.attr("id");
      
      if (sId == "image") {
        oThisPage.fnGetImageList('uploads', oThisPage.fnDisplayImageTabImages);
      }
      else if (sId == "tutor") {
        oThisPage.fnGetTutorList();
      }
      
      
    });
    
    // default to image tab
    setTimeout('$(".main-menu #lesson.menu-item").click()', 750);
  },
  'fnUpdateImage': function(aData) {
    
  },
  'fnGetLessonList': function() {
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
  'fnGetClassList': function() {
    $("#class.view .body .class-list").html("");
    
    var aData = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/class.json",
      'success': function(aData, textStatus, jqXHR) {
        $.each(aData, function() {
          var sHtml = 
              '<div class="class">' + 
                '<input type="hidden" value="' + aData.iId + '" />' +
                '<span class="sLabel">' +
                  aData.sName + 
                '</span>' + 
              '</div>';
          var oHtml = $(sHtml);
          oHtml.data("aData", this);
          
          $("#class.view .body .class-list").append(oHtml);
        });
      }
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
  'fnGetImageList': function(sFolder, fnCallback) {
    
    var aData = {
      'sFolder': sFolder,
      'sSearch': $(".sub-menu-container .search-bar input").val()
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

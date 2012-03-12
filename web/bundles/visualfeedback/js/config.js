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
    }, 1000, function() {
      
    });
    
    var sHover = 
      ".main-menu .menu-item, " +
      ".sub-menu .menu-item " + 
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
    $(".main-menu #image.menu-item").click(function() {
      oThisPage.fnGetImageList();
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
    
    $("#add-teacher-popup .upload input").uploadify({
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
    $("#add-teacher-popup .upload #choose-button").click(function() {
      var oPopup = $(this).parents("#add-teacher-popup");
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
          var oBody = $("#add-teacher-popup #image-list.popup-view .body");
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
                    '<div class="icon">' +
                      '<img src="' + this.sUrl + '" />' +
                    '</div>' + 
                    '<div class="label">' +
                      this.sLabel +
                    '</div>' +
                  '</div>';
              var oHtml = $(sHtml);
              oHtml.click(function() {
                var oPopup = $(this).parents("#add-teacher-popup");
                oPopup.find(".popup-view").addClass('state-hide');
                var sUrl = $(this).find("img").attr('src');
                oPopup.find("#main.popup-view .body .left .picture img").attr('src', sUrl);
                oPopup.find("#main.popup-view").removeClass('state-hide');
              });
              oBody.append(oHtml);
            });
          }
          
        }
      });
    });
    $("#add-teacher-popup #main.popup-view .foot #cancel-button").click(function() {
      $(".modal").removeClass('state-show');
      var oPopup = $("#add-teacher-popup");
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
    $("#add-teacher-popup #image-list.popup-view .foot #return-button").click(function() {
      var oPopup = $(this).parents("#add-teacher-popup");
      oPopup.find("#image-list.popup-view").addClass("state-hide");
      oPopup.find("#main.popup-view").removeClass("state-hide");
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
   
    $("#tutor.sub-menu #add.menu-item").click(function() {
      var oPopup = $("#add-teacher-popup");
      oPopup.removeClass("state-hide");
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
   
    $(".sub-menu-container .search-bar .search-button").click(function() {
      var oSelected = $(".main-menu .menu-item.state-selected");
      var sId = oSelected.attr("id");
      
      if (sId == "image") {
        oThisPage.fnGetImageList();
      }
      else if (sId == "tutor") {
        oThisPage.fnGetTutorList();
      }
      
      
    });
    
    // default to image tab
    $(".main-menu #tutor.menu-item").click();
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
      'url': "list/image.json",
      'success': function(aData, textStatus, jqXHR) {
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
          $("#image.view .body .image-list").append(oHtml);
        });
      }
    });
  },
  'fnGetImageList': function() {
    $("#image.view .body .image-list").html("");
    
    var aData = {
      'sSearch': $(".sub-menu-container .search-bar input").val()
    };
    
    $.ajax({
      'data': aData,
      'dataType': 'json',
      'type': 'POST',
      'url': "list/image.json",
      'success': function(aData, textStatus, jqXHR) {
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
          $("#image.view .body .image-list").append(oHtml);
        });
      }
    });
  }
};

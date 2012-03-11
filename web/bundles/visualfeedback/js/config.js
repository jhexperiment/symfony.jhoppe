$(document).ready(function() {
  oThisPage.fnInit();

  $(window).load(function() {
  
  });
});

oThisPage = {
  'fnInit': function() {
    var sHover = 
      ".main-menu .menu-item, " +
      ".sub-menu .menu-item";
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
      
      $(".main-menu .menu-item").removeClass('state-selected');
      $(this).addClass('state-selected');
      
      $(".view").addClass('state-hide');
      $("#" + sId + ".view").removeClass('state-hide');
    });
    
    
    
    $("#image.sub-menu .menu-item .input input").uploadify({
      'uploader' : '/bundles/visualfeedback/js/uploadify/uploadify.swf',
      'script' : 'upload/image',
      //'script' : '/bundles/visualfeedback/js/uploadify/uploadify.php',
      'cancelImage' : '/bundles/visualfeedback/js/uploadify/cancel.png',
      'folder' : '/bundles/visualfeedback/images/uploads',
      'fileExt' : '*.jpg;*.gif;*.png;*.jpeg',
      'fileDesc' : 'Image Files',
      'multi' : true,
      'simUploadLimit': 10,
      'auto' : true,
      //'sizeLimit': 4194304,
      //'onInit': function() {
      //  var tmp = '';
      //},
      //'onProgress': function(event, ID, fileObj, data) {
      //  var tmp = '';
      //},
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
    
    $("#image.sub-menu .menu-item .text").click(function() {
      var oInput = $(this).next(".input");
      oInput.data("original-width", oInput.width());
      oInput.width(0);
      oInput.removeClass("state-hide");
      
      oInput.animate({
        'width': oInput.data("original-width")
      }, 250, function() {
        oInput.css("width", "auto");
      });
    });
    
    
    // default to image tab
    $(".main-menu #image.menu-item").click();
  }
};

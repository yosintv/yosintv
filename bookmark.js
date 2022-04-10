
$(document).ready(function() {
  var url1 = window.location.href;
  var title1 = document.title;
  var $ul = $('#favorite-links');
  var $title = $('#title');
  var $url = $('#url');
  $("#title").val(title1);
    $("#url").val(url1);
  
  //get items from local storage
  if(localStorage.getItem('vk-links')){
   $ul.html(localStorage.getItem('vk-links'));
  }
  
  // add nwe item
var i;
  $('#add').click(function () {
	var number = 1 + Math.floor(Math.random() * 999999999);
  $i=number;
  var url1 = window.location.href;
  var title1 = document.title;
    //add new item
    $('#favorite-links').append('<li id="bookmark_'+$i+'"><a href="'+$url.val()+'">'+$title.val()+'</a><button class="removebtn">x</button></li>');

    //save changes to localstorage
    localStorage.setItem('vk-links', $ul.html());

    //reset form
      var url1 = window.location.href;
  var title1 = document.title;
    $("#title").val(title1);
    $("#url").val(url1);
    $("#add-link-form").slideToggle("100");
    
  });
  
  //remove item
  $("#favorite-links").on('click','.removebtn',function() {
    $(this).parent().remove();
    //save changes to localstorage
    localStorage.setItem('vk-links', $ul.html());
  });

  //form toggle
  $("#new-link-button").click(function() {
    $("#add-link-form").slideToggle("100"); 
  });
  
});



$(document).ready(function(){
  $("#show").hover(function(){
    $("#fav").show();
  });
  $("#close").click(function(){
    $("#fav").hide();
  });
  $("#container").mouseleave(function(){
    $("#fav").hide();
  });
  $("#new").click(function(){
    $("#fav").show();
  });
  $("#hide").click(function(){
    $("#message").hide();
  });
  $("#new-link-button").click(function(){
    $("#new-link-button").hide();
  });
  $("#add").click(function(){
    $("#new-link-button").show();
  });
  $("#cancel").click(function(){
    $("#new-link-button").show();
  });  
 $("#cancel").click(function(){
    $("#add-link-form").hide();
  }); 



  $("#hide-ad").click(function(){
	$("#adv").hide();
	$("#hide-ad").hide();
	});
});



////////////////////////////////// DRAG

  
$(function() {
  var $sortable = $('#favorite-links');
  var pos = JSON.parse(localStorage.getItem('positions'));
  if (pos) {
    $.each(pos, function(i, position) {
      var $target = $sortable.find('#' + position);
      $target.appendTo($sortable); // or prependTo
    });
  }

  $sortable.sortable({
    update: saveNewOrder
  });

  function saveNewOrder() {
    var pos = JSON.stringify($sortable.sortable("toArray"));
    localStorage.setItem('positions', pos);
  }
});




///////////////////// END DRAG


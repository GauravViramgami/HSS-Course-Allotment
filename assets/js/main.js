/**
* Template Name: DevFolio - v2.3.0
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  $('.counter').counterUp({
    delay: 15,
    time: 2000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      var scrollto_initial = $(initial_nav).offset().top - mainNav_height;
      $('html, body').animate({
        scrollTop: scrollto_initial
      }, 1000, "easeInOutExpo");
    }
  }

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: false,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  var border_color = $('#name').css('border-color');
  var border_width = $('#name').css('border-width');
  var w = (new Date).getFullYear();
  var programs = ["-Select-","B.Tech","M.Tech","MSc","MA","PhD"];
  var courses = ["HS 104 - Foundational Sanskrit", "HS 108 - Japan Studies", "HS 111 - Urdu Script & Poetry", "HS 112 - Urdu Poetry Interpretation", "HS 211 - Exploring India’s Scientific and Technological Heritage","HS 223 - Sanskrit Literature","HS 305 - Perspectives in Psychology", "HS 391 -	Special Topics in HSS: Music Traditions of India", "HS 313 - When You Cannot Experiment: Social Science Methods", "HS 411 - Economic Concepts and Issues in Project Analysis", "HS 425 - Introduction to Archaeology", "HS 491-I - Special Topics in HSS: Indian philosophy through the ages","HS 491-II - Special Topics in HSS: The ‘engineering’ of theatre-making", "HS 491-III - Special Topics in HSS: Storytelling for the Digital Era", "HS 507 - Humanism, Anti-Humanism, and Posthumanism", "HS 510 - Perspectives on Indian Civilization", "HS 512 - Political Thought", "HS 515 - The Politics of the Environment", "HS 518 - Philosophy, Cognition and Psychoanalysis", "HS 519 - Linguistic Anthropology", "HS 610 - A Critical Journey Through Select Thoughts and Theories", "HS 645 - History of India, 1930-1964", "HS 691-I - Special Topics in HSS: Themes in Postcolonialism", "HS 691-II - Special topics in HSS: Applied statistics: Multilevel modeling", "IN 304 - Ancient Indian Technology", "MS 304 - Organizational Behaviour & Human Resource Management (OB & HRM)", "MS 403 - Engineering Entrepreneurship", "MS 491 - Special topics in Management: Marketing Analytics", "HS 691-III - Special Topics in HSS: Abnormal Psychology", "HS 327 (H) - Anthropology, Citizenship and Human Rights (Half Sem course, 2nd Half)", "MS 492 - Special Topics in Management: Finance Management (2 credit course that will run for entire semester, ~2 hours each week)", "MS 491-I - Special Topics in Management: Product Management"];
  var num_courses = courses.length;
  var temp = '<div id="preference-1" class="post-box remove-padding">\n<div class="row widget-sidebar form-group">\n<p>\nPreference #1 <sup class="required">*</sup>\n <br>\n </p>\n <select class="form-control" id="pref1" name="pref1" placeholder="Your Answer">\n <option value="-Select-">-Select-</option>\n   </select>\n  <p class="error-msg" id="pref1-error"></p>\n  </div>\n</div>'

  $.fn.add_options = function(e){
    $.each(courses,function(index,value){
      $(e).append("<option value='"+ value+"'>"+value+"</option>");
    });
  }

  /*--/ Name /--*/
  $('#name').change(function(){
    if (!$('#name').val()){
      $(this).css("border-color","#d93025");
      $(this).css("border-width","3px");
      $('#name-error').css("display","block");
      $('#name-error').text("This is a required question");
    }
    else{
      $(this).css("border-color",border_color);
      $(this).css("border-width",border_width);
      $('#name-error').css("display","none");
      $('#name-error').text("");
    }
  });

  /*--/ Roll Number /--*/

  $('#roll').change(function(){
    if ($.isNumeric($(this).val())){
      var v = $(this).val();
      if(v.length == 8){
        $(this).css("border-color",border_color);
        $(this).css("border-width",border_width);
        $('#roll-error').css("display","none");
        $('#roll-error').text("");
      }
      else{
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#roll-error').css("display","block");
        $('#roll-error').text("Invalid Input");

      }
    }
    else{
      if(!$('#roll').val()){
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#roll-error').css("display","block");
        $('#roll-error').text("This is a required question");
      }
      else{
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#roll-error').css("display","block");
        $('#roll-error').text("Invalid Input");
      }
    }
  });

  /*--/ Programme /--*/
  $('#program').change(function(){
    if ($('#program').val()=="-Select-"){
      $(this).css("border-color","#d93025");
      $(this).css("border-width","3px");
      $('#program-error').css("display","block");
      $('#program-error').text("This is a required question");
    }
    else{
      $(this).css("border-color",border_color);
      $(this).css("border-width",border_width);
      $('#program-error').css("display","none");
      $('#program-error').text("");
    }
  });

  /*--/ Year of Joining /--*/

  $('#year').change(function(){
    if ($.isNumeric($(this).val())){
      var v = parseInt($(this).val(),10);
      if(v>=w-15 && v <= w){
        $(this).css("border-color",border_color);
        $(this).css("border-width",border_width);
        $('#year-error').css("display","none");
        $('#year-error').text("");
      }
      else{
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#year-error').css("display","block");
        $('#year-error').text("Invalid Input");

      }
    }
    else{
      if(!$('#year').val()){
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#year-error').css("display","block");
        $('#year-error').text("This is a required question");
      }
      else{
        $(this).css("border-color","#d93025");
        $(this).css("border-width","3px");
        $('#year-error').css("display","block");
        $('#year-error').text("Invalid Input");
      }
    }
  });


  /*--/ Minors? /--*/
  $('#minors-none').change(function(){
    if($(this).is(":checked")){
      $('#minors-hss').prop("disabled",true);
      $('#minors-management').prop("disabled",true);
    }
    else{
      $('#minors-hss').prop("disabled",false);
      $('#minors-management').prop("disabled",false);
    }
  });

  $('#minors-hss').change(function(){
    if($(this).is(":checked")){
      $('#minors-none').prop("disabled",true);
    }
    else{
      if ($('#minors-management').is(":checked")){
        $('#minors-none').prop("disabled",true);
      }
      else{
        $('#minors-none').prop("disabled",false);
      }
      
    }
  });

  $('#minors-management').change(function(){
    if($(this).is(":checked")){
      $('#minors-none').prop("disabled",true);
    }
    else{
      if ($('#minors-hss').is(":checked")){
        $('#minors-none').prop("disabled",true);
      }
      else{
        $('#minors-none').prop("disabled",false);
      }
    }
  });

  /*--/ Course Preferences /--*/

  $('#num-pref').attr("max",num_courses);
  $.fn.add_options('#pref1');
  
  $('#num-pref').change(function(){
    if($('#num-pref').val()>=1 && $('#num-pref').val() <= num_courses){
      $('#num-pref-error').css("display","none");
      $('#num-pref-error').text("");
      $('#num-pref').css("border-color",border_color);
      $('#num-pref').css("border-width",border_width);
      var prefs = $("#preferences .post-box");
      if (prefs.length <= $(this).val()){
        var v = prefs.length+1;
        while(v<=$(this).val()){
          $("#preferences").append(temp);
          $("#preferences .post-box:last").attr("id","preference-"+v);
          $("#preference-"+v+" p:first").text("Preference #"+v);
          $("#preference-"+v+" .form-control").attr("id","pref"+v);
          $("#preference-"+v+" .form-control").attr("name","pref"+v);
          $("#preference-"+v+" .error-msg").attr("id","pref"+v+"-error");
          $.fn.add_options('#pref'+v);
          v=v+1;
        };
      }
      else{
        var v = parseInt($(this).val(),10);
        var w = prefs.length;
        console.log(v,w);
        while(w>v){
          $("#preference-"+w).remove();
          w-=1;
        };
      }
    }
    else{
      $('#num-pref-error').css("display","block");
      $('#num-pref-error').text("Number of course preferences must be between 1 and "+num_courses);
      $('#num-pref').css("border-color","#d93025");
      $('#num-pref').css("border-width","3px");
    }
  });

  /*--/ Form Validation /--*/
  $('form').submit(function(e){
    var failed = false;

    /* Validating Name */
    if(!$('#name').val()){
      failed = true;
      $('#name-error').css("display","block");
      $('#name-error').text("This is a required question");
      $('#name').css("border-color","#d93025");
      $('#name').css("border-width","3px");
    }
    else{
      $('#name').change();
    }

    /* Validating Roll Number */
    if($('#roll').val().length!=8 || !$.isNumeric($('#roll').val())){
      failed = true;
      $('#roll-error').css("display","block");
      $('#roll').css("border-color","#d93025");
      $('#roll').css("border-width","3px");
      if (!$('#roll').val()){
        $('#roll-error').text("This is a required question");
      }
      else{
        $('#roll-error').text("Invalid Input");
      }
    }
    else{
      $('#roll').change();
    }

    /* Validating Programme */
    if($('#program').val()=="-Select-"){
      failed = true;
      $('#program-error').css("display","block");
      $('#program-error').text("This is a required question");
      $('#program').css("border-color","#d93025");
      $('#program').css("border-width","3px");
    }
    else if ($.inArray($('#program').val(),programs)==-1){
      failed = true;
      $('#program-error').css("display","block");
      $('#program-error').text("Invaid Input");
      $('#program').css("border-color","#d93025");
      $('#program').css("border-width","3px"); 
    }
    else{
      $('#program-error').css("display","none");
      $('#program-error').text("");
      $('#program').css("border-color",border_color);
      $('#program').css("border-width",border_width);
    }
    $.each(programs,function(index,value){
      $('#program-'+index).text(value);
      $('#program-'+index).val(value);
    });

    /* Validating Year of Joining */
    if(!$.isNumeric($('#year').val()) || w-15 > $('#year').val() || $('#year').val() > w){
      failed = true;
      $('#year-error').css("display","block");
      $('#year').css("border-color","#d93025");
      $('#year').css("border-width","3px");
      if (!$('#year').val()){
        $('#year-error').text("This is a required question");
      }
      else{
        $('#year-error').text("Invalid Input");
      }
    }

    /* Validating Number of Preferences */
    if(!$.isNumeric($('#num-pref').val()) || $('#num-pref').val()>num_courses){
      failed = true;
      $('#num-pref-error').css("display","block");
      $('#num-pref').css("border-color","#d93025");
      $('#num-pref').css("border-width","3px");
      if (!$('#num-pref').val()){
        $('#num-pref-error').text("This is a required question");
      }
      else{
        $('#num-pref-error').text("Invalid Input");
      }
    }

    if(failed){
      e.preventDefault();
      return false;
    }
    return true;
    });

})(jQuery);
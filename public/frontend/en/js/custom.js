(function($) {
  'use strict';

    // Mean Menu
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: "991"
    });

    //Navbar JS
    $(window).on('scroll',function() {
        if ($(this).scrollTop()>150){  
            $('.navbar-area').addClass("is-sticky");
        }
        else{
            $('.navbar-area').removeClass("is-sticky");
        }
    });

    //Video Popup
    $('.popup-youtube').magnificPopup({
      disableOn:320,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });

    //Banner Slider
    $('.banner-slider').owlCarousel({
      loop:true,
      margin:0,
      dots:false,
      nav:true,
      navText:[
        "<i class='icofont-rounded-double-left'></i>",
        "<i class='icofont-rounded-double-right'></i>"
      ],
      autoplay:false,
      items:1,
      mouseDrag:false,
      autoplayHoverPause:true,
      autoplayTimeout:4000,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn'
    });

    //Testimonial Slider
    $('.feedback-slider').owlCarousel({
      loop:true,
      margin:10,
      dots:false,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      nav:true,
      navText:[
        "<i class='icofont-rounded-double-left'></i>",
        "<i class='icofont-rounded-double-right'></i>"
      ],
      autoplay:true,
      smartSpeed:1500,
      responsive:{
        0:{
            items:1
        },

        992:{
            items:2
        }
    }
    });

    //Testimonial Slider Two
    $('.feedback-slider-area').owlCarousel({
      loop:true,
      margin:10,
      dots:false,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      nav:true,
      navText:[
        "<i class='icofont-rounded-double-left'></i>",
        "<i class='icofont-rounded-double-right'></i>"
      ],
      autoplay:true,
      smartSpeed:1500,
      items:1
    });

    //Company Slider
    $('.company-slider').owlCarousel({
      loop:true,
      margin:10,
      dots:false,
      nav:false,
      autoplay:true,
      autoplayTimeout:2000,
      smartSpeed:2000,
      autoplayHoverPause:true,
      responsive:{
        0:{
            items:1
        },
        600: {
          items:2
        },

        768:{
            items:3
        },

        1000: {
          items:5
        }
    }
    });
    
    //Accordian JS
    $(".accordion-title").click(function(e){
        var accordionitem = $(this).attr("data-tab");
        $("#"+accordionitem).slideToggle().parent().siblings().find(".accordion-content").slideUp();

        $(this).toggleClass("active-title");
        $("#"+accordionitem).parent().siblings().find(".accordion-title").removeClass("active-title");
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
          $('.top-btn').fadeIn();
        }
        else {
          $('.top-btn').fadeOut();
        }
    });

    $('.top-btn').on('click',function(){
      $("html, body").animate({ scrollTop: 0 }, 1500);
      return false;
    });

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
      if (event.isDefaultPrevented()) {
      // handle the invalid form...
          formErrorSub();
          submitMSGSub(false, "Please enter your email correctly.");
      } else {
          // everything looks good!
          event.preventDefault();
      }
    });
    function callbackFunction (resp) {
      if (resp.result === "success") {
          formSuccessSub();
      }
      else {
          formErrorSub();
      }
    }
    function formSuccessSub(){
      $(".newsletter-form")[0].reset();
      submitMSGSub(true, "Thank you for subscribing!");
      setTimeout(function() {
          $("#validator-newsletter").addClass('hide');
      }, 4000)
    }
    function formErrorSub(){
      $(".newsletter-form").addClass("animated shake");
      setTimeout(function() {
          $(".newsletter-form").removeClass("animated shake");
      }, 1000)
    }
    function submitMSGSub(valid, msg){
      if(valid){
          var msgClasses = "validation-success";
      } else {
          var msgClasses = "validation-danger";
      }
      $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
      url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
      callback: callbackFunction
    });

    //WOW JS
    new WOW().init();

    //Back To Top
    $(window).on('load',function(){
      $('.top-btn').fadeOut();
    });

    //Pre Loader
    $(window).on('load',function(){
      $(".loader-content").fadeOut(1000);
    }) 
    
})(jQuery);
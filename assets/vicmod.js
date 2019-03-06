$(document).ready(function(){


  // setup Scroll Magic
  var controller = new ScrollMagic({
    globalSceneOptions: {
      triggerHook: "onLeave"
    }
  }); // controller

  var tween1_bannerContent = TweenMax.staggerFromTo(
      '.vic_banner_container .vic_banner article',
      2,
      //{opacity:0, scale:0},
      //{delay:1, opacity:1, scale:1, ease:Back.easeOut, force3D:true}

      {opacity:0, x:300, ease:Back.easeIn},
      {delay:1, x:0, opacity:1, scale:1, ease:Back.easeOut}

    ); // tween1_bannerContent

  var tween2_videoBtn = TweenMax.staggerFromTo(
      'a#video-btn-1',
      3,
      {opacity:0, scale:0},
      {delay:2, opacity:1, scale:1, ease:Back.easeOut}
    ); // tween2_videoBtn


  // fade in video logo     /* TimelineMax */
  //var target = $("#shopify-section-1525131868980 a.btn.hero__btn");
  var target3 = $(".vic_centering_wrapper");
  // constructor
  var tween3_timeline_fadeinlogo = new TimelineMax({delay:1, repeat:0});

  /* moving down, fade in */
  tween3_timeline_fadeinlogo.set(target3, {autoAlpha:0, bottom:200});
  tween3_timeline_fadeinlogo.to(target3, 3, {autoAlpha:1, top: 200 });


  /* Fade In*/
  // TL.set(target, {autoAlpha:0});
  // TL.to(target, 5, {autoAlpha:1, repeat:1, yoyo:true, ease: Linear.easeNone}, 0);
/*
  var tween4_gallery_box = TweenMax.staggerFromTo(
    '.custom-css-vic-gallery-1 .vicmod-gallery-content-box', 4,
    {opacity:0, scale:0.95, bottom:0},
    {delay:0.5, opacity:1, scale:1, top:0, ease:Back.easeOut}
  ); // tween4_gallery_box
*/

  var tween4a_img_left = TweenMax.staggerFromTo(
    '.custom-css-vic-gallery-1 .image-bar__item.img_left', 2,
    {opacity:0, scale:1, right:100},
    {delay:0, opacity:1, scale:1, left:0, ease:Back.easeOut}
  ); //tween4a_img_left


  var target5 = $(".custom-css-vic-gallery-2 .vicmod-gallery-content-box");
  var tween5_timeline_fadein = new TimelineMax({delay:1, repeat:1});
  tween5_timeline_fadein.set(target5, {autoAlpha:0.5, bottom:20});
  tween5_timeline_fadein.to(target5, 3, {autoApha:1, top:20});


  // tween1_bannerContent
  var scene1 = new ScrollScene({
    triggerElement:'.vic_banner_container',
    offset: -130
  }).setTween(tween1_bannerContent).addTo(controller);

  // tween2_videoBtn
  var scene2 = new ScrollScene({
    triggerElement:'#shopify-section-1525365881507'
  }).setTween(tween2_videoBtn).addTo(controller);

  // tween3_timeline_fadeinlogo
  var scene3 = new ScrollScene({
    triggerElement:'#shopify-section-1525131868980'    // use "sigle-btn section" as trigger
  }).setTween(tween3_timeline_fadeinlogo).addTo(controller);

  // tween4_gallery_box
  var scene4 = new ScrollScene({
    triggerElement:'.vicmod-gallery.custom-css-vic-gallery-1',
    offset: -200
    //duration: 500
  }).setTween(tween4_gallery_box).addTo(controller);

  /* tween4a_img_left disabled
  var scene4a = new ScrollScene({
    triggerElement:'',
    offset: -200
    //duration: 500
  }).setTween(tween4a_img_left).addTo(controller);
  */

  //tween5_timeline_fadein  gallery content box fadein frm behind
  var scene5= new ScrollScene({
    triggerElement:'.vicmod-gallery.custom-css-vic-gallery-2',
    offset:-100
  }).setTween(tween5_timeline_fadein).addTo(controller);




  /* sticky nav*/
  var pin = new ScrollScene({
    triggerElement:'#AccessibleNav',
 	}).setPin('#AccessibleNav').addTo(controller);
  $("#AccessibleNav").css("z-index","100");

  /*header.site-header.border-bottom.logo--left
  $("header").css("z-index","100");

  var pin = new ScrollScene({
    triggerElement:'header.site-header.border-bottom.logo--left',
  }).setPin('header.site-header.border-bottom.logo--left')
  .addTo(controller);
  */

  /* parallax dimmer */
  var moving__background = $(".vicmod-img-txt-overlay-3-box-on-right");
  var this_top = moving__background.offset().top;
  var this_height = moving__background.height();

  $(window).scroll(function() {
    var windowpos = $(window).scrollTop();
    var diff = windowpos - this_top;
    var opac_val = 1-(diff/this_height);
    //moving__background.css('margin-top', diff/3); // Parallax scrolling
    moving__background.css('opacity', opac_val); // Fading out
  });
  /* END: parallax dimmer */


});

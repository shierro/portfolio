/* eslint-disable no-console */
/* global $, AOS, ScrollProgress */

$(document).ready(function() {
  var vh = $('#welcome')[0].clientHeight;
  var lastScrollTop = -1;
  var scrolling = false;
  // var currentSection = 0;

  setTimeout(function() {
    $('.startup-overlay').fadeOut();
  }, 2000);

  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease-in', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });

  $.scrollify({
    section : '.section',
    // interstitialSection: '#career',
    // standardScrollElements: '#career',
    // easing: 'easeOutExpo',
    scrollSpeed: 1100,
    // scrollbars: true,
    // scrollSpeed: 999,
    // offset : -14,
    // overflowScroll: true,
    // setHeights: true,
    // updateHash: true,
    // touchScroll:true,
    before: function(e) {
      // currentSection = e;
      if (e === 1) {
        $.scrollify.disable();
      }
    },
  });

  var progressElement = document.querySelector('.progress-bar');
  
  new ScrollProgress(function(x, y) {
    progressElement.style.width = y * 100 + '%';
  });

  function shortDisableScrolling(ms) {
    scrolling = true;
    setTimeout(function() { scrolling = false; }, ms);
  }

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom - 30 < 0 || rect.top - viewHeight >= 0);
  }

  function onScrollClick() {
    shortDisableScrolling(1500);
    if ($.scrollify.isDisabled()) {
      $.scrollify.enable();
    }
    $.scrollify.next();
  }

  function onDocumentScroll() {
    var scrollTop = $(this).scrollTop();
    var goingDown = scrollTop > lastScrollTop;

    // if scroll hits the top of careers
    // var careerTop = $('#career').offset().top - 20;
    // console.log('currentSection', currentSection);
    // if(scrollTop <= careerTop && !scrolling && !goingDown && currentSection !== 0) {
    //   console.log('careerTop', careerTop);
    //   console.log('scrollTop', scrollTop);
    //   console.log('scrollTop <= careerTop', scrollTop <= careerTop);
    //   console.log('!scrolling', !scrolling);
    //   console.log('!goingDown', !goingDown);
    //   shortDisableScrolling(1500);
    //   $.scrollify.enable();
    //   // $.scrollify.previous();
    // }

    // if scroll(going down) hits bottom of careers section
    var careerSection = $('#career')[0];
    var careerBottom = scrollTop >= $('.career-bottom').offset().top - vh;
    if (
      goingDown &&
      careerBottom &&
      checkVisible(careerSection) &&
      !scrolling
    ) {
      shortDisableScrolling(1500);
      $.scrollify.enable();
      $.scrollify.update();
    }
    lastScrollTop = $(this).scrollTop();
  }

  // event listeners
  $(document).on('scroll', onDocumentScroll);
  $('.scroll-next').click(onScrollClick);
});
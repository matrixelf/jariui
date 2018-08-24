import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

//Create new validation pattern
//This must occur before fondation is called!
Foundation.Abide.defaults.patterns['version'] = /^\d+(\.\d+)*$/;
Foundation.Abide.defaults.patterns['artifact'] = /^[0-9A-Za-z_.-]+$/;
Foundation.Abide.defaults.patterns['alphaspace'] = /^[a-zA-Z ]+$/;
Foundation.Abide.defaults.patterns['alphaspecial'] = /^[a-zA-Z !-_?.,]+$/;

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// slick carousel
$(".content-carousel").slick({
  // normal options...
  speed: 5000,
	autoplay: true,
	autoplaySpeed: 0,
	cssEase: 'linear',
  slidesToShow: 5,
	slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
	centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }, {
      breakpoint: 300,
      settings: "unslick" // destroys slick
    }]
});

// tablesaw table plugin
$(function () {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});



var x = document.getElementById("Net").disabled = true;


$(document)
  // field element is invalid
  .on("invalid.zf.abide", function(ev,elem) {
    ev.preventDefault();
    console.log("Field id "+ev.target.id+" is invalid");
  })
  // field element is valid
  .on("valid.zf.abide", function(ev,elem) {
    ev.preventDefault();
    console.log("Field name "+elem.attr('name')+" is valid");
  })
  // form validation failed
  .on("forminvalid.zf.abide", function(ev,frm) {
    ev.preventDefault();
    console.log("Form id "+ev.target.id+" is invalid");
  })
  // form validation passed, form will submit if submit event not returned false
  .on("formvalid.zf.abide", function(ev,frm) {
    ev.preventDefault();
    console.log("Form id "+frm.attr('id')+" is valid");
    // ajax post form 
  })
  // to prevent form from submitting upon successful validation
  .on("submit", function(ev) {
    ev.preventDefault();
    //console.log("Submit for form id "+ev.target.id+" intercepted");
  });
// You can bind field or form event selectively
$("#general").on("invalid.zf.abide", function(ev,el) {
  ev.preventDefault();
});

$("#namespace").on("invalid.zf.abide", function(ev,el) {
  ev.preventDefault();
});

$("#configuration").on("invalid.zf.abide", function(ev,el) {
  ev.preventDefault();
});

$("#general").on("formvalid.zf.abide", function(ev,frm) {
  console.log("good general");
  ev.preventDefault();
  $("#general-information").hide("slow", function(){
    $("#progress-1 i").removeClass("current")
    $("#progress-1").removeClass("current")
    $("#progress-1 i").addClass("done")
    $("#progress-1").addClass("done")

    $("#progress-2 i").addClass("current")
    $("#progress-2").addClass("current")
    $("#configuration-information").hide("slow")
    $("#namespace-information").show("slow")
  });
});

$("#namespace").on("formvalid.zf.abide", function(ev,frm) {
  console.log("good namespace");

  ev.preventDefault();

  $("#namespace-information").hide("slow", function(){
    $("#progress-2 i").removeClass("current")
    $("#progress-2").removeClass("current")
    $("#progress-2 i").addClass("done")
    $("#progress-2").addClass("done")

    $("#progress-3 i").addClass("current")
    $("#progress-3").addClass("current")
    $("#configuration-information").show("slow")
  });
});

$("#configuration").on("formvalid.zf.abide", function(ev,frm) {
  console.log("good config");
  ev.preventDefault();
  
  $("#configuration-information").hide("slow", function(){
    $("#progress-3 i").removeClass("current")
    $("#progress-3").removeClass("current")
    $("#progress-3 i").addClass("done")
    $("#progress-3").addClass("done")

    $("#progress-4 i").addClass("current")
    $("#progress-4").addClass("current")
    $("#start-information").show("slow")
  });
});


$("#configuration-back").click( function(){
  console.log("configuration back");
  $("#configuration-information").hide("slow", function(){
    $("#namespace-information").show("slow");

    $("#progress-3 i").removeClass("current")
    $("#progress-3").removeClass("current")
 

    $("#progress-2 i").addClass("current")
    $("#progress-2").addClass("current")
  });
})

$("#namespace-back").click( function(){
  console.log(" namespace back");
  
  $("#namespace-information").hide("slow", function(){
    $("#general-information").show("slow");
    
    $("#progress-2 i").removeClass("current")
    $("#progress-2").removeClass("current")
 

    $("#progress-1 i").addClass("current")
    $("#progress-1").addClass("current")
  });
})

$("#start-back").click( function(){
  console.log("start back");
  
  $("#start-information").hide("slow", function(){
    $("#configuration-information").show("slow");
    
    $("#progress-2 i").removeClass("current")
    $("#progress-2").removeClass("current")
 

    $("#progress-1 i").addClass("current")
    $("#progress-1").addClass("current")
  });
})



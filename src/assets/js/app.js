import $ from 'jquery';
import whatInput from 'what-input';
var yaml = require('js-yaml');

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';


var formInformation = {};

window.libs = libs;

//Create new validation pattern
//This must occur before fondation is called!
Foundation.Abide.defaults.patterns['version'] = /^\d+(\.\d+)*$/;
Foundation.Abide.defaults.patterns['artifact'] = /^[0-9A-Za-z_.-]+$/;
Foundation.Abide.defaults.patterns['alphaspace'] = /^[a-zA-Z ]+$/;
Foundation.Abide.defaults.patterns['alphaspecial'] = /^[a-zA-Z !-_?.,]+$/;
Foundation.Abide.defaults.patterns['dashes_only'] = /^[0-9a-zA-Z-.]*$/;
Foundation.Abide.defaults.patterns['dashes_alpha'] = /^[a-zA-Z-]*$/;
Foundation.Abide.defaults.validators['swagger'] = myCustomValidator;

function myCustomValidator(
  $el,      /* jQuery element to validate */
  required, /* is the element required according to the `[required]` attribute */
  parent    /* parent of the jQuery element `$el` */
) {

  //return false;
  var file = $el[0].files[0];

  if (file) {
    var bool = true;
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        try{
          var doc = yaml.safeLoad( evt.target.result);
        } catch(e){
          $('#start').foundation('addErrorClasses', $('#fileupload'));

        }
         //var doc = yaml.safeLoad( evt.target.result);
         formInformation.swagger = doc;
         console.log("posterror");
         return bool;
    }
    reader.onerror = function (evt) {
      $('#start').foundation('addErrorClasses', $('#fileupload'));
    }

  }

  /*console.log(e.target.files[0]);
  console.log(this);
  var file = e.target.files[0];

  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        console.log( evt.target.result) ;

         var doc = yaml.safeLoad( evt.target.result);
         formInformation.swagger = doc;
         console.log(formInformation);
    }
    reader.onerror = function (evt) {
        //document.getElementById("fileContents").innerHTML = "error reading file";
    }

  }*/
};

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


//disable .Net technology
document.getElementById("Net").disabled = true;

$(document)
  // field element is invalid
  .on("invalid.zf.abide", function(ev,elem) {
    ev.preventDefault();
  })
  // field element is valid
  .on("valid.zf.abide", function(ev,elem) {
    ev.preventDefault();
  })
  // form validation failed
  .on("forminvalid.zf.abide", function(ev,frm) {
    ev.preventDefault();
  })
  // form validation passed, form will submit if submit event not returned false
  .on("formvalid.zf.abide", function(ev,frm) {
    ev.preventDefault();
  })

  .on("submit", function(ev) {
    ev.preventDefault();
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
    $("#progress-1 a").addClass("done")
    $("#progress-1").addClass("done")

$("#progress-1 i").removeClass("current")
    $("#progress-1").removeClass("current")

    $("#progress-2 a").addClass("current")
    $("#progress-2").addClass("current")

    $("#configuration-information").hide("slow")
    $("#namespace-information").show("slow")

    formInformation.type = $('input[name=type]:checked', '#general').val();
    formInformation.technology = $('input[name=technology]:checked', '#general').val(); 
    formInformation.subsystem = $( "#subsystemName" ).val()
    formInformation.email = $( "#email" ).val()

    console.log(formInformation);
  });
});

$("#namespace").on("formvalid.zf.abide", function(ev,frm) {
  ev.preventDefault();

  $("#namespace-information").hide("slow", function(){
    $("#progress-2 i").addClass("done")
    $("#progress-2").addClass("done")

    $("#progress-3 a").addClass("current")
    $("#progress-3").addClass("current")

    $("#configuration-information").show("slow")

    formInformation.productFamily = $('input[name=type]:checked', '#namespace').val();
    formInformation.productName =  $('#productName option:selected').val();
    formInformation.apiVersion = $( "#apiVersion" ).val()
  });
});

$("#configuration").on("formvalid.zf.abide", function(ev,frm) {
  ev.preventDefault();
  
  $("#configuration-information").hide("slow", function(){
    $("#progress-3 i").addClass("done")
    $("#progress-3").addClass("done")

    $("#progress-4 a").addClass("current")
    $("#progress-4").addClass("current")

    $("#start-information").show("slow")
  });
});


$("#configuration-back").click( function(){
  console.log("configuration back");
  $("#configuration-information").hide("slow", function(){
    $("#namespace-information").show("slow");
    $("#progress-2 i").removeClass("done");
    $("#progress-2").removeClass("done");

    $("#progress-2 a").addClass("current")
    $("#progress-2").addClass("current")

    $("#progress-3 a").removeClass("current")
    $("#progress-3").removeClass("current")
  });
})

$("#namespace-back").click( function(){
  $("#namespace-information").hide("slow", function(){
    $("#general-information").show("slow");
    
    $("#progress-1 i").removeClass("done");
    $("#progress-1").removeClass("done");

    $("#progress-1 a").addClass("current")
    $("#progress-1").addClass("current")

        $("#progress-2 a").removeClass("current")
    $("#progress-2").removeClass("current")
  });
})

$("#start-back").click( function(){  
  $("#start-information").hide("slow", function(){
    $("#configuration-information").show("slow");
 
    $("#progress-3 i").removeClass("done");
    $("#progress-3").removeClass("done");

    $("#progress-3 a").addClass("current")
    $("#progress-3").addClass("current")

    $("#progress-4 a").removeClass("current")
    $("#progress-4").removeClass("current")
  });
})


$( ".watchNamespace" ).change(function() {
  var namespace = getNamespacePreview();
  $("#generatedNamespace").html(namespace);
});

$( "#apiVersion" ).on("input", function() {
  var namespace = getNamespacePreview();
  $("#generatedNamespace").html( namespace);
});

function getNamespacePreview(){
  var productFamily = $('input[name=type]:checked', '#namespace').val();
  var productName =  $('#productName option:selected').val();
  var apiVersion = $( "#apiVersion" ).val()
  console.log(apiVersion)
  var majorVersion;
  var target = apiVersion.indexOf(".");
  if (target != -1){
    majorVersion = apiVersion.substring(0, target);  
  }else
  majorVersion = apiVersion;

  return "/" +productFamily + "/" +productName+ "/v" +majorVersion;
}

$("#fileupload").change( function(e){

  var file = e.target.files[0];

  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        console.log( evt.target.result) ;

         try{
          var doc = yaml.safeLoad( evt.target.result);
        } catch(e){

          $('#start').foundation('addErrorClasses', $('#fileupload'));
          return false;

        }
         formInformation.swagger = doc;
         return true;
    }
    reader.onerror = function (evt) {
        $('#start').foundation('addErrorClasses', $('#fileupload'));
    }

  }
})


$( "#artifactId" ).on("input", function() {
  var packageName = getPackageName();
  $("#generatedPackageName").html( packageName);
});


$( "#artifactVersion" ).on("input", function() {
  var packageName = getPackageName();
  $("#generatedPackageName").html( packageName);
});


function getPackageName(){
  //var artifactVersion = $( "#artifactVersion" ).val();
  var artifactId = $( "#artifactId" ).val();

  return "com.worldpay." +formInformation.productFamily + "." +formInformation.productName+ "." + artifactId;
}




$("#login").on("formvalid.zf.abide", function(ev,frm) {
  ev.preventDefault();
  
    $("#login-information").hide("slow", function(){
    $("#general-information").show("slow");
    $(".current-progress").show("slow");
 
  });
});
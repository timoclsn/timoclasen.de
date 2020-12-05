$(document).ready(function() {

	$(function() {
    		FastClick.attach(document.body);
	});
	
	$('#menu').click(function() {
		$('.menuiconwrap').toggleClass('menu-cross');
		$('.resnav').toggleClass('oben');
		$('.resnav1').toggleClass('resnavin1');
		$('.resnav2').toggleClass('resnavin2');
		$('.resnav3').toggleClass('resnavin3');
		$('.resnav4').toggleClass('resnavin4');
		$('.resnav5').toggleClass('resnavin5');
	});

	$(function() {
		$('.abouttext').hyphenate('en-us');
	});

	
	$('.contactquad').hover(function() {
		$('.contactquad').removeClass('klapp1 klapp2 klapp3 klapp4 klapp5 klapp6 klapp7 klapp8');
	});

	$(".contactquad").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
  		$(this).removeClass("contacthover");
});

	$('.contactquad').mouseenter(function() {
		$(this).addClass('contacthover');
	});
});
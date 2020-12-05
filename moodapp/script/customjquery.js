jQuery(document).ready(function(){

		//------------------300ms touch-delay ausschalten

	$(function() {
    	FastClick.attach(document.body);
	});

		//------------------Mark Overlay

	function overlay() {
		if ($(this).hasClass('mseriös')) {
    		$('.oseriös').fadeIn();
		} else if ($(this).hasClass('mhochwertig')){
			$('.ohochwertig').fadeIn();
		} else if ($(this).hasClass('melegant')){
			$('.oelegant').fadeIn();
		} else if ($(this).hasClass('mmodern')){
			$('.omodern').fadeIn();
		} else if ($(this).hasClass('mdynamisch')){
			$('.odynamisch').fadeIn();
		} else if ($(this).hasClass('mfrisch')){
			$('.ofrisch').fadeIn();
		} else if ($(this).hasClass('mjung')){
			$('.ojung').fadeIn();
		} else if ($(this).hasClass('meinladend')){
			$('.oeinladend').fadeIn();
		} else if ($(this).hasClass('mfreundlich')){
			$('.ofreundlich').fadeIn();
		} 
	}

	function overlayClose() {
		$('.mark-overlay').fadeOut();
	}

	$('.mark-overlay').hide();
	$('.mark').click(overlay);
	$('.close').click(overlayClose);

		//------------------Karte drehen

	$(document).on('click', '.kategorie, .flip', function () {

		var flip = $(this).parents(".karte")
		$(flip).toggleClass("drehen");
	});

		//------------------Begriff eingeben

	var addWord = function(word){
		var id = Date.now();
		$('#begriff-liste').prepend('<li class="listenpunkt" id="'+id+'"><div class="mark m'+word+'" id="gruppe1"></div><a href="#" class="listen-text" data-filter=".'+word+'">'+word+'</a></li>');
		$('.subbegriffe').prepend('<li class="sub' + word + '"><span class="filter" data-filter=".'+word+'">'+word+'</span></li>');
		localStorage.setItem(id, word);
		$('.listenpunkt').click(filter);
		$('.mark').click(overlay);
		$('.filter').click(filterBegriffe);

		$("#begriff-liste li").on("delete", function(evt) {

	   		var deleteitem = $(this).children('div a').text().toLowerCase();
	   		var deleteitemli = '.sub'+deleteitem;
	   		$('.subbegriffe '+deleteitemli).remove();

		});
	};

	$('#suchbegriff').on('submit', function(){
		var word = $('#suchbegriff').find('input[name=add-listenpunkt]').val();
		if(word !=""){
		addWord(word);
		}
		$('#suchbegriff').find('input[name=add-listenpunkt]').val('');
		return false;
	});

		//------------------Kategorie ändern

	$('.optionkategorie').on('change', function() {
		var kategorie = $(this).val();
		var kat = $(this).parents(".karte");
		var katchilvor = $(kat).children('.vorderseite');
		var katchilrue = $(kat).children('.rueckseite');
		$(katchilvor).children('.kategorie').text(kategorie);
		$(katchilrue).children('.kategorie').text(kategorie);	
	});

		//------------------Kommentar/Flagg

	$('.optionkommentar').on('change', function() {
		var kom = $(this).parents(".karte");
		var komvor = $(kom).children('.vorderseite');
		$(komvor).children('.noti').show();
		counter++;
		$('.notcounter').html(counter);
	});

		//------------------Notification Center Zähler

		var counter = 0;
		$('.notcounter').html(counter);

		//------------------Gruppe ändern

	$('.optionengruppe').on('change', function() {
		var gruppe = $(this).val();
		var gruhead = $(this).parents(".gruppe");
		var gru = $(gruhead).children('.gruppenhead');
		$(gru).html('Gruppe: <span class="gruppelabel">' + gruppe +'</span>');
	});

		//------------------Bild löschen

	$('.bilddelete').on('click', function() {
		var deletkarte = $(this).parents(".karte");
		$container.isotope( 'remove', $(deletkarte) );
	});

		//------------------Autocomplete

	var suchbegriffe = [
		"seriös",
		"jung",
		"einladend"			
	];	

	$("#suchfeld").autocomplete({
		source: suchbegriffe,
		minLength: 0
	});

	$("#suchfeld").focus(function(event) {
        $(this).autocomplete( "search" , "" );
	});

		//------------------Navigation (Isotope)

	var $container = $('#container');

	$container.isotope({
		layoutMode : 'fitRows',
		filter: '.hochwertig'
	});

	$('.listenpunkt').click(filter);

	function filter() {
		$('.listenpunkt').removeClass("active");
		$(this).addClass("active");
		var selector = $("a", this).attr('data-filter');
		$container.isotope({ filter: selector });
		return false;
	}

		//------------------liste sortierbar machen jquery-ui sortable
	// $(function() {
	//     $( "#begriff-liste" ).sortable({ axis: "y" });
	//     $( "#begriff-liste" ).disableSelection();
	// });

		//------------------ Bilder auswählen (jquery ui dropable)

	$('.karte').draggable({
	    revert: 'invalid',
	    helper: function () {
	        return $(this).clone().removeAttr('style').removeClass('isotope-item').addClass('drag-helper').appendTo('body');
	    },
	    start: function () {
	        $(this).hide();
	    },
	    stop: function () {
	        $(this).show();
	    },
	    zIndex: 995
	});

	$('.dropzone').droppable({
    	activeClass: "dropzoneactive",
	    drop: function (event, ui) {
			ui.draggable.addClass('klein');
	        var $this = $(this);
	        ui.draggable.clone().removeAttr('style').removeClass('atom').appendTo($this);
	        $container.isotope('remove', ui.draggable);

	        var begriff = $('li.active > a').text();

	        var firstClass = $(ui.draggable).attr('class').split(' ')[0];

	        var kategoriemood = $(ui.draggable).children('.vorderseite').children('.kategorie').text().toLowerCase();

	        var obegriff = '.o'+begriff;

	        var gruppemood = $(obegriff+' .gruppe .gruppenhead span').text().toLowerCase();

			var $newItems = $('<img class="item element moods ' + begriff + ' ' + kategoriemood + ' ' + gruppemood + '" src="../../moodapp/bilder/' + firstClass + '.png" />');

			$('#moodcontent').append( $newItems ).isotope( 'addItems', $newItems);

			$('#moodcontent').isotope({ });	

			$(this).children('.karte').children('.vorderseite').children('.noti').hide();
	    }
	});

  		//------------------ JqueryUI Slider 

	var updateBegriff = function(event, ui) {

		var valueBunteintönig = $('.sliderbunteintönig').slider('value')

		if(valueBunteintönig <= 60){
			$('.oseriösbegriff').text("frisch");
			$('.subseriös span').text("frisch");
			$('.dseriös').attr("data-filter", ".frisch");
			$('.subseriös span').attr("data-filter", ".frisch");
			$('.active a').text("frisch");


			$container.isotope({
			layoutMode : 'fitRows',
			filter: '.frisch'
			});

			$('#moodcontent').isotope({
				layoutMode : 'fitRows',
				filter: '.frisch'
			});
	  	}

	  	if(valueBunteintönig >=  60){
			$('.oseriösbegriff').text("seriös");
			$('.subseriös span').text("seriös");
			$('.dseriös').attr("data-filter", ".seriös");
			$('.subseriös span').attr("data-filter", ".seriös");
			$('.active a').text("seriös");

			$container.isotope({
			layoutMode : 'fitRows',
			filter: '.seriös'
			});

			$('#moodcontent').isotope({
				layoutMode : 'fitRows',
				filter: '.seriös'
			});
	  	}
  	}

	$(function() {
	    $( ".sliderwarmkalt" ).slider({
			value: 70,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".sliderhelldunkel" ).slider({
			value: 40,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".sliderbunteintönig" ).slider({
	    	value: 80,
	    	animate: "fast",
			min: 0,
			max: 100,
	    	slide: updateBegriff
	    });
  	});
 		
  	$(function() {
	    $( ".sliderwildruhig" ).slider({
			value: 85,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".sliderrundeckig" ).slider({
			value: 80,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".sliderweichhart" ).slider({
			value: 75,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".slidergrobfiligran" ).slider({
			value: 80,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  	$(function() {
	    $( ".sliderschwerzart" ).slider({
			value: 70,
			animate: "fast",
			min: 0,
			max: 100
	    });
  	});

  		//------------------ Begriff farbe ändern

  	$(".mark1").click(function(){
  		var overlaywaehlen = $(this).parents(".mark-overlay");
  		var secondClass = $(overlaywaehlen).attr('class').split(' ')[1];
  		var secondClass2 = '.m'+secondClass;
  		$(secondClass2).css('background-color', '#c97932');
  		var markactive = $(this).parents('.farbe');
  		$(markactive).children('.mark').removeClass("markactive");
		$(this).addClass("markactive");
  	});
  	$(".mark2").click(function(){
  		var overlaywaehlen = $(this).parents(".mark-overlay");
  		var secondClass = $(overlaywaehlen).attr('class').split(' ')[1];
  		var secondClass2 = '.m'+secondClass;
  		$(secondClass2).css('background-color', '#a9512a');
  		var markactive = $(this).parents('.farbe');
  		$(markactive).children('.mark').removeClass("markactive");
		$(this).addClass("markactive");
  	});
  	$(".mark3").click(function(){
  		var overlaywaehlen = $(this).parents(".mark-overlay");
  		var secondClass = $(overlaywaehlen).attr('class').split(' ')[1];
  		var secondClass2 = '.m'+secondClass;
  		$(secondClass2).css('background-color', '#c9b232');
  		var markactive = $(this).parents('.farbe');
  		$(markactive).children('.mark').removeClass("markactive");
		$(this).addClass("markactive");
  	});
  	$(".mark4").click(function(){
  		var overlaywaehlen = $(this).parents(".mark-overlay");
  		var secondClass = $(overlaywaehlen).attr('class').split(' ')[1];
  		var secondClass2 = '.m'+secondClass;
  		$(secondClass2).css('background-color', '#c65757');
  		var markactive = $(this).parents('.farbe');
  		$(markactive).children('.mark').removeClass("markactive");
		$(this).addClass("markactive");
  	});

  		//------------------ Moodboard einblendet

  	// $('.moodlayout').hide();

  	$('.drophead').click(function(){

  		if($('.moodlayout').is(':visible')){
	  		$('.moodboard').animate({
	  			marginTop: 0
	  			},{
				duration: 1000, 
				easing: 'easeOutBounce'
	  		});
	  		$('.dropzone').delay(600).show(0);
	  		$('.moodlayout').delay(1000).hide(0);
  		} else {
  			$('.dropzone').delay(500).hide(0);
	  		$('.moodlayout').show();
	  		$('.moodboard').animate({
	  			marginTop: "-688px"
	  			},{
				duration: 1000, 
				easing: 'easeOutBounce'
	  		});
	  		$('#moodcontent').isotope({
				layoutMode : 'fitRows',
			});
  		}
  	});

   		//------------------ Swipe to delete Funktion

   	$("#begriff-liste li").on("delete", function(evt) {

   		var deleteitem = $(this).children('div a').text().toLowerCase();
   		var deleteitemli = '.sub'+deleteitem;
   		$('.subbegriffe '+deleteitemli).remove();
	});

   		//------------------ Akkordion Menu

	 // Store variables
 
	var accordion_head = $('.accordion > li > span'),
	accordion_body = $('.accordion li > .sub-menu');
 
        // Open the first tab on load
 
	var accEase = {
		duration: 800, 
		easing: 'easeInOutQuart'
	};

	accordion_head.first().addClass('activemood').next().slideDown(accEase);
 
	accordion_head.on('click', function(event) {

		event.preventDefault();

	    if ($(this).attr('class') != 'activemood'){
	        accordion_body.slideUp(accEase);
	        $(this).next().stop(true,true).slideToggle(accEase);
	        accordion_head.removeClass('activemood');
	        $(this).addClass('activemood');
	    }
	    $('.filter').removeClass("begriffactive");
		var selector = $(this).attr('data-filter');
		$('#moodcontent').isotope({ filter: selector });
		return false;
	});

  		//------------------ sub menu active

	$('.filter').click(filterBegriffe);

	function filterBegriffe() {
		$('.filter').removeClass("begriffactive");
		$(this).addClass("begriffactive");
		var selector = $(this).attr('data-filter');
		$('#moodcontent').isotope({ filter: selector });
		return false;
	}

  		//------------------ Bild hinzufügen

  	$('#bild-hinzu').click(function(){
  		$('.neuesbild').fadeIn();
  	});

  	$('.bildhinzu').click(function(){

  		var bildhinzuname = $(this).attr('class').split(' ')[0];

  		var bildhinzubegriff = $('li.active > a').text();

  		var $newItems = $('<div class="' + bildhinzuname + ' karte item element ' + bildhinzubegriff + '"><div class="vorderseite"><img src="../../moodapp/bilder/' + bildhinzuname + '.png" /><div class="noti" aria-hidden="true" data-icon="&#9873;"></div><div class="flip" aria-hidden="true" data-icon="&#128260;"></div><div class="kategorie">Allgemein</div></div><div class="rueckseite"><h2 class="kategorielabel">Kategorie:</h2><form class="formkategorie"><select name="kategorien" class="optionkategorie" size="1"><option value="Allgemein">Allgemein</option><option value="Grundtöne">Grundtöne</option><option value="Akzentfarbe">Akzentfarbe</option><option value="Form">Form</option><option value="Kontrast">Kontrast</option><option value="Textur">Textur</option></select></form><h2 class="kategorielabel">Kommentar</h2><form class="formkommentar"><select name="kommentare" class="optionkommentar" size="1"><option value="Kommentar hinzufügen">Kommentar hinzufügen</option><option value="Farbe passt nicht">Farbe passt nicht</option><option value="Zu Wild">Zu Wild</option><option value="Weniger Sättigung">Weniger Sättigung</option><option value="Zu Steril aus">Zu Steril aus</option></select></form><div class="bilddelete">Bild löschen</div><div class="flip" aria-hidden="true" data-icon="&#128260;"></div><div class="kategorie">Allgemein</div></div></div>');

		$('#container').isotope( 'insert', $newItems );

		$(this).remove();

		// $(".kategorie").click(function () {

		// var flip = $(this).parents(".karte")
		// $(flip).toggleClass("drehen");
		// });

		$('.optionkategorie').on('change', function() {
			var kategorie3 = $(this).val();
			var kat3 = $(this).parents(".karte");
			var katchilvor3 = $(kat3).children('.vorderseite');
			var katchilrue3 = $(kat3).children('.rueckseite');
			$(katchilvor3).children('.kategorie').text(kategorie3);
			$(katchilrue3).children('.kategorie').text(kategorie3);	
		});

		$('.optionkommentar').on('change', function() {
			var kom = $(this).parents(".karte");
			var komvor = $(kom).children('.vorderseite');
			$(komvor).children('.noti').show();
			counter++;
			$('.notcounter').html(counter);
		});

		$('.bilddelete').on('click', function() {
			var deletkarte = $(this).parents(".karte");
			$container.isotope( 'remove', $(deletkarte) );
		});

		$('.karte').draggable({
	    	revert: 'invalid',
	    	helper: function () {
	        return $(this).clone().removeAttr('style').removeClass('isotope-item').addClass('drag-helper').appendTo('body');
	    	},
	    	start: function () {
	        $(this).hide();
	    	},
	    	stop: function () {
	        $(this).show();
	    	},
	    	zIndex: 995
		});
  	});
});
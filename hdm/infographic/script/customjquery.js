jQuery(document).ready(function(){
	
    $('.curtains').curtain({
            scrollSpeed: 600,
            curtainLinks: '.curtain-links',
            easing: 'easeInCubic'

        });

        //------------------ weiter

        $('.weiter1').hide();
        $('.weiter2').hide();
        $('.weiter3').hide();
        $('.weiter4').hide();
        $('.weiter5').hide();

		//------------------ iPhone Animation

	function animate1() { 
		$('.iphonecontainer').children().addClass("iscreen2");
		$('.iphonecontainer').children().removeClass("iscreen1");
	}

	$('ul.togglebtn li:first-child').click(function() {
		animate1();
	});

	function animate2() { 
		$('.iphonecontainer').children().addClass("iscreen1");
		$('.iphonecontainer').children().removeClass("iscreen2");
	}

	$('ul.togglebtn li:last-child').click(function() {
		animate2();
	});

		//------------------Button ON/OFF und Text einblenden

	$("ul.togglebtn li").click(function(){
        $("ul.togglebtn li").attr("id","#");
        $(this).attr("id","off");
        $("p.claimwas").delay(1200).fadeIn();
        $('.weiter1').delay(3000).fadeIn();
    });

    $("p.claimwas").hide();

  		//------------------Chart Internetnutzung 

    $('.chart1_popup').hide();
    $('.dektopinternetnutzer').hide();
    $('.mobileinternetnutzer').hide();

    function chart1Popup(){
        if($('.desktopbtn').hasClass('desktopbtnactive') && $('.mobilebtn').hasClass('mobilebtnactive')) {
            $('.chart1_popup').delay(1500).fadeIn('slow');
            $('.weiter2').delay(3000).fadeIn();
        }
    }

    var togglePlot = function(seriesIdx){

        var someData = somePlot.getData();
        someData[seriesIdx].lines.show = !someData[seriesIdx].lines.show;
        someData[seriesIdx].points.show = !someData[seriesIdx].points.show;
        somePlot.setData(someData);
        somePlot.draw();
    }

    $('.desktopbtn').click(function(){
        $(this).toggleClass('desktopbtnactive');
        togglePlot(0);
        chart1Popup();
        $('.dektopinternetnutzer').delay(300).fadeIn('slow');
    });

    $('.mobilebtn').click(function() {
        $(this).toggleClass('mobilebtnactive');
        togglePlot(1);
        chart1Popup();
        $('.mobileinternetnutzer').delay(300).fadeIn('slow');
    });

   var somePlot = $.plot(".chartnutzung",
    	[	
    		{
              label: "Desktop", 
              color: '#4292c0', 
			  data: [[2007, 1100], [2008, 1250], [2009, 1300], [2010, 1350], [2011, 1500], [2012, 1550], [2013, 1600], [2014, 1650], [2015, 1680]],
              index: 0
			},

			{
              label: "Mobile", 
              color: '#e4713e',
			  data: [[2007, 400], [2008, 500], [2009, 700], [2010, 1000], [2011, 1100], [2012, 1350], [2013, 1550], [2014, 1760], [2015, 1950]],
              index: 1
			},
    	],

    	{
    		xaxis: { 	min: 2006, 
    					max: 2016,
    					color: "#30302f",
    					font: 	{
						    size: 16,
						    family: "Open Sans",
						    color: "#30302f"
						}
    		},
		    yaxis: { 	min: 0, 
		    			max: 2200,
		    			color: "#30302f",
		    			font: 	{
						    size: 16,
						    family: "Open Sans",
						    color: "#30302f"
						}
		    },
		    series: {
        				lines: { 	show: false,
        							lineWidth: 3
        						},
        				points: { 	show: false,
        							fill: true,
        							radius: 5
        						},
        				shadowSize: 0
    		},
    		grid: {		show: true,
    					color: "#30302f",
    					backgroundColor: "#f8f5f1",
    					tickColor: "#eae7e4",
    					borderWidth: {	top: 0,
    									right: 0,
    									bottom: 3,
    									left: 3
    					},
    					labelMargin: 20

    		},
            legend: {
                        show: false
                    }
    	   }	
        );

//------------------Chart res 


    $('.chart2_popup').hide();


    var datares = [
                    [240,180],
                    [300,180],
                    [323,194],
                    [320,240],
                    [360,240],
                    [400,240],
                    [405,270],
                    [480,272],
                    [420,280],
                    [512,307],
                    [531,319],
                    [427,320],
                    [480,320],
                    [485,320],
                    [491,320],
                    [493,320],
                    [495,320],
                    [496,320],
                    [497,320],
                    [501,320],
                    [505,320],
                    [509,320],
                    [521,320],
                    [532,320],
                    [533,320],
                    [541,320],
                    [543,320],
                    [569,320],
                    [640,320],
                    [545,327],
                    [537,329],
                    [509,334],
                    [554,339],
                    [602,339],
                    [614,346],
                    [550,349],
                    [582,349],
                    [555,352],
                    [587,352],
                    [634,357],
                    [592,360],
                    [598,360],
                    [600,360],
                    [602,360],
                    [604,360],
                    [610,360],
                    [616,360],
                    [640,360],
                    [572,362],
                    [562,366],
                    [610,366],
                    [615,369],
                    [668,376],
                    [592,384],
                    [608,384],
                    [635,384],
                    [640,384],
                    [692,389],
                    [698,393],
                    [656,394],
                    [701,395],
                    [592,400],
                    [618,400],
                    [635,400],
                    [637,400],
                    [640,400],
                    [667,400],
                    [674,404],
                    [683,411],
                    [684,411],
                    [731,411],
                    [655,422],
                    [703,422],
                    [711,427],
                    [768,432],
                    [745,436],
                    [731,439],
                    [719,449],
                    [768,450],
                    [800,450],
                    [802,478],
                    [799,479],
                    [800,479],
                    [639,480],
                    [640,480],
                    [641,480],
                    [720,480],
                    [752,480],
                    [760,480],
                    [763,480],
                    [768,480],
                    [799,480],
                    [800,480],
                    [801,480],
                    [801,480],
                    [805,480],
                    [817,480],
                    [853,480],
                    [853,480],
                    [854,480],
                    [855,480],
                    [960,480],
                    [1025,480],
                    [799,481],
                    [800,481],
                    [801,481],
                    [854,481],
                    [805,483],
                    [810,486],
                    [835,501],
                    [669,502],
                    [850,510],
                    [860,516],
                    [875,525],
                    [896,525],
                    [900,540],
                    [959,540],
                    [960,540],
                    [961,540],
                    [961,540],
                    [959,541],
                    [960,541],
                    [961,541],
                    [910,546],
                    [800,552],
                    [1024,552],
                    [950,570],
                    [1014,570],
                    [960,576],
                    [1024,576],
                    [975,585],
                    [1023,599],
                    [1024,599],
                    [1024,599],
                    [800,600],
                    [1000,600],
                    [1024,600],
                    [1025,600],
                    [800,601],
                    [1030,604],
                    [1010,606],
                    [1037,608],
                    [1020,612],
                    [825,619],
                    [1050,630],
                    [960,640],
                    [960,640],
                    [1148,645],
                    [1085,651],
                    [928,658],
                    [1270,658],
                    [1100,660],
                    [1270,668],
                    [1184,674],
                    [1152,675],
                    [1200,675],
                    [1184,677],
                    [1165,683],
                    [1163,689],
                    [1150,690],
                    [1184,690],
                    [1160,696],
                    [1208,698],
                    [1270,698],
                    [928,701],
                    [1184,702],
                    [1216,713],
                    [1279,719],
                    [960,720],
                    [960,720],
                    [1024,720],
                    [1200,720],
                    [1280,720],
                    [1281,720],
                    [1360,720],
                    [1366,720],
                    [1280,721],
                    [1205,723],
                    [1274,746],
                    [1000,750],
                    [1280,750],
                    [752,600],
                    [1280,752],
                    [1286,754],
                    [1024,768],
                    [1025,768],
                    [1279,768],
                    [1280,768],
                    [1366,768],
                    [1024,769],
                    [1280,769],
                    [1382,777],
                    [1300,780],
                    [1344,788],
                    [1344,790],
                    [1504,790],
                    [800,552],
                    [960,800],
                    [1280,800],
                    [1281,800],
                    [1281,801],
                    [1440,810],
                    [1600,852],
                    [854,480],
                    [1152,864],
                    [1596,897],
                    [1200,900],
                    [1536,900],
                    [1184,907],
                    [913,601],
                    [1584,950],
                    [951,768],
                    [1600,960],
                    [962,553],
                    [1824,970],
                    [976,600],
                    [976,768],
                    [1824,1009],
                    [1019,640],
                    [1019,800],
                    [1024,552],
                    [1024,600],
                    [1024,695],
                    [1024,720],
                    [1024,912],
                    [1920,1032],
                    [1050,630],
                    [1067,592],
                    [1067,752],
                    [1824,1075],
                    [1150,690],
                    [1536,1152],
                    [1920,1152],
                    [1920,1152],
                    [2040,1152],
                    [1200,720],
                    [1920,1200],
                    [1205,705],
                    [1214,663],
                    [1232,800],
                    [1241,882],
                    [1280,672],
                    [1280,720],
                    [1280,752],
                    [1280,768],
                    [1280,800],
                    [1317,800],
                    [1365,752],
                    [1365,976],
                    [1366,720],
                    [1440,810],
                    [1619,1065],
                    [1680,1002]
    ];

    $.plot(".chartres",
        [   
            {
              data: datares,
              color: '#e4713e',
            }
        ],

        {
            xaxis: {    min: 0, 
                        max: 2400,
                        color: "#30302f",
                        font:   {
                            size: 16,
                            family: "Open Sans",
                            color: "#30302f"
                        }
            },
            yaxis: {    min: 0, 
                        max: 1200,
                        color: "#30302f",
                        font:   {
                            size: 16,
                            family: "Open Sans",
                            color: "#30302f"
                        }
            },
            series: {
                        lines: {    show: false,
                                },
                        points: {   show: true,
                                    fill: true,
                                    radius: 5
                                },
                        shadowSize: 0
            },
            grid: {     show: true,
                        color: "#30302f",
                        backgroundColor: "#f8f5f1",
                        tickColor: "#eae7e4",
                        borderWidth: {  top: 0,
                                        right: 0,
                                        bottom: 3,
                                        left: 3
                        },
                        labelMargin: 20,
                        hoverable: true
            }
        }   
    );

    $(".chartres").bind("plothover", function (event, pos, item) {

        $('.chart2_popup').delay(3000).fadeIn('slow');
            $('.weiter3').delay(3500).fadeIn();

        if (item) {
            if((item.dataIndex >= 0) && (item.dataIndex <= 18)){
                if(!$('.resdevice').hasClass('blackberry')){  
                    $('.devices-bg').empty(); 
                    $('.devices-bg').append('<img class="resdevice blackberry" src="bilder/device_blackberry.png" />');
                }
            }
            if((item.dataIndex >= 19) && (item.dataIndex <= 37)){
                if(!$('.resdevice').hasClass('lumina')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice lumina" src="bilder/device_lumina.png" />');
                }
            }
            if((item.dataIndex >= 38) && (item.dataIndex <= 56)){
                 if(!$('.resdevice').hasClass('iphone')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice iphone" src="bilder/device_iphone.png" />');
                }
            }
            if((item.dataIndex >= 57) && (item.dataIndex <= 75)){
                if(!$('.resdevice').hasClass('samsunggalaxy')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice samsunggalaxy" src="bilder/device_samsunggalaxy.png" />');
                }
            }
            if((item.dataIndex >= 76) && (item.dataIndex <= 94)){
                if(!$('.resdevice').hasClass('ipadmini')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice ipadmini" src="bilder/device_ipadmini.png" />');
                }
            }
            if((item.dataIndex >= 95) && (item.dataIndex <= 113)){
                if(!$('.resdevice').hasClass('samsunggalaxytab')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice samsunggalaxytab" src="bilder/device_samsunggalaxytab.png" />');
                }
            }
            if((item.dataIndex >= 114) && (item.dataIndex <= 132)){
                if(!$('.resdevice').hasClass('surface')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice surface" src="bilder/device_surface.png" />');
                }
            }
            if((item.dataIndex >= 133) && (item.dataIndex <= 151)){
                if(!$('.resdevice').hasClass('ipad')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice ipad" src="bilder/device_ipad.png" />');
                }
            }
            if((item.dataIndex >= 152) && (item.dataIndex <= 170)){
                if(!$('.resdevice').hasClass('macbook')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice macbook" src="bilder/device_mac.png" />');
                }
            }
            if((item.dataIndex >= 171) && (item.dataIndex <= 189)){
                if(!$('.resdevice').hasClass('acer')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice acer" src="bilder/device_acer.png" />');
                }
            }
            if((item.dataIndex >= 190) && (item.dataIndex <= 208)){
                if(!$('.resdevice').hasClass('imac')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice imac" src="bilder/device_imac.png" />');
                }
            }
            if((item.dataIndex >= 209) && (item.dataIndex <= 227)){
                if(!$('.resdevice').hasClass('thunderbolt')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice thunderbolt" src="bilder/device_thunderbolt.png" />');
                }
            }
            if((item.dataIndex >= 228) && (item.dataIndex <= 252)){
                if(!$('.resdevice').hasClass('asus4k')){
                    $('.devices-bg').empty();
                    $('.devices-bg').append('<img class="resdevice asus4k" src="bilder/device_asus4k.png" />');
                }
            }
        }   
    });

        //------------------slider

    $('.broken').hide();
    $('.brokentext').hide();
    $('.notbroken').hide();
    $('.notbrokentext').hide();

    $(function() {
        $( ".relslider" ).slider({
            value: 1440,
            animate: "slow",
            min: 0,
            max: 1440,
            slide: chartRel,
            create: devices
        });
    });

    var devices = function(event, ui) {

        $('.macskala2').on('click',function(){

            $('.broken').hide();
            $('.brokentext').hide();

             $( ".relslider" ).slider("option", "value", 1280);
                $('.relgra1').css('width', '452px');

        });

        $('.ipadskala2').on('click',function(){

            $('.broken').show();
            $('.brokentext').show();

             $( ".relslider" ).slider("option", "value", 790);
                $('.relgra1').css('width', '285px');

        });

        $('.iphoneskala2').on('click',function(){

            $('.broken').show();
            $('.brokentext').show();

             $( ".relslider" ).slider("option", "value", 320);
                $('.relgra1').css('width', '111px');

        });


    }

    var chartRel = function(event, ui) {

        var valuecalc = ui.value * (0.354166667);

        $('.relgra1').css('width', valuecalc + 'px');

        var valueSlider1 = $('.relslider').slider('value')

        if(valueSlider1 <= 740){
            $('.broken').show();
            $('.brokentext').show();
            $('.weiter4').delay(3000).fadeIn();
        }

        if(valueSlider1 > 740){
            $('.broken').hide();
            $('.brokentext').hide();
        }

    }

    $(function() {
        $( ".relslider2" ).slider({
            value: 1440,
            animate: "fast",
            min: 0,
            max: 1440,
            // step: 160,
            slide: chartRel2,
            create: breakpoints,
            stop: breakpoints
        });
    });


    var breakpoints = function(event, ui) {

        var value2Slider2 = $('.relslider2').slider('value')

        $('.breakpoint2').on('click',function(){

            $('.notbroken').hide();
            $('.notbrokentext').hide();

            if(value2Slider2 > 950) {

                $( ".relslider2" ).slider("option", "value", 950);
                $('.relwrap2').children().addClass("relgra3");
                $('.relwrap2').children().removeClass("relgra");
                $('.relerkl2').removeClass("relgra3");
                $('.relgra3').css('width', '336.45833365px');
            }

            if(value2Slider2 <= 949) {
                $( ".relslider2" ).slider("option", "value", 949);

                $('.relwrap2').children().addClass("relgra2");
                $('.relwrap2').children().removeClass("relgra3");
                $('.relwrap2').children().removeClass("relgra4");
                $('.relerkl2').removeClass("relgra2");
                $('.relgra2').css('width', '336.45833365px');
            }
        });

        $('.breakpoint1').on('click',function(){

            $('.notbroken').show();
            $('.notbrokentext').show();

            if(value2Slider2 > 530) {

                $( ".relslider2" ).slider("option", "value", 530);
                $('.relwrap2').children().addClass("relgra4");
                $('.relwrap2').children().removeClass("relgra2");
                $('.relwrap2').children().removeClass("relgra3");
                $('.relerkl2').removeClass("relgra4");
                $('.relgra4').css('width', '187.70833351px');
            }

            if(value2Slider2 <= 529) {
                $( ".relslider2" ).slider("option", "value", 529);

                $('.relwrap2').children().addClass("relgra3");
                $('.relwrap2').children().removeClass("relgra2");
                $('.relwrap2').children().removeClass("relgra4");
                $('.relerkl2').removeClass("relgra3");
                $('.relgra3').css('width', '187.70833351px');
            }
        });

        $('.macskala').on('click',function(){

            $('.notbroken').hide();
            $('.notbrokentext').hide();

             $( ".relslider2" ).slider("option", "value", 1280);

                $('.relwrap2').children().addClass("relgra2");
                $('.relwrap2').children().removeClass("relgra3");
                $('.relwrap2').children().removeClass("relgra4");
                $('.relerkl2').removeClass("relgra2");
                $('.relgra2').css('width', '452px');

        });

        $('.ipadskala').on('click',function(){

            $('.notbroken').show();
            $('.notbrokentext').show();

             $( ".relslider2" ).slider("option", "value", 790);

                $('.relwrap2').children().addClass("relgra3");
                $('.relwrap2').children().removeClass("relgra2");
                $('.relwrap2').children().removeClass("relgra4");
                $('.relerkl2').removeClass("relgra3");
                $('.relgra3').css('width', '285px');

        });

        $('.iphoneskala').on('click',function(){

            $('.notbroken').show();
            $('.notbrokentext').show();

             $( ".relslider2" ).slider("option", "value", 320);

                $('.relwrap2').children().addClass("relgra4");
                $('.relwrap2').children().removeClass("relgra3");
                $('.relwrap2').children().removeClass("relgra2");
                $('.relerkl2').removeClass("relgra4");
                $('.relgra4').css('width', '111px');

        });



    }

    var chartRel2 = function(event, ui) {



        var valuecalc2 = ui.value * (0.354166667);

        $('.relgra2').css('width', valuecalc2 + 'px');


        var valueSlider2 = $('.relslider2').slider('value')


        if(valueSlider2 <= 740){
            $('.notbroken').show();
            $('.notbrokentext').show();
        }

        if(valueSlider2 > 740){
            $('.notbroken').hide();
            $('.notbrokentext').hide();
        }

        if(valueSlider2 <= 950){
         
            $('.relwrap2').children().addClass("relgra3");
            $('.relwrap2').children().removeClass("relgra2");
            $('.relerkl2').removeClass("relgra3");

             var valuecalc2 = ui.value * (0.354166667);

            $('.relgra3').css('width', valuecalc2 + 'px');
        }

        if(valueSlider2 <= 530){
         
            $('.relwrap2').children().addClass("relgra4");
            $('.relwrap2').children().removeClass("relgra3");
            $('.relerkl2').removeClass("relgra4");

             var valuecalc2 = ui.value * (0.354166667);

            $('.relgra4').css('width', valuecalc2 + 'px');
            $('.weiter5').delay(3000).fadeIn();
        }

         if(valueSlider2 >= 530){
         
            $('.relwrap2').children().addClass("relgra3");
            $('.relwrap2').children().removeClass("relgra4");
            $('.relerkl2').removeClass("relgra3");

             var valuecalc2 = ui.value * (0.354166667);

            $('.relgra3').css('width', valuecalc2 + 'px');
        }

        if(valueSlider2 >= 950){
         
            $('.relwrap2').children().addClass("relgra2");
            $('.relwrap2').children().removeClass("relgra3");
            $('.relerkl2').removeClass("relgra2");

             var valuecalc2 = ui.value * (0.354166667);

            $('.relgra2').css('width', valuecalc2 + 'px');
        }
    }


    $('.zahleninhalt2').hide();
    $('.zahleninhalt3').hide();

    $('.timebtn').click(function(){
        $('.zahlenbutton').removeClass('timebtnactive');
        $('.zahlenbutton').removeClass('skinnybtnactive');
        $('.zahlenbutton').removeClass('oneillbtnactive');
        $(this).addClass('timebtnactive');

        if(!$(this).hasClass('zahleninhaltactive')){
            $('.zahleninhalt2').fadeOut();
            $('.zahleninhalt3').fadeOut();
            $('.zahleninhalt1').fadeIn();
            $('.zahlenerkl').css('background-color', '#e4713e');
        }

    });

    $('.skinnybtn').click(function(){
        $('.zahlenbutton').removeClass('timebtnactive');
        $('.zahlenbutton').removeClass('skinnybtnactive');
        $('.zahlenbutton').removeClass('oneillbtnactive');
        $(this).addClass('skinnybtnactive');

        if(!$(this).hasClass('zahleninhaltactive')){
            $('.zahleninhalt1').fadeOut();
            $('.zahleninhalt3').fadeOut();
            $('.zahleninhalt2').fadeIn();
            $('.zahlenerkl').css('background-color', '#4292c0');
        }
    });

    $('.oneillbtn').click(function(){
        $('.zahlenbutton').removeClass('timebtnactive');
        $('.zahlenbutton').removeClass('skinnybtnactive');
        $('.zahlenbutton').removeClass('oneillbtnactive');
        $(this).addClass('oneillbtnactive');

        if(!$(this).hasClass('zahleninhaltactive')){
            $('.zahleninhalt1').fadeOut();
            $('.zahleninhalt2').fadeOut();
            $('.zahleninhalt3').fadeIn();
            $('.zahlenerkl').css('background-color', '#c1c243');
        }
    });
});
























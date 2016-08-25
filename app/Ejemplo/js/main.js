(function($)
{
    "use strict";
	$(window).ready(function(){
		var inputLlegada=$('#wrap-hotel-llegada');
		var inputSalida=$('#wrap-hotel-salida');


		$(".dropdown").dropdown({
			hover:true,
			belowOrigin: true
		});
		$(".dropdown-mobi").dropdown({
			hover:false,
			 belowOrigin: false,
             constrain_width: false,
		});
		$(".button-collapse").sideNav();//inicializar la navegacion
		$('select').material_select();//inicializar los select
		$('ul.tabs').tabs();//inicializar las tabs
		/* cambiar el icono de los tabs */
		$('.tab.col a').on("click",function(){
			setTimeout(function(){
				$('.tab.col a').each(function(img){
					var imagen="";
					var obj=$(this).find('img');
					if($(this).hasClass('active')){
						imagen=obj.data('activo');
					}else{
						imagen=obj.data('inactivo');
					}
					$(this).find('img').attr("src","img/"+imagen+".png");
				});
			}, 100);
		});
		$(window).on("scroll", function() {
			var actual = $(this).scrollTop();

			if(actual>=100){
				console.log('entro');
				//$('.menu_fixed').removeClass('hide');
				$('#top-menu').hide();
			}else{
				//$('#top-menu').addClass('hide');
				$('#top-menu').show();
			}
		});


		$('#transfer-type').change(function(i){
			var selected=$("#transfer-type option:selected")
			switch(selected.text()){
				case "Round Trip":
					removeClassHotel_completo();
					inputLlegada.show();
					inputSalida.show();
					;break;
				case "Airport to Hotel":
					removeClassHotel();
					inputLlegada.show();
					inputSalida.hide();

					;break;
				case "Hotel to Airport":
					removeClassHotel();
					inputLlegada.hide();
					inputSalida.show();

					;break;
			}
		});
		function removeClassHotel(){
			inputLlegada.removeClass('s12 m6');
			inputSalida.removeClass('s12 m6');
			inputLlegada.addClass('s12');
			inputSalida.addClass('s12');
		}
		function removeClassHotel_completo(){
			inputLlegada.removeClass('s12');
			inputSalida.removeClass('s12');
			inputLlegada.addClass('s12 m6');
			inputSalida.addClass('s12 m6');

		}





		/* INICIALIZANDO EL DATYE PICKER CON LOS PARAMETROS DE CONFIGURAION ESTANDARS */
	var diasTrans=0;
    $('.datepicker-trans').pickadate({
        selectMonths: true,// Creates a dropdown to control month
        selectYears: 15,// Creates a dropdown of 15 years to control year
        min:1,
        // The title label to use for the month nav buttons
        labelMonthNext: 'Next Month',
        labelMonthPrev: 'Beforre Month',
        // The title label to use for the dropdown selectors
        labelMonthSelect: 'Select a Month',
        labelYearSelect: 'Select a year',

        // Months and weekdays
        //monthsFull: [ 'Janeiro', 'Fevereiro', 'MarÃ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
        //monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
        //weekdaysFull: [ 'Domingo', 'Segunda', 'TerÃ§a', 'Quarta', 'Quinta', 'Sexta', 'SÃ¡bado' ],
        //weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
        // Materialize modified
        //weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        // Today and clear
        today: 'Today',
        clear: 'Clear',
        close: 'Enter',
        // The format to show on the `input` element
        formatSubmit:'mm/dd/yyyy',
        format:'dddd, dd mmm, yyyy',
        hiddenName:true,
        hiddenPrefix: 'prefix__',
        onOpen: function() {
            //console.log('Opened up!')
        },
        onClose: function() {
            //console.log('Closed now');
            /*var from_$input_trans = $('#date-in').pickadate(),
                from_picker_trans = from_$input_trans.pickadate('picker')

            var to_$input = $('#date-out').pickadate(),
                to_picker = to_$input.pickadate('picker')

            // Check if thereâ€™s a â€œfromâ€ or â€œtoâ€ date to start with.
            if ( from_picker_trans.get('value') ) {
                to_picker.set('min', [from_picker_trans.get('select')["year"],from_picker_trans.get('select')["month"],from_picker_trans.get('select')["date"]+diasTrans])

            }
            if ( to_picker.get('value') ) {
                from_picker_trans.set('max', to_picker.get('select'))
            }*/

        },
        onRender: function() {

        },
        onStart: function() {

        },
        onStop: function() {
        },
        onSet: function(thingSet) {

        }
    });
    var to_$input = $('#date-out').pickadate();
    var to_picker = to_$input.pickadate('picker');
    var from_$input_trans = $('#date-in').pickadate();
    var from_picker_trans = from_$input_trans.pickadate('picker');

    /*from_picker_trans.on('close', function(event) {
        var to_$input = $('#date-out').pickadate();
        var to_picker = to_$input.pickadate('picker');
        to_picker.open(true);
    });*/

    // When something is selected, update the â€œfromâ€ and â€œtoâ€ limits.
    from_picker_trans.on('set', function(event) {
        if ( event.select ) {
            to_picker.set('min', from_picker_trans.get('select'),{ format:'mm/dd/yyyy'}),
                //to_picker.set('clear',{ format:'mm/dd/yyyy'}),
                to_picker.set('highlight', from_picker_trans.get('select'),{ format:'mm/dd/yyyy'}),
                from_picker_trans.close(),
                to_picker.open()
            //console.log('entro');
        }
        else if ( 'clear' in event ) {
            to_picker.set('min', false,{ format:'mm/dd/yyyy'})
        }
    });
    to_picker.on('set', function(event) {
        if ( event.select ) {
            from_picker_trans.set('max', to_picker.get('select'),{ format:'mm/dd/yyyy'}),
            from_picker_trans.set('highlight', to_picker.get('select'),{ format:'mm/dd/yyyy'})
            to_picker.close()
        }
        else if ( 'clear' in event ) {
            from_picker_trans.set('max', false,{ format:'mm/dd/yyyy'})
        }
    });



	});
})(jQuery);

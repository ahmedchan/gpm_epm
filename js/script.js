

/// custom file upload build by Ahmed Saeed
(function ( $ ) {
 
    $.fn.fileUpload = function() {
        this.each(function(){

        	var $input   = $( this ),
		      $label   = $input.next( 'label' ),
		      labelVal = $label.html();

	      $input.on( 'change', function( e ){
		      var fileName = '';

		      if( this.files && this.files.length > 1 )
		        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		      else if( e.target.value )
		        fileName = e.target.value.split( '\\' ).pop();

		      if( fileName )
		        $label.find( 'span' ).html( fileName );
		      else
		        $label.html( labelVal );
		    });

		    // Firefox bug fix
		    $input
		    .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		    .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });

        });

        return this;
    };
 
}( jQuery ));



$(function(){

	var $win = $(window), $doc = $(document), $body = $(document.body);
	var max_fields = 20; //maximum input boxes allowed
	var wrapper = $("[data-parent='add-form-row'] .form-input-wrapper"); //Fields wrapper
	var add_button = $("[data-add='form-row']"); //Add button ID
	var $eventsPicker = $('#eventsPicker');
	
	var x = 1; //initlal text box count

	console.log('ready here....')

	if ($eventsPicker) {
		$eventsPicker.calendarsPicker({
          onSelect: function(date) { 
          	//alert('You picked ' + date[0].formatDate()); 
          	window.location = 'add_event.html'
          }
      	});
	}
	 
	
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(x < max_fields){ //max input box allowed
		x++; //text box increment
		$(wrapper).append(
		 
		[
			'<div class="input-group mtsm">',
				'<input class=" form-control" type="text" placeholder="" />' ,
				'<div class="input-group-preppend">',
					'<button class="btn btn-primary-reverse remove_field" type="button">-</button>',
				 '</div>',
			'</div>'
		].join('')
		 
		);
		}
	});
		 
	$(wrapper).on("click",".remove_field", function(e){ //user click on remove field
		e.preventDefault(); $(this).closest('.input-group').remove(); x--;
	});

	/// tooltip
	$('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });

	$( '.inputfile' ).fileUpload();



	$('.typeahead').each(function(el, i){
		console.log(this)
		var source = $(this).data('provide');
		console.log(source)
		// $(this).typeahead({
		// 	hint: true,
		//   highlight: true,
		//   minLength: 1
		// },{
		// 	name: 'source',
		// 	source: substringMatcher(source)
		// })
		$(this).typeahead({
			source: source,
			//nameProperty: 'name',
  			//valueField: '#hidden-field',
  			//dataSource: source
		})
	});



	// add class focused to expend search input
	$('.global-search .search_input').on('focus', function(){
		$(this).parent().addClass('focused');
	}).on('blur', function(){
		var $inputVal = $(this).val(); 
		if( !$inputVal.length || $inputVal == '' ){
			$(this).parent().removeClass('focused');
		}
	});

	//// chart at index pages...
	if( $('#projectStatusChart').length ){
		var projectStatusChart = new CanvasJS.Chart("projectStatusChart", {
			animationEnabled: true,
			data: [{
				type: "doughnut",
				startAngle: 60,
				//innerRadius: 60,
				indexLabelFontSize: 12,
				indexLabel: "{label} - #percent%",
				toolTipContent: "<b>{label}:</b> {y} (#percent%)",
				dataPoints: [
					{ y: 67, label: "قبل الوقت", color:'#6FA4EC' },
					{ y: 28, label: "قي الوقت", color:'#0C66E1' },
					{ y: 10, label: "متأخر", color:'#FFBD5B' },
					{ y: 7, label: "متأخر جدا", color:'#bfbfbf'},
					{ y: 15, label: "غير معلوم", color:'#7f7f7f'}
				]
			}]
		});
		projectStatusChart.render();
	}
	


	//// chart at index pages...
	if( $('#projectHigherPerformChart').length ){
		var projectHigherPerformChart = new CanvasJS.Chart("projectHigherPerformChart", {
			animationEnabled: true,
			axisX:{
				minimum: 5,
				maximum: 95
			},
			data: [{
				type:'column',
				dataPoints: [
					{ x: 80, y: 55, color:'#6FA4EC' },
					{ x: 50, y: 72, color:'#0C66E1' },
					{ x: 20, y: 20, color:'#FFBD5B' },
				]
			}]
		});
		projectHigherPerformChart.render();
	}
	
	//$('.charcounter').charCounter(50);
	$('.charcounter').each(function(index, item){
		//var $this = $(this), counter = Number($this.data('chars')), format = $this.data('format');
		$item = $(item), counter = Number($item.data('chars')), format = $item.data('format'); 
		$item.charCounter(counter, { format: format });
	});

});
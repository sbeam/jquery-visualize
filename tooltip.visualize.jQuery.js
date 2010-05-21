/**
 * --------------------------------------------------------------------
 * Tooltip plugin for the jQuery-Plugin "Visualize"
 * Tolltip by Iraê Carvalho, irae@irae.pro.br, http://irae.pro.br/en/
 * Copyright (c) 2010 Iraê Carvalho
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * 	
 * Visualize plugin by Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group, http://www.filamentgroup.com
 *
 * --------------------------------------------------------------------
 */

(function($){
	$.visualizePlugins.push(function visualizeTooltip(options,tableData) {
		//configuration
		var o = $.extend({
			tooltip: false,
			tooltipalign: 'auto', // also available 'left' and 'right'
			tooltipvalign: 'top',
			tooltipclass: 'visualize-tooltip',
			tooltiphtml: function(data){
				return '<p>'+data.point.value+' - '+data.point.yLabels[0]+'</p>'
			},
			delay:false
		},options);
		
		// don't go any further if we are not to show anything
		if(!o.tooltip) {return;}
		
		var self = $(this),
			canvasContain = self.next(),
			tracker = canvasContain.find('.visualize-interaction-tracker');
		
		// IE needs background color and opacity white or the tracker stays behind the tooltip
		tracker.css({
			backgroundColor:'white',
			opacity:0,
			position:'relative',
			zIndex:100
		});
		
		var tooltip = $('<div class="'+o.tooltipclass+'"/>').css({
			position:'absolute',
			display:'none',
			zIndex:90
		});
		
		// Append the tooltip to the canvas container
		canvasContain.append(tooltip);
		
		self.bind('vizualizeOver',function visualizeTooltipOver(e,data){
			var left,right,top,clasRem,clasAd,bottom,x=Math.ceil(data.point.canvasCords[0]),y=Math.ceil(data.point.canvasCords[1]+data.point.offset);
			if(o.tooltipalign == 'left' || ( o.tooltipalign=='auto' && x<=o.width/2 ) ) {
				left = x+'px';
				right = '';
				clasAdd="tooltipleft";
				clasRem="tooltipright";
			} else {
				left = '';
				right = Math.abs(x-o.width)+'px';
				clasAdd="tooltipright";
				clasRem="tooltipleft";
			}
			
			tooltip
				.addClass(clasAdd)
				.removeClass(clasRem)
				.html(o.tooltiphtml(data))
				.css({
					display:'block',
					top: y+'px',
					left: left,
					right: right
				});
		});
		
		self.bind('vizualizeOut',function visualizeTooltipOut(e,data){
			tooltip.css({display:'none'});
		});
		
	});
})(jQuery);
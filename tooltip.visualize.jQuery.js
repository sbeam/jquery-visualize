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
			align: 'auto', // also available 'left' and 'right'
			valign: 'top',
			tooltipclass: 'visualize-tooltip',
			tooltiphtml: function(data){
				return '<p>'+data.point.value+' - '+data.point.yLabels[0]+'</p>'
			},
			delay:false
		},options);
		
		// don't go any further if we are not to show anything
		if(!o.tooltip) {return;}
		
		var self = $(this),
			canvasContain = self.next();
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
			tooltip.css({
				display:'block',
				top: data.point.canvasCords[1]+data.point.offset+'px',
				left: data.point.canvasCords[0]+'px'
			}).html(o.tooltiphtml(data));
		});
		
		self.bind('vizualizeOut',function visualizeTooltipOut(e,data){
			tooltip.css({display:'none'});
		});
		
	});
})(jQuery);
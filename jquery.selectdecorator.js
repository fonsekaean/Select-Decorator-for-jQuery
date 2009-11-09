/*
 * jQuery Select Decorator Plugin v0.0.3
 * http://whynotonline.com/
 *
 * Copyright (c) 2009 Nivanka Fonseka
 * BSD licenses.
 * http://open.whynotonline.com/license/
 * 
 * This plugin is a handy tool which you can use to decorate your HTML select boxes
 * Feel free to use this on your websites, but please leave this message in the files
 * **NOTE: This plugins solution works on every browser
 */

jQuery.fn.selectdecorator = function($options) {
	

	var defaults = {
		DIVClass: 'Select_Decorator_Holder',
		onChange : function(){}
	};
	
	$current = jQuery(this);
	$ID = $current.attr('id');
	jQuery.extend(defaults, $options);
	
	newSelect = '<div>';
	
	newSelect += '<select';
	newSelect += ' name="' + $current.attr('name');
	newSelect += '" id="' + $ID;
	newSelect += '" class="' + $current.attr('class');
	newSelect += '">';
	newSelect += $current.html();	
	newSelect += '</select>';
	newSelect += '<span></span>';
	newSelect += '<ul>';
	jQuery.each($current.find('option'), function(){
		newSelect += '<li val="' + jQuery(this).attr('value') + '">';
		newSelect += jQuery(this).html();
		newSelect += '</li>';
	});
	newSelect += '<ul>';
	newSelect += '</div>';
	
	$decorator = jQuery(newSelect);
	$decorator.addClass(defaults['DIVClass']);
	
	
	$current.parent().append($decorator) ;
	$current.remove();
	
	
	$decorator.find('ul').css('position', 'absolute');
	$decorator.find('ul').css('z-index', '999999');
	$decorator.find('ul').hide();
	$decorator.find('span').css('display', 'block');
	
	$decorator.find('span').bind('click',function(){
			jQuery(this).parent().find('ul').slideDown('fast', function(){				
				jQuery('body').bind('click', function(){
					jQuery(this).parent().find('ul').hide();												  
				});											
			});
		}
	);
	
	$decorator.find('ul>li').bind('click',function(){
		jQuery(this).parent().parent().find('select').val(jQuery(this).attr('val'));											
		jQuery(this).parent().parent().find('span').parent().unbind('click');
		jQuery(this).parent().hide();
		jQuery(this).parent().parent().find('span').html(jQuery(this).html());
		
		if(defaults['onChange'] != null){
			defaults.onChange();	
		}
		
	});
	
	$newSelect = jQuery('#' + $ID);
	
	$newSelect.attr('style', 'opacity:0;position:absolute;top:-3000px;');
	
	$setFlag = 0;
	$newSelect.find('option').each(
		function(){
			if($setFlag == 0){
				$newSelect.parent().find('span').html(jQuery(this).html());	
				$newSelect.val(jQuery(this).val());
				$setFlag = 1;
			}
		}
	);
	
}

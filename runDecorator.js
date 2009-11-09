jQuery.noConflict();

jQuery('document').ready(function(){
	jQuery("#MySelect").selectdecorator(
		{
			DIVClass : "selectholder",
			onChange : function(){
				jQuery('#MySelectVal').html('You selected ' + jQuery("#MySelect").val());		    			
			}	
		}									
	);
	
	jQuery("#MySelect2").selectdecorator(
		{
			DIVClass : "selectholder2"
		}									
	);
	jQuery("#MySelect").bind('change', function(){
		jQuery('#MySelectVal').html("Selected value " + jQuery(this).val());
	})
});
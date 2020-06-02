 jQuery('.coll-filter').on("click",function(){
	var values = [];  
    var d_filters = [];  
      if(jQuery(this).hasClass('coll-filter-producttype')){
		jQuery('.coll-filter-producttype').find('.cf-checkbox').removeClass('active-div');
        jQuery(this).find('.cf-checkbox').addClass('active-div'); 
      }
      else{
        //if($(this).find('.cf-checkbox-tag').prop("checked") == true){
        //}else{
          jQuery(this).find('.cf-checkbox-tag').trigger('click'); 
      //  } 

      } 
      $('.custom_loader').show();   
      var coll_value= jQuery('.coll-filter-producttype').find('.cf-checkbox.active-div').attr('value');
      jQuery('.coll-filter').each(function(){
        var value= jQuery(this).find('.cf-checkbox-tag:checked').attr('value');
        //console.log('neeta '+value);
        var df_val = jQuery(this).data('filter');
        if(values.indexOf(value) === -1) {
          if(value){
            values.push(value);
           // console.log('Go');
          }
        }
        if(value === ''){}
        else{
          if(df_val){
            d_filters.push(df_val);
          }
        }      
      });


      if (typeof coll_value === "undefined") {
        var pathname = window.location.pathname; 
        var data=pathname.split("/");
        var collection=data[2];  
        var coll_value = collection;
        //console.log(url);

      }
//console.log("neeta-1"+coll_value);

      ajaxFilter(values, d_filters, coll_value);

    });


    function ajaxFilter(items, groups, coll_value){
      var array_values = '';
      for( i=0; i<= items.length; i++){
        //console.log('items ' +items);
        //console.log('leangth '+items.length);
        if(items[i] != undefined){  
          if(items.length == 1){
            array_values += items[i]; 
           // console.log('if '+array_values);
            //return false;
          }
          else if(items.length > 1){
            if((i + 1) == (items.length)){
              array_values += items[i] ;
              //console.log('elseif '+array_values);
            }
            else{
              array_values += items[i] + '+' ; 
              //console.log('else '+array_values);
            }
          }
        }
      }

      if(coll_value){
        var url = '/collections/'+coll_value+'/'+ array_values;
	ajaxuploadproduct(url);
      }


    }

    function ajaxuploadproduct(url){
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'html',
        success: function(data){

          var data_values = $(data).find('.custom-product-box').html();
          var pagination = $(data).find('ul.list--inline.pagination').html();
          var product_count = $(data).find('.custom-product-box ul li').length;
          console.log(pagination); 
          if(product_count == 0){
            $('.custom-product-box ul').html("<li class='custom-no-product'>no product</li>"); 
			$('span.filters-toolbar__product-count').html(product_count+' Product'); 
			$('ul.list--inline.pagination').hide();
          }
          else{
            $('.custom-product-box').html(data_values);
			$('span.filters-toolbar__product-count').html(product_count+' Product');
			if (typeof pagination === "undefined") {
              $('ul.list--inline.pagination').hide();
            }
            else{
              $('ul.list--inline.pagination').show();
            }
			StampedFn.reloadUGC();     
          }
          $('.custom_loader').hide();  
        }
      });
    }

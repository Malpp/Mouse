window.addEventListener('load', function(){
	
	var box1 = document.getElementById('box1');
    var statusdiv = document.getElementById('statusdiv');
    var startx = 0;
	var starty = 0;
	var intThing, rclickThing;
	var touchobj;
	var width = $(document).width()*0.85;
	
	function rclick(){
	
		clearInterval(rclickThing);
		
		$.ajax({
				url: "rclick",
				type: "get"
					
			});
	
	}
	
	function calc(){
		
		var x = parseInt(touchobj.clientX) - startx;
		var y = parseInt(touchobj.clientY) - starty;
		
		if( (x != 0 || y != 0)  && ( width < parseInt(touchobj.clientX) ) ){
		
			$.ajax({
				url: "scroll",
				type: "get",
				data:{"y":-y*3}
					
			});
		
		} else if( (x != 0 || y != 0) ){
			
			$.ajax({
				url: "move",
				type: "get",
				data:{"x":x*2,"y":y*2}
					
			});
				
		}
		
		startx = parseInt(touchobj.clientX);
		starty = parseInt(touchobj.clientY);
		
	}
	
	box1.addEventListener('touchstart', function(e){ 
	
		touchobj = e.changedTouches[0];
		
		startx = parseInt(touchobj.clientX);
		
		starty = parseInt(touchobj.clientY);
		
		intThing = setInterval(calc, 50);
		
		rclickThing = setInterval(rclick, 750);
		
		e.preventDefault(); 
	
	});
 
    box1.addEventListener('touchmove', function(e){
		
        touchobj = e.changedTouches[0];
		clearInterval(rclickThing);
		
		e.preventDefault();
		
    }, false)
	
	box1.addEventListener('touchend', function(e){ 
	
		clearInterval(intThing);
		
		e.preventDefault();
		
		clearInterval(rclickThing);
	
	});
	
	box1.addEventListener('touchtap', function(e){
		
        $.ajax({
				url: "click",
				type: "get"
					
			});
		
		e.preventDefault();
		
    }, false)
 
}, false)
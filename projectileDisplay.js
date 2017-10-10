/*
	projectDisplay.js is a module that encapsulates the drawing/display logic for
	showing different projectiles that are fired.
*/

var projectileDisplay = ( function() {
    var allProjectiles = [];
    var displayCanvas;
    var projectileRadius = 2;

    function init(canvas) {
    	displayCanvas = canvas;

	    addClickEvent();
    }

	function reDraw(tick) {
    	var context = canvas.getContext('2d');

    	for (var i=0; i<allProjectiles.length; i++) {
    		var projectile = allProjectiles[i];
	        context.beginPath();
		    context.arc(projectile.x, projectile.y, projectileRadius, 0, 2 * Math.PI, false);
		    context.fillStyle = projectile.colour;
		    context.closePath();
		    context.fill();
		    projectile.updateProjectile(tick);
    	}
	}

	function getRandomColour() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		var colour = "rgb("+r+","+g+","+b+")";

		return colour;
	}

	function addNewProjectile(x, y, bearing, speed, colour) {
		// obtain random speed, height and colour if none of these are specified
		speed = (typeof(speed)!=="number")? Math.random() * 100: speed;
	    bearing = (typeof(bearing)!=="number")? Math.random() * 90: bearing;
	    colour = (typeof(colour)=="undefined")? getRandomColour(): colour;

	    allProjectiles.push(new SimpleProjectile(x, y, bearing, speed, displayCanvas.height, colour))
	}

	function addClickEvent() {
		displayCanvas.addEventListener("click", function(event) {
	   		var x = event.pageX - displayCanvas.offsetLeft;
	   		var y = event.pageY - displayCanvas.offsetTop;

	   		addNewProjectile(x, y);
   		});
	}

	return {
		init: init,
		reDraw: reDraw
	}
})();
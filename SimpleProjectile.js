/*
	SimpleProjectile.js defines a basic projectile with some notion of speed,
	acceleration and position.
*/

function SimpleProjectile(x, y, initialBearing, initialSpeed, floorY, colour) {
	// constants
	this.g = -9.81; // acceleration by gravity
	this.frictionCoef = 0.7;
	// take one pixel to be one metre

	this.x = typeof(x)!=="number"?0:x;
	this.y = typeof(y)!=="number"?0:y;
	this.floorY = typeof(floorY)!=="number"?800:floorY;
	this.initialBearing = typeof(initialBearing)!=="number"?30:initialBearing;
	this.initialSpeed = typeof(initialSpeed)!=="number"?10:initialSpeed;
	this.colour = typeof(colour)!=="string"?"black":colour;
	// only allow positive initial velocities, bearings between 0 - 90 degrees
	if (this.initialBearing<0 || this.initialBearing>90 || this.initialSpeed<0) {
		throw "Initial bearing must lie between 0-90 and initial speed must be positive";
	}

	if (this.floorY<=this.y) {
		throw "Floor y coordinate must be greater than the y coordinate of the projectile being fired";
	}
	this.currentVertSpeed = initialSpeed * Math.sin((initialBearing * Math.PI)/180);
	this.currentHorSpeed = initialSpeed * Math.cos((initialBearing * Math.PI)/180);
	this.vertDirection = 1;
	this.bounced = false; // flag set to true when calling updateProjectile and the ball bounces subsequently
}

SimpleProjectile.prototype.getVerticalSpeed = function(speed, bearing) {
	return speed * Math.sin((bearing * Math.PI)/180);
}

SimpleProjectile.prototype.getHorizontalSpeed = function(speed, bearing) {
	return speed * Math.cos((bearing * Math.PI)/180);
}

SimpleProjectile.prototype.bounce = function() {
	// change initial speed used
	this.currentVertSpeed = this.frictionCoef * this.currentVertSpeed;
	this.currentHorSpeed = this.frictionCoef * this.currentHorSpeed;
	this.bounced = true;
	this.vertDirection = 1;
}

SimpleProjectile.prototype.hitPeak = function() {
	this.vertDirection = -1;
}

// function which updates the projectile on each tick
// elapsedTime parameter should be passed as milliseconds
SimpleProjectile.prototype.updateProjectile = function(elapsedTime) {
	this.bounced = false;

	// bounce this ball if the floor has been hit
	if (this.vertDirection===-1 && this.y>=this.floorY) {
		this.bounce();
		//return;
	}
	elapsedTime = elapsedTime / 1000; // elapsed time in seconds

	// obtain speeds and make adjustments
	var vertSpeed = this.currentVertSpeed;	
		// change initial velocity to negative if the peak has been reached
	if (vertSpeed<=0 && this.vertDirection===1) {
		this.hitPeak();
		//return;
	}
	vertSpeed += this.vertDirection===1? this.g * elapsedTime: Math.abs(this.g * elapsedTime); 		
	var horSpeed = this.currentHorSpeed; 			
	
	// find distance travelled horizontally and vertically in given period
	var vertDistance = vertSpeed * elapsedTime;
	var horDistance = horSpeed * elapsedTime;

	// update position
	this.currentVertSpeed = vertSpeed;
	this.currentHorSpeed = horSpeed;
	this.x += horDistance;
	this.y -= this.vertDirection * vertDistance; // negate displacement for canvas position
}
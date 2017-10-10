/*
    SimpleProjectileTests.js
    Test suite aimed at soley testing the behaviour and functionality of SimpleProjectile.js
*/
describe("Simple Projectile Test Suite",  function() {
	// all values to be accessed in tests here
    var fakeProjectile;
    var x = 50;
    var y= 50;
    var initialBearing = 45;
    var initialSpeed = 10;
    var floorY = 800;

	// setup
    beforeEach(function() {
        fakeProjectile = new SimpleProjectile(x, y, initialBearing, initialSpeed, floorY);
    })

    it ("Constructor should reject bearing below 0", function() {
        expect(function() {
            new SimpleProjectile(x, y, -1, initialSpeed)
        }).toThrow();
    });

    it ("Constructor should reject bearing above 90", function() {
        expect(function() {
            SimpleProjectile(x, y, 91, initialSpeed)
        }).toThrow();
    });

    it ("Constructor should reject speed below 0", function() {
        expect(function() {
            SimpleProjectile(x, y, 30, -1)
        }).toThrow();
    });

    it ("Constructor should revert to defaults if no parameters passed", function() {
        var expectedX = 0, expectedY = 0, expectedFloorY = 800, expectedBearing = 30, 
            expectedSpeed = 10, expectedColour = "black";
        var fakeProjectile = new SimpleProjectile();
        expect(fakeProjectile.x).toBe(expectedX);
        expect(fakeProjectile.y).toBe(expectedY);
        expect(fakeProjectile.initialBearing).toBe(expectedBearing);
        expect(fakeProjectile.initialSpeed).toBe(expectedSpeed);
        expect(fakeProjectile.colour).toBe(expectedColour);
    });

    it ("getVerticalSpeed() should return 1 at 90 degrees", function() {
        var expectedResult = 1;

        var actualResult = fakeProjectile.getVerticalSpeed(1, 90)
 
        expect(actualResult).toBe(expectedResult);
    });

    it ("getHorizontalSpeed() should return 1 at 0 degrees", function() {
        var expectedResult = 1;
 
        var actualResult = fakeProjectile.getHorizontalSpeed(1, 0);
 
        expect(actualResult).toBe(expectedResult);
    });

    it ("hitPeak() should change vertical direction", function() {
        var expectedResult = -1;
        fakeProjectile.hitPeak();

        var actualResult = fakeProjectile.vertDirection;
        
        expect(actualResult).toBe(expectedResult);
    });

    it ("bounce() should change vertical direction and other related properties", function() {
        // expected direction should be upwards
        // expected speeds should  be the same as their initial components in this case
        var expectedDirection = 1, 
            expectedVertSpeed = initialSpeed * Math.sin((initialBearing * Math.PI) / 180) * fakeProjectile.frictionCoef;
            expectedHorSpeed = initialSpeed * Math.cos((initialBearing * Math.PI) / 180) * fakeProjectile.frictionCoef;

        fakeProjectile.bounce();

        var actualDirection = fakeProjectile.vertDirection;
        
        expect(actualDirection).toBe(expectedDirection);
        expect(fakeProjectile.currentVertSpeed).toBe(expectedVertSpeed);
        expect(fakeProjectile.currentHorSpeed).toBe(expectedHorSpeed);
        expect(fakeProjectile.bounced).toBe(true);
    });

    it("updateProjectile() should invoke hitPeak() when vertical speed is 0 and moving upwards", function() {
        fakeProjectile.currentVertSpeed = 0;
        fakeProjectile.vertDirection = 1;
        spyOn(fakeProjectile, "hitPeak");

        fakeProjectile.updateProjectile(10);

        expect(fakeProjectile.hitPeak).toHaveBeenCalled();
    });

    it("updateProjectile() should invoke bounce() when y is level with the floor and moving downwards", function() {
        fakeProjectile.y = floorY;
        fakeProjectile.vertDirection = -1;
        spyOn(fakeProjectile, "bounce");
        fakeProjectile.updateProjectile(10);

        expect(fakeProjectile.bounce).toHaveBeenCalled();
    });

    // this function is mostly used as a sanity check although it has more logic than I would like
    it("updateProjectile() should increase x position over time", function() {
        var time = 100;
        var expectedHorSpeed = initialSpeed * Math.cos((initialBearing * Math.PI) / 180);
        var expectedX = x + (expectedHorSpeed * (time/1000));
            
        fakeProjectile.updateProjectile(time);

        expect(fakeProjectile.x).toBe(expectedX);

    });

    // this function is mostly used as a sanity check although it has more logic than I would like
    it("updateProjectile() should decrease y position initially at high upwards velocity", function() {
        var time = 100;
        var expectedVertSpeed = 100 * Math.sin((initialBearing * Math.PI) / 180);
        expectedVertSpeed -= 9.81 * (time/1000);
        fakeProjectile = new SimpleProjectile(x, y, initialBearing, 100);
        var expectedY = y - (expectedVertSpeed * (time/1000));

        fakeProjectile.updateProjectile(time);

        expect(fakeProjectile.y).toBe(expectedY);
    });

    it("updateProjectile() should increase y position when vertical velocity is 0 and in mid-air", function() {
        var time = 10;
        var expectedVertSpeed = initialSpeed * Math.sin((initialBearing * Math.PI) / 180);
        expectedVertSpeed = 9.81 * (time/1000);
        fakeProjectile.currentVertSpeed = 0;
        fakeProjectile.vertDirection = 1;
        var expectedY = y + (expectedVertSpeed * (time/1000));

        fakeProjectile.updateProjectile(time);

        expect(fakeProjectile.y).toBe(expectedY);
    });
});
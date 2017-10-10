/**
    simpleProjectileTests.js
    Test suite aimed at soley testing the behaviour and functionality of the simpleProjectile.js module
*/
describe("Simple Projectile Test Suite",  function() {
	// all values to be accessed in tests here
    var simpleProjectile;

	//beforeEach define all values to be to their desired values
    beforeEach(function() {
        simpleProjectile = new simpleProjectile();
    })
    //test cases

    it ("getVerticalVelocity() should return 1 at 90 degrees", function() {
        var expectedResult = 1;
        var actualResult = simpleProjectile.getVerticalVelocity(1,90)
        expect(actualResult).toBe(expectedResult);
    });

    it ("getHorizontalVelocity() should return 1 at 0 degrees", function() {
        var expectedResult = 1;
        var actualResult = simpleProjectile.getHorizontalVelocity(1,0);
        expect(actualResult).toBe(expectedResult);
    });

    it("Test for ")
	it("Checks initial position of the projectile", function() {
		expect(function here().ToEqual())
    }
})
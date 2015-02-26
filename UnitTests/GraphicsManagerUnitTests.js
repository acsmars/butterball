QUnit.module("Graphics Manager");

QUnit.test("Scale X Test", function( assert ) {
    var gfx = new GraphicsManager(document.getElementById("cont"), 10, 10, 1000, 1000);
    assert.equal(gfx.testScaleX(1000), 10);
    assert.equal(gfx.testScaleX(500), 5);
    assert.equal(gfx.testScaleX(0), 0);
});

QUnit.test("Scale Y Test", function( assert ) {
    var gfx = new GraphicsManager(document.getElementById("cont"), 10, 20, 1000, 2000);
    assert.equal(gfx.testScaleY(2000), 20);
    assert.equal(gfx.testScaleY(1000), 10);
    assert.equal(gfx.testScaleY(0), 0);
});
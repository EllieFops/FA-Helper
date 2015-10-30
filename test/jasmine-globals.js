/**
 * @param a {string}
 * @param b {Function}
 */
function it(a, b) {}

/**
 * @param v {*}
 */
function expect(v) {}

/**
 * @param v {*}
 */
expect.toBe = function(v) {};
/**
 * @param [v...] {*}
 */
expect.toHaveBeenCalledWith = function(v) {};
expect.toHaveBeenCalled = function() {};

/**
 * @param a {string}
 * @param b {Function}
 */
function describe(a, b) {}

/**
 *
 * @param f {Function}
 */
function beforeEach(f) {}

/**
 * @param o {object}
 * @param n {string}
 */
function spyOn(o, n) {};

function jasmine() {}

/** @param n {string} */
jasmine.createSpy = function(n) {};
/*
    1. Construct a new TestFunc as testFuncObj
    and execute printFunc
 */
var TestFunc = function() {
    this.foo = "constructorRoot";

    var printFunc = function(){
        console.log("printFunc: " + this.foo);
    };

    // returns "undefined"
    printFunc();

    this.printFunc = printFunc;

    // returns "constructorRoot"
    this.printFunc();

    // Negate all use of the "this" keyword within the contructor
    // and return the following value instead.
    // This prevents using "this" with the revealing module pattern!
    /*
    return {
        printFunc: this.printFunc
    };
    */

    // Using a function constructor forces "this" to reset
    // and automatically adds an implicit return this
    return this;
};
var testFuncObj = new TestFunc(); // forget the new keyword and window gets polluted

/*
    2. Contain testFuncObj within an object literal
 */
var mainObj = {
    foo: "mainObjRoot",
    nestedFunc: testFuncObj.printFunc
};

/*
    3. Execute printFunc from multiple sources to prove that "this" is always what's to the right
 */
var main = function ()
{
    // returns "constructorRoot"
    testFuncObj.printFunc();

    // returns "mainObjRoot"
    mainObj.nestedFunc();

    // returns "undefined"
    var windowScopedFunction = mainObj.nestedFunc;
    windowScopedFunction();

    console.log("Value of foo within original testFuncObj: " + testFuncObj.foo);
};
$(document).ready(main);

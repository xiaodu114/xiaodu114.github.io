//  TypeError: Promise resolver undefined is not a function
var p1 = new Promise();

//  TypeError: Promise resolver 666 is not a function
var p2 = new Promise(666);

//  TypeError: Promise resolver <Object> is not a function
var p3 = new Promise({ name: "xiaodu114" });

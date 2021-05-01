let fs = require("fs");
console.log("Before");

// To be written in this way
(async function fn() {
    let frp = fs.promises.readFile("f1.txt");
    console.log("Befor Adding Await");
    let data = await frp;
    console.log("Data -> "+data);
    console.log("After Reading Data");
})();

await fn();

// Not to be used creates confusion
// (async function () {
//     let frp = fs.promises.readFile("f1.txt");
//     console.log("Befor Adding Await");
//     frp.then(function(data){
//         console.log("Data -> "+data);
//         console.log("After Reading Data");
//     })
// })();

console.log("After");
console.log("Other");


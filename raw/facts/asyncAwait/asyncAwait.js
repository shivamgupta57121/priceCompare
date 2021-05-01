let fs = require("fs");
console.log("Before");

// async function fn() {
//     try {
//         let data = await fs.promises.readFile("../f1.txt");
//         console.log("data " + data);
//     } catch (err) {
//         console.log(err);
//     }
// }
// fn();

(async function fn() {
    try {
        let data = await fs.promises.readFile("../f1.txt");
        console.log("data " + data);
    } catch (err) {
        console.log(err);
    }
})();
console.log("After");
console.log("``````````````````````````````");

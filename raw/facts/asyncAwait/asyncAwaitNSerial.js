let fs = require("fs");
let arr = ["../f1.txt","../f2.txt","../f3.txt"];
console.log("Before");
// syntax sugar
async function fn(){
    let data;
    for(let i = 0 ; i < arr.length ; i++){
        
        data = await fs.promises.readFile(arr[i]);
        console.log("i ",i);
        console.log("data "+data);
    }
    
}
fn();
console.log("After");
console.log("``````````````````````````````");

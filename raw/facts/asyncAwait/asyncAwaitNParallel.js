let fs = require("fs").promises;
let arr = ["../f1.txt","../f2.txt","../f3.txt"];
// parallel read but result will be displayed as serial 
// since it will be displayed when all promises are settled
console.log("Before");
(async function fn(){
    let pArr = []; 
    for(let i = 0 ; i < arr.length ; i++){
        let frp = fs.readFile(arr[i]);
        pArr.push(frp);
    }
    let allFilesData = await Promise.all(pArr);
    for(let i = 0 ; i < allFilesData.length ; i++){
        console.log(allFilesData[i] + " ");
    }
})();
console.log("After");
console.log("``````````````````````````````");

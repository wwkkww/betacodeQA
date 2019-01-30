/* 
Given an array [1,4,5,7,12, 19, 45, 101], write a function that returns array that satisfies this condition: x*2 - (5 - x) == even number 
*/

const arr = [1, 4, 5, 7, 12, 19, 45, 101];

const returnArrEven = (arr) => {
    let arrTemp = [];
    arr.forEach((x) => {
        arrTemp.push(x * 2 - (5 - x))
    })
    // console.log(arrTemp); //[ -2, 7, 10, 16, 31, 52, 130, 298 ]

    let evenArr = arrTemp.filter((num) => {
        return num % 2 === 0;
    });

    console.log(evenArr);
}

returnArrEven(arr); //log [ -2, 10, 16, 52, 130, 298 ]
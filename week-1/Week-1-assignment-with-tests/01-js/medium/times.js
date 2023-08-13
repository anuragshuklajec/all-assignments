/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function sum(startIndex,endIndex){
    sum = 0
    for(var i = startIndex ; i <= endIndex ; i++){
        sum+=i ;
    }
    return sum ;
}

function calculateTime(n) {
    startTime = Date.now()
    sum(1,n)
    endTime = Date.now()


    return (endTime - startTime ) / 1000 ;
}

console.log(calculateTime(1000000000))
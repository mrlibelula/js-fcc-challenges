/*
  Sum All Odd Fibonacci Numbers
  Given a positive integer num, return the sum of
  all odd Fibonacci numbers that are less than or 
  equal to num.

  The first two numbers in the Fibonacci sequence 
  are 1 and 1. Every additional number in the sequence 
  is the sum of the two previous numbers. The first six
  numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

  For example, sumFibs(10) should return 10 because all
  odd Fibonacci numbers less than or equal to 10 are
  1, 1, 3, and 5.
*/

/**
 * 
 * @param {number} num 
 * @returns 
 */
function sumFibs(num) {
  if (num <= 0) return 0
  return (n => {
    let fibs = []
    let x = 1
    let y = 0
    let fiboNum = 0

    while (fiboNum <= n) {
      fiboNum % 2 !== 0 ? fibs.push(fiboNum) : ''
      fiboNum = y + x
      x = y
      y = fiboNum
    }

    return fibs.reduce((sum, current) => sum + current)
    
  })(num)
}

console.log(sumFibs(50));
/*
  Sum All Primes
  
  A prime number is a whole number greater than 1
  with exactly two divisors: 1 and itself. For example,
  2 is a prime number because it is only divisible by 1
  and 2. In contrast, 4 is not prime since it is
  divisible by 1, 2 and 4.

  Rewrite sumPrimes so it returns the sum of all prime
  numbers that are less than or equal to num.

  Assertions:
  sumPrimes(10) should return a number.
  sumPrimes(10) should return 17.
  sumPrimes(977) should return 73156.
*/
function sumPrimes(num) {
  if (num <= 1) return 0
  const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false
    return num > 1
  }
  
  let flag = false
  let primes = [2] // loaded with first prime number
  let i = 2 // first prime number

  while (flag === false) {
    i++
    if (isPrime(i)) {
      i <= num ? primes.push(i) : flag = true
    }
  }

  return primes.reduce((sum, num) => sum + num)
}

console.log(sumPrimes(977))
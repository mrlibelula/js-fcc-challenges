/*
  Steamroller

  Flatten a nested array. You must account for
  varying levels of nesting.

  Assertions:

  steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].
  steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].
  steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].
  steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

  Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.
*/

// recursive solution
function steamrollArray(arr) {
  let flattened = []
  arr.forEach(item => {
    Array.isArray(item)
      ? flattened = flattened.concat(steamrollArray(item))
      : flattened.push(item)
  })
  
  return flattened
}

console.log(steamrollArray([1, {}, [3, [[4]]]]))
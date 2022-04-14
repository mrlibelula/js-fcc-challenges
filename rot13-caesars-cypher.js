/*
  Caesars Cipher

  One of the simplest and most widely known ciphers
  is a Caesar cipher, also known as a shift cipher.
  In a shift cipher the meanings of the letters are
  shifted by some set amount.

  A common modern use is the ROT13 cipher, where the
  values of the letters are shifted by 13 places.
  Thus A ↔ N, B ↔ O and so on.

  Write a function which takes a ROT13 encoded string as
  input and returns a decoded string.

  All letters will be uppercase. Do not transform any
  non-alphabetic character (i.e. spaces, punctuation),
  but do pass them on.

  Assertions:

  rot13("SERR PBQR PNZC") should decode to the string FREE CODE CAMP
  rot13("SERR CVMMN!") should decode to the string FREE PIZZA!
  rot13("SERR YBIR?") should decode to the string FREE LOVE?
  rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to the string THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
*/
function rot13(str) {
  let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(ltr => ltr.toUpperCase())
  console.log(alphabet)
  let arr = str.split('')
  let decodedIndexes = []
  arr.forEach(letter => {
    if (/[\W\d_]/.test(letter)) {
      decodedIndexes.push(letter)
    } else {
      let index = (alphabet.findIndex(i => i === letter)) - 13
      if (index < 0) index += 26
      decodedIndexes.push(alphabet[index])
    }
  })
  
  return decodedIndexes.join('')
}
//console.log(rot13("SERR PBQR PNZC"))
console.log(rot13("PNEN QR BEGB!"))
//console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."))
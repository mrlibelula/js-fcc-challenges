/*
  Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

  spinalCase("This Is Spinal Tap") should return the string this-is-spinal-tap
  spinalCase("thisIsSpinalTap") should return the string this-is-spinal-tap
  spinalCase("The_Andy_Griffith_Show") should return the string the-andy-griffith-show
  spinalCase("Teletubbies say Eh-oh") should return the string teletubbies-say-eh-oh
  spinalCase("AllThe-small Things") should return the string all-the-small-things    
*/
function spinalCase(str, separator = '-') {
  let words = str.split(/[\s\-\_]/g)
  let final_words = []

  const upperSearch = words.map(word => {
    const findCapital = word.split(/(?=[A-Z])/)
    return findCapital.length > 1 
      ? findCapital.map(word => word.toLowerCase()) 
      : [word.toLowerCase()]
  })

  upperSearch.forEach(wordArray => {
    final_words.push(...wordArray)
  })

  return final_words.join(separator)
}

let result = spinalCase('thisIsASpinalTap_case made in-js')

console.log(result);
// Given a string, print the index of first non-repeating character from it. If not present, print -1.
// example:- acciojoba
// output:- 3

// hashing

//iterating a loop storing values.
//iterating return the character.

function firstNonRepeatingChar(str) {
  const obj = new Map();

  for (let char of str) {
    obj[char] = (obj[char] || 0) + 1;
  }

  console.log(obj);
  for (let char of str) {
    if (obj[char] == 1) {
      return char;
    }
  }
  return -1;
}

console.log(firstNonRepeatingChar("acciojoba"));
//Time Complexity : O(n)
//Space Compilexity : O(n)

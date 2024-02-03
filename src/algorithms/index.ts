const removeIdenticalLetters = (str: string): string => {
  // Start with an empty string to store the result
  let result: string = "";
  // Initialize variables to track the current letter and its count
  let currentLetter: string = "";
  let count: number = 0;

  // Iterate through each letter of the word
  for (const char of str) {
    // If the current letter is the same as the previous one, increment the count
    if (char === currentLetter) {
      count++;
    } else {
      // If the current letter is different from the previous one,
      // append the previous letter to the result (if count is less than 3)
      if (count < 3) {
        result += currentLetter.repeat(count + 1);
      } else {
        // If count is 3 or more, append the letter only once to avoid four consecutive letters
        result += currentLetter.repeat(3);
      }
      // Update the current letter and reset the count for the new letter
      currentLetter = char;
      count = 0;
    }
  }

  // Append the last letter to the result (if count is less than 3)
  if (count < 3) {
    result += currentLetter.repeat(count + 1);
  } else {
    result += currentLetter.repeat(3);
  }

  return result;
};

const maximumOddSum = (numArr: number[]): number => {
  // Initialize accumulator to be the smallest possible number. If no odd numbers are found, the funktion should return 0
  const initialValue: number = 0;
  
  // Sorts the array of numbers in descending order to get the largest number first
  const sortedArray: number[] = numArr.sort((a: number, b: number): number => b - a);  

  // Use the reduce method to find the largest odd sum
  return sortedArray.reduce((accumulator, currentValue: number): any => {
    // Calculate the sum of the first element in the array and the current element
    const sum: number = sortedArray[0] + currentValue;
    
    // If the sum is odd and greater than the current value of accumulator, update accumulator
    if(sum % 2 !== 0 && sum > accumulator) {
      accumulator = sum;
    }
    return accumulator;
  }, initialValue);
};

export {
  removeIdenticalLetters,
  maximumOddSum
}; 

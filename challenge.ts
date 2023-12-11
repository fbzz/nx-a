//https://stackblitz.com/edit/typescript-counting-sets-rperqu?file=README.md,index.ts
//I will use while here, but It can be made with for too.
function countSetsOfThree(numbers: number[], threshold: number): number {
  let validSets: any = [];
  let pointer = 0;

  //First where going to iterate on all the array
  while (pointer < numbers.length) {
    let secondPointer = pointer + 1;
    //After that we use the second pointer to store the second number
    while (secondPointer < numbers.length) {
      let thirdPointer = secondPointer + 1;
      //The third pointer floats on the remaining items of the array
      while (thirdPointer < numbers.length) {
        if (
          numbers[pointer] + numbers[secondPointer] + numbers[thirdPointer] <=
          threshold
        ) {
          //I can count inside, but I think its better to save it for displaying for now
          validSets.push([
            numbers[pointer],
            numbers[secondPointer],
            numbers[thirdPointer],
          ]);
        }
        thirdPointer++;
      }
      secondPointer++;
    }
    pointer++;
  }
  return validSets.length;
}

append(`countSetsOfThree([1,2,3,4], 7)`, countSetsOfThree([1, 2, 3, 4], 7), 2);
append(`countSetsOfThree([4,1,3,2], 7)`, countSetsOfThree([4, 1, 3, 2], 7), 2);
append(`countSetsOfThree([1,2,3,9], 7)`, countSetsOfThree([1, 2, 3, 9], 7), 1);
append(`countSetsOfThree([2,2,2,2], 7)`, countSetsOfThree([2, 2, 2, 2], 7), 4);
append(`countSetsOfThree([3,3,3,3], 7)`, countSetsOfThree([3, 3, 3, 3], 7), 0);
append(
  `countSetsOfThree([1,2,3,4,5], 7)`,
  countSetsOfThree([1, 2, 3, 4, 5], 7),
  2
);
append(`countSetsOfThree([1,2], 7)`, countSetsOfThree([1, 2], 7), 0);

function append(description: string, actual: number, expected: number) {
  const item = document.createElement("div");
  item.textContent = `${description}. Expected: ${expected}. Actual: ${actual}.`;
  document.querySelector("#results").append(item);
}

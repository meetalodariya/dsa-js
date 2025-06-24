import { quickSort, swap } from "../Sorting/5.1%20quicksort.js.js";

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let i = nums.length - 1;

  while (i > 0) {
    if (nums[i] > nums[i - 1]) {
      quickSort(nums, i, nums.length - 1);

      for (let j = i; j < nums.length; j++) {
        if (nums[j] > nums[i - 1]) {
          swap(nums, j, i - 1);
          return;
        }
      }
    }
    i--;
  }

  quickSort(nums);
};

const input = [
  100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
  81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63,
  62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44,
  43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25,
  24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4,
  3, 2, 1,
];

[9,3,1,2,4,5,6]

nextPermutation(input);

console.log(input);

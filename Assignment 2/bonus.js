const findKthPositive = function (arr, k) {
  for (let i = 1; ; i++) {
    let found = false;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === i) {
        found = true;
        break;
      }
    }

    if (!found) {
      k--;
      if (k === 0) {
        return i;
      }
    }
  }
};

console.log(findKthPositive([2, 3, 4, 7, 11], 5));

export const toOrdinalSuffix = (num) => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? ordinals[digits[0] - 1]
    : ordinals[3];
};

// export const nextRaceDateFinder = (data) => {
//   const dates = data.dates.map(date => new Date(date)).sort((a, b) => a - b);
//   const currentDate = new Date();
//   console.log(dates)
//   let closestDate = null;
//   for (let i = dates.length - 1; i >= 0; i--) {
//     if (dates[i] <= currentDate) {
//       closestDate = dates[i];
//       break;
//     }
//   }
//   return closestDate;
// };

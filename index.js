var finances = [
  ['Jan-2010', 867884],
  ['Feb-2010', 984655],
  ['Mar-2010', 322013],
  ['Apr-2010', -69417],
  ['May-2010', 310503],
  ['Jun-2010', 522857],
  ['Jul-2010', 1033096],
  ['Aug-2010', 604885],
  ['Sep-2010', -216386],
  ['Oct-2010', 477532],
  ['Nov-2010', 893810],
  ['Dec-2010', -80353],
  ['Jan-2011', 779806],
  ['Feb-2011', -335203],
  ['Mar-2011', 697845],
  ['Apr-2011', 793163],
  ['May-2011', 485070],
  ['Jun-2011', 584122],
  ['Jul-2011', 62729],
  ['Aug-2011', 668179],
  ['Sep-2011', 899906],
  ['Oct-2011', 834719],
  ['Nov-2011', 132003],
  ['Dec-2011', 309978],
  ['Jan-2012', -755566],
  ['Feb-2012', 1170593],
  ['Mar-2012', 252788],
  ['Apr-2012', 1151518],
  ['May-2012', 817256],
  ['Jun-2012', 570757],
  ['Jul-2012', 506702],
  ['Aug-2012', -1022534],
  ['Sep-2012', 475062],
  ['Oct-2012', 779976],
  ['Nov-2012', 144175],
  ['Dec-2012', 542494],
  ['Jan-2013', 359333],
  ['Feb-2013', 321469],
  ['Mar-2013', 67780],
  ['Apr-2013', 471435],
  ['May-2013', 565603],
  ['Jun-2013', 872480],
  ['Jul-2013', 789480],
  ['Aug-2013', 999942],
  ['Sep-2013', -1196225],
  ['Oct-2013', 268997],
  ['Nov-2013', -687986],
  ['Dec-2013', 1150461],
  ['Jan-2014', 682458],
  ['Feb-2014', 617856],
  ['Mar-2014', 824098],
  ['Apr-2014', 581943],
  ['May-2014', 132864],
  ['Jun-2014', 448062],
  ['Jul-2014', 689161],
  ['Aug-2014', 800701],
  ['Sep-2014', 1166643],
  ['Oct-2014', 947333],
  ['Nov-2014', 578668],
  ['Dec-2014', 988505],
  ['Jan-2015', 1139715],
  ['Feb-2015', 1029471],
  ['Mar-2015', 687533],
  ['Apr-2015', -524626],
  ['May-2015', 158620],
  ['Jun-2015', 87795],
  ['Jul-2015', 423389],
  ['Aug-2015', 840723],
  ['Sep-2015', 568529],
  ['Oct-2015', 332067],
  ['Nov-2015', 989499],
  ['Dec-2015', 778237],
  ['Jan-2016', 650000],
  ['Feb-2016', -1100387],
  ['Mar-2016', -174946],
  ['Apr-2016', 757143],
  ['May-2016', 445709],
  ['Jun-2016', 712961],
  ['Jul-2016', -1163797],
  ['Aug-2016', 569899],
  ['Sep-2016', 768450],
  ['Oct-2016', 102685],
  ['Nov-2016', 795914],
  ['Dec-2016', 60988],
  ['Jan-2017', 138230],
  ['Feb-2017', 671099],
];

console.log('Financial Analysis');
console.log('----------------------------');

// Total months
let totalMonths = finances.length;
console.log(`Total Months: ${totalMonths}`);

// The net total amount of Profit/Losses over the entire period.
// https://www.tutorialspoint.com/how-to-sum-all-elements-in-a-nested-array-javascript
// https://www.quora.com/What-is-the-best-algorithm-to-sum-numbers-in-nested-arrays
let totalNetSum = 0;
function calculateSum(finances) {
  for (var i = 0; i < totalMonths; i++) {
    if (typeof finances[i] === 'number') {
      totalNetSum += finances[i];

      // recursive function to iterate from nested elements too
    } else if (Array.isArray(finances[i])) {
      calculateSum(finances[i]);
    }
  }
}
calculateSum(finances);
console.log(`Total: £${totalNetSum}`);

// The average of the **changes** in Profit/Losses over the entire period.
let differences = [];

// start with i = 1 to start comparison from the second month
for (let i = 1; i < totalMonths; i++) {
  let difference = finances[i][1] - finances[i - 1][1];
  // append the number to the differences array
  differences.push(difference);
}

// for loop to calculate sum of differences
let differenceSum = 0;
for (let value of differences) {
  differenceSum += value;
}
// Array.reduce method
// https://bobbyhadz.com/blog/javascript-get-sum-of-array-of-numbers
// let differenceSum = differences.reduce((accumulator, value) => {
//   return accumulator + value;
// }, 0);

// https://bobbyhadz.com/blog/javascript-round-number-to-nearest-hundred
// Round to nearest 100
function roundToNearest100(num) {
  return Math.round(num / 100) * 100;
}

let averageChange = roundToNearest100(differenceSum / totalMonths);
console.log(`Average Change: £${averageChange}`);

// The greatest increase in profits (date and amount) over the entire period.
// https://bobbyhadz.com/blog/javascript-get-index-of-max-value-in-array
// use Array.reduce method
const profitIncrease = finances.reduce(
  (max, entry) => {
    // access the second element in array to check for max value
    if (entry[1] > max.value) {
      //
      return { value: entry[1], string: entry[0] };
    }
    return max;
  },
  // object containing value and string
  { value: -Infinity, string: '' }
);

console.log(
  `Greatest Increase in Profits ${profitIncrease.string} (£${profitIncrease.value})`
);

// The greatest decrease in losses (date and amount) over the entire period.
// Same as profitIncrease method, but opposite
const profitLoss = finances.reduce(
  (min, entry) => {
    // access the second element in array to check for max value
    if (entry[1] < min.value) {
      // return the number and then string in an object
      return { value: entry[1], string: entry[0] };
    }
    return min;
  },
  // default values for object
  { value: Infinity, string: '' }
);
console.log(
  `Greatest Decrease in Profits ${profitLoss.string} (£${profitLoss.value})`
);
// ==========================================================
// EXTRAS: display data on the page

// get time period from calculating date difference of first element in array to the last
// https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript
let firstMonth = new Date(finances[0][0]);
let lastMonth = new Date(finances[finances.length - 1][0]);
const timeFrame = lastMonth.getTime() - firstMonth.getTime();
// convert timeFrame from milliseconds to months
const timeFrameinMonths = timeFrame / (1000 * 60 * 60 * 24 * (365 / 12));
const years = Math.floor(timeFrameinMonths / 12);
// get the remainder from division
const months = Math.floor(timeFrameinMonths % 12);

// display number as currency: src https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
const totalMonthsHTML = document.getElementById('totalMonths');
totalMonthsHTML.innerHTML = `${years} year${
  years === 1 ? '' : 's'
}, ${months} month${months === 1 ? '' : 's'}`;
const totalNetSumHTML = document.getElementById('totalNetSum');
totalNetSumHTML.innerHTML = totalNetSum.toLocaleString(undefined, {
  style: 'currency',
  currency: 'GBP',
});
const averageChangeHTML = document.getElementById('averageChange');
averageChangeHTML.innerHTML = averageChange.toLocaleString(undefined, {
  style: 'currency',
  currency: 'GBP',
});
const profitIncreaseMonthHTML = document.getElementById('profitIncreaseMonth');
profitIncreaseMonthHTML.innerHTML = profitIncrease.string;
const profitIncreaseAmountHTML = document.getElementById(
  'profitIncreaseAmount'
);
profitIncreaseAmountHTML.innerHTML =
  ' (' +
  profitIncrease.value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'GBP',
  }) +
  ')';
const profitLossMonthHTML = document.getElementById('profitLossMonth');
profitLossMonthHTML.innerHTML = profitLoss.string;
const profitLossAmountHTML = document.getElementById('profitLossAmount');
profitLossAmountHTML.innerHTML =
  ' (' +
  profitLoss.value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'GBP',
  }) +
  ')';

// Substract header and footer height from main height to fit everything within 100vh.
let main = document.querySelector('main');
let header = document.querySelector('header').clientHeight;
let footer = document.querySelector('footer').clientHeight;
main.style.height = `calc(100vh - (${header}px + ${footer}px))`;
// ==========================================================

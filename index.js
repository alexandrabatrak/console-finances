/**
 *  Console Finances
 *  @author Alexandra Batrak
 *
 *  To find:
 *    - Total months
 *    - Total net sum
 *    - Average of changes for the whole period
 *    - Highest profits increase and decrease over the period
 *
 *  All methods are tested thoroughly and in good working order.
 *  I wanted to find different possible solutions, so I can learn different methods to do the same thing.
 *  During this exercise, I obtained knowledge of
 *    - array methods like: reduce, slice, push, typeof, indexOf
 *    - for...of loop iterations toLocale method
 *
 *  According to the testing done by scr https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/ and other resources 'for loop'
 *  or 'for...of' loop are better for performance.
 *  The best method will depend on specific case and size of the array - in this application array is small,
 *  so performance wouldn't make much difference, but for larger arrays 'for' or 'for...of' loops seem to be a
 *  better solution rather than using a high-order function whose perfomance slows down as the size of the array increases.
 *
 *  (p.s. Comments format for 'Better Comments' extension styling. Due to a lot of commenting for code, all text comments are marked // //
 *  Headings and subheading are * and **.)
 */
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

console.log(`Financial Analysis \n----------------------------`);

// *Total months
let totalMonths = finances.length;
console.log(`Total Months: ${totalMonths}`);

// *The net total amount of Profit/Losses over the entire period.*
let totalNetSum = 0;
// **METHOD 1: FOR LOOP*
// //example: better performance, more code
// function calculateSum(finances) {
//   for (let i = 0; i < totalMonths; i++) {
//     if (typeof finances[i] === 'number') {
//       totalNetSum += finances[i];

// // recursive function to iterate from nested elements too
//     } else if (Array.isArray(finances[i])) {
//       calculateSum(finances[i]);
//     }
//   }
// }

// **METHOD 1.1: FOR...OF LOOP*
// function calculateSum(finances) {
//   for (let amount of finances) {
//     if (typeof amount === 'number') {
//       totalNetSum += amount;
//     } else if (Array.isArray(amount)) {
//       calculateSum(amount);
//     }
//   }
// }
// calculateSum(finances);

// **METHOD 2: REDUCE*
// // example: minimal code, better if performance not critical
totalNetSum = finances.reduce((accumulator, value) => {
  // // add the second element in the array
  return accumulator + value[1];
}, 0);

console.log(`Total: £${totalNetSum}`);

// *The average of the **changes** in Profit/Losses over the entire period.*
let differences = [];

// **METHOD 1: FOR LOOP*
// // start with i = 1 to start comparison from the second month
for (let i = 1; i < totalMonths; i++) {
  let difference = finances[i][1] - finances[i - 1][1];
  differences.push(difference);
}

// **METHOD 2: SLICE AND MAP*
// // start from the second element in slice
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
// differences = finances
//   .slice(1)
// //iterative map method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//   .map((element, index) => element[1] - finances[index][1]);

// *Calculate the sum of differences*
// **METHOD 1: FOR LOOP*
// differenceSum = 0;
// for (i = 0; i < differences.lenght; i++) {
//   differenceSum += differences[i];
// }
// **METHOD 1.1: FOR...OF LOOP*
// differenceSum = 0;
// for (let value of differences) {
//   differenceSum += value;
// }

// let averageChange = differenceSum / (totalMonths - 1);

// **METHOD 2: REDUCE*
// // Get averageChange in one go with array.reduce
let averageChange =
  differences.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0) /
  (totalMonths - 1);
// // toFixed to round it up to the nearst 100th
console.log(`Average Change: £${averageChange.toFixed(2)}`);

// *The greatest increase and decrease in profits (date and amount) over the entire period.*
// // define variables (because I'm using multiple methods and it's easier to test them this way, and also minimise redeclaring them for each method)
let profitGain;
let profitLoss;
let profitGainMonth;
let profitLossMonth;

// **METHOD 1: REDUCE*
// profitGain = differences.reduce((accumulator, value) => Math.max(accumulator, value));
// profitLoss = differences.reduce((accumulator, value) => Math.min(accumulator, value));
// **METHOD 2: MATH.MAX & INDEXOF*
// profitGain = Math.max(...differences);
// profitLoss = Math.min(...differences);
// // SAME FOR BOTH METHODS
// // 2 arrays essentially have same position of elements, but differences is 1 less, as we skip January. So, adding +1 lets access the index of the nested array inside the finances that is corresponding to the max number in differences array
// let profitGainMonth = finances[differences.indexOf(profitGain) + 1][0];
// let profitLossMonth = finances[differences.indexOf(profitLoss) + 1][0];

// // Initialise value for loops starting at the first element in differences array
profitGain = differences[0];
profitLoss = differences[0];
// **METHOD 3: FOR LOOP*
// for (let i = 0; i < differences.length; i++) {
//   if (profitGain < differences[i]) {
//     profitGain = differences[i];
//     // get the month from finances array, i+1 since we skip the first month
//     profitGainMonth = finances[i + 1][0];
//   }
//   if (profitLoss > differences[i]) {
//     profitLoss = differences[i];
//     profitLossMonth = finances[i + 1][0];
//   }
// }
// **METHOD 3.1: FOR...OF*
for (let difference of differences) {
  if (profitGain < difference) {
    profitGain = difference;
    profitGainMonth = finances[differences.indexOf(difference) + 1][0];
  }
  if (profitLoss > difference) {
    profitLoss = difference;
    profitLossMonth = finances[differences.indexOf(difference) + 1][0];
  }
}

console.log(`Greatest Gain in Profits: ${profitGainMonth} (£${profitGain})`);
console.log(`Greatest Decrease in Profits ${profitLossMonth} (£${profitLoss})`);
// ==========================================================
// *EXTRAS: display data on the page*

// // get time period from calculating date difference of first element in array to the last
let firstMonth = new Date(finances[0][0]);
let lastMonth = new Date(finances[finances.length - 1][0]);
const timeFrame = lastMonth.getTime() - firstMonth.getTime();
// // convert timeFrame from milliseconds to months
const timeFrameinMonths = timeFrame / (1000 * 60 * 60 * 24 * (365 / 12));
const years = Math.floor(timeFrameinMonths / 12);
// // get the remainder from division
const months = Math.floor(timeFrameinMonths % 12);

const totalMonthsHTML = document.getElementById('totalMonths');
totalMonthsHTML.innerHTML = `${years} year${
  years === 1 ? '' : 's'
}, ${months} month${months === 1 ? '' : 's'}`;

// // get all elements
const totalNetSumHTML = document.getElementById('totalNetSum');
const averageChangeHTML = document.getElementById('averageChange');
const profitGainMonthHTML = document.getElementById('profitGainMonth');
const profitGainAmountHTML = document.getElementById('profitGainAmount');
const profitLossMonthHTML = document.getElementById('profitLossMonth');
const profitLossAmountHTML = document.getElementById('profitLossAmount');
// // apply month values
profitGainMonthHTML.innerHTML = profitGainMonth;
profitLossMonthHTML.innerHTML = profitLossMonth;

// // Loop to display number as currency with toLocaleString
const html = [
  totalNetSumHTML,
  averageChangeHTML,
  profitGainAmountHTML,
  profitLossAmountHTML,
];
const values = [totalNetSum, averageChange, profitGain, profitLoss];

// // undefined for user's pre-set locale
// // + apply brackets only for increase/decrease
for (let i = 0; i < html.length; i++) {
  html[i].innerHTML = ` ${
    values[i] === profitGain || values[i] === profitLoss ? '(' : ''
  }${values[i].toLocaleString(undefined, {
    style: 'currency',
    currency: 'GBP',
  })}${values[i] === profitGain || values[i] === profitLoss ? ')' : ''}`;
}

// // Substract header and footer height from main height to fit everything within 100vh.
let main = document.querySelector('main');
let header = document.querySelector('header').clientHeight;
let footer = document.querySelector('footer').clientHeight;
main.style.height = `calc(100vh - (${header}px + ${footer}px))`;
// ==========================================================

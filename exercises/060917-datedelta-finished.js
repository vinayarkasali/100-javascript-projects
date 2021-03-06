/*
 * Return a date interval as a human-friendly string
 *
 * Given two Dates, this function returns a string like '2 days ago' or '10
 * minutes from now' that represents the most significant unit of the time
 * delta from the first date to the second.
 *
 * If the first date is omitted, the current date and time will be used instead.
 *
 * @param {Date} [start=now] - the start of the time range
 * @param {Date} end - the end of the time range
 *
 * @returns {String} A string quantifying the range in terms of its most
 *   significant unit ('2 hours ago', e.g.)
 */
function getTimeDelta(start, end) {

  var dateDelta = 0;

  // if no start date is given fall back to start date being date.now
  var startDate = new Date(start);
  var endDate = new Date(end);



  // we know there's a delta here (even if it's 0) - in milliseconds
  // check to see if it's less than 1000 (aka 1 seconds)
  // if less than 1000 (1 second), use this delta
  // if greater than 1000 (aka more than 1 second), convert to seconds
  // then check to see if it's less than (seconds in a minute)... etc

  // array of objects conversionFactor: 1000, unit: ms, conversionFactor: 60, unit: s
  // check newelapsed (in whatever unit) vs conversionfactor

  const conversions = [
    { cf: 1000, toUnit: 'second' },
    { cf: 60, toUnit: 'minute' },
    { cf: 60, toUnit: 'hour' },
    { cf: 24, toUnit: 'day' },
    { cf: 30, toUnit: 'month' },
    { cf: 12, toUnit: 'year' }
  ];


    // take elapsed time
    var elapsed = endDate - startDate; // returns a number in ms
    // console.log('the original elapsed time is ' + elapsed + ' in ms');
    // check if elapsed is pos/neg
    var tense = " ";

    if (elapsed > 0) {
        // positive - end date is later than start date ("from")
        tense = " since " + startDate;
    } else if (elapsed < 0) {
        // negative - end date is before start date so in the past ("ago")
        tense = " ago";
    } else {
        // if actually 0
    }

    // now convert elapsed to absolute value, since we know above if it's pos/neg
    elapsed = Math.abs(elapsed);

    var delta = 0;
    var i = 0;

    // iterate over conversions
    for (; i<conversions.length; i++) {
        // check elapsed time against cf
        if (elapsed < conversions[i].cf) {
            // if it's less, this is your delta
            break; // stop executing
            // here, i will be whichever spot in the conversions array we stop it - but the units will be off by one (i will always be "up to" the unit listed in that spot in the array, if the i here is 0, the unit is sec but it's actually ms because it's the unit we are converting TO)
        }

        // if it's more, convert to next unit
        // and check again
        elapsed = elapsed / conversions[i].cf;
    }

    // remove remainder
    elapsed = Math.floor(elapsed);

    var actualUnits = 'millisecond'; // default value of units
    if (i > 0) {
        actualUnits = conversions[i-1].toUnit;
    }
    // pluralize actualUnits if greater than 1
    if (elapsed > 1) {
        actualUnits = actualUnits + 's';
    }

    console.log(tense + elapsed + ' ' +  actualUnits + '.');

}

getTimeDelta();

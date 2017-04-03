// Jan 1st 1970 00:00:00 am
var moment = require('moment');       

var date = moment();
date.add(1,'year');
console.log(date.format('Do MMMM, YYYY h:mm a'));
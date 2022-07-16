const moment = require("moment");

const date = (date) => {
   return moment(date).format('L');
}

const time = (time) => {
    return moment(time).format('HH:mm');
 }

export {date, time};
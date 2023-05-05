const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream('./debug.log', {flags : 'w'});
const log_stdout = process.stdout;

/*console.log = function(d) { 
  //To shto nuzhno mne logiruet v file         log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};*/

function notifCheck(){
    // пример времени в докторских слотах "2022-01-01T01:00:00"
    const userDate = new Date(doctors.slots[j].time)
    const timeDiff = Math.abs(currentDate - userDate) / 36e5;
    if (timeDiff === 1) {
        log_file.write(util.format(`${currentDate} | Привет ${user.name} ! Вам через 2 часа к ${ doctors[i].spec } в ${ doctors.slots[j].time }!` + '\n'));
    }else if(timeDiff === 24) {
        log_file.write(util.format(`${currentDate} | Привет ${user.name} ! Напоминаем что вы записаны к ${ doctors[i].spec } завтра ${ doctors.slots[j].time }!`) + '\n');
    }
}

module.exports = notifCheck
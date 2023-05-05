const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream('./debug.log', {flags : 'w'});

function notifCheck(user,doctors){
    const currentDate = new Date();
    for(let i=0;i<doctors.length;i++){
    	for(let j=0;j<doctors[i].slots.length;j++){
            // пример времени в докторских слотах "2022-01-01T01:00:00"
            const userDate = new Date(doctors[i].slots[j].time)
            const timeDiff = Math.abs(currentDate - userDate) / 36e5;
            if (timeDiff === 2) {
                log_file.write(util.format(`${currentDate} | Привет ${user.name} ! Вам через 2 часа к ${ doctors[i].spec } в ${ doctors[i].slots[j].time }!` + '\n'));
            }else if(timeDiff === 24) {
                log_file.write(util.format(`${currentDate} | Привет ${user.name} ! Напоминаем что вы записаны к ${ doctors[i].spec } завтра на ${ doctors[i].slots[j].time }!`) + '\n');
            }
        }
    }
}

module.exports = notifCheck
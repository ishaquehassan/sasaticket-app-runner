const moment = require('moment');
const fs = require('fs');
const args = require('args-parser')(process.argv);



async function main()  {
    try {
        const timestamp = moment().format('Y-MMM-DD HH:mm:A');
        const file = fs.writeFileSync('date.txt', timestamp)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
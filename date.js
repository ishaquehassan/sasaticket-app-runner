const moment = require('moment');
const fs = require('fs');

async function main()  {
    try {
        const timestamp = moment().format('Y-MMM-DD HH:mm:ss:A');
        fs.writeFileSync('date.txt', timestamp);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
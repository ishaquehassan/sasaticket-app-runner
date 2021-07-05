const moment = require('moment');
const args = require('args-parser')(process.argv);


async function main()  {
    try {
        console.log(args);
        //
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
const fs = require('fs');

const drive = require('./drive')

async function main()  {
    try {
        const timestamp = fs.readFileSync('date.txt', 'utf8')
        const dir = await drive.getFolderByName('sastaticket');
        const rootId = dir.data.files[0].id
        const subDir = await drive.getFolderByName(timestamp);
        if (!subDir.data.files.length) {
            await drive.createDir(timestamp, rootId)
        } 

        console.log(timestamp, "folder created")
        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
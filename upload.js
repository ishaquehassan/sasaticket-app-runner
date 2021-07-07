const fs = require('fs');
const args = require('args-parser')(process.argv);

const drive = require('./drive')

async function main()  {
    try {
        const timestamp = fs.readFileSync('date.txt', 'utf8');
        const dir = await drive.getFolderByName('sastaticket');
        const rootId = dir.data.files[0].id
        const subDir = await drive.getFolderByName(timestamp);
        let subDirId
        if (!subDir.data.files.length) {
            const resp = await drive.createDir(timestamp, rootId)
            subDirId = resp.data.id
        } else {
            subDirId = subDir.data.files[0].id
        }
        const nameChunks = args.file.split('/')
        const mimeType = 'application/vnd.android.package-archive';
        await drive.ins.files.create({
            requestBody: {
                mimeType,
                name: nameChunks[nameChunks.length-1],
                parents: [subDirId],
            },
            media: {
                mimeType,
                body: fs.createReadStream(args.file)
            }
        })
        console.log(args.file, "Uploaded")
        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()
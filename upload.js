const {google} = require('googleapis');
const fs = require('fs');
const args = require('args-parser')(process.argv);

const auth = new google.auth.GoogleAuth({
  keyFile: './service-key.json',
  scopes: [
      'https://www.googleapis.com/auth/drive'
    ],
});

const drive = google.drive({
    version: 'v3',
    auth,
});

async function main()  {
    try {
        const timestamp = fs.readFileSync('date.txt', 'utf8')

        const dir = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.folder' and name='sastaticket'",
        })
        const rootId = dir.data.files[0].id
        const subDir = await drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${timestamp}'`,
            // driveId: rootId,
        })
        let subDirId
        if (!subDir.data.files.length) {
            const resp = await drive.files.create({
                fields: 'id',
                requestBody: {
                    parents: [rootId],
                    name: timestamp,
                    mimeType: 'application/vnd.google-apps.folder'
                }
            })
            subDirId = resp.data.id
        } else {
            subDirId = subDir.data.files[0].id
        }
        const nameChunks = args.file.split('/')

        await drive.files.create({
            requestBody: { 
                parents: [subDirId],
                name: nameChunks[nameChunks.length-1],
                mimeType: 'application/vnd.android.package-archive'
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
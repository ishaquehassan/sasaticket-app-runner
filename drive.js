const {google} = require('googleapis');

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

async function createDir(name, parentId) {
    return drive.files.create({
        fields: 'id',
        requestBody: {
            parents: [parentId],
            name: name,
            mimeType: 'application/vnd.google-apps.folder'
        }
    });
}

async function getFolderByName(name) {
    return drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and name='${name}'`,
    });
    
}

module.exports = {
    ins: drive,
    createDir,
    getFolderByName,
};
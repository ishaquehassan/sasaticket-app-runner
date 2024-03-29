const nodemailer = require('nodemailer');
const args = require('args-parser')(process.argv);
const drive = require('./drive');
const fs = require('fs');


async function main(){
    try {
        const timestamp = fs.readFileSync('date.txt', 'utf8');
        const dir = await drive.getFolderByName(timestamp);
        const url = dir.data.files[0].webViewLink
        var smtpTransport = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: args.user,
                pass: args.key,
            }
        });
        var mailOptions = {
            to: args.to, 
            from: args.from,
            subject: "Sastaticket.pk release builds [Github Actions]",
            text: `Android release builds uploaded to drive successfully.\n\nGoogle drive link: ${url}\n\nsent via SendInBlue SMTP server.\n\nThis is an automated generated email, Please do not reply. Contact via slack for quick response`,
        }
        await smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log(response);
            }
        });
    } catch (error) {
        console.error(error);   
    }
}
main()
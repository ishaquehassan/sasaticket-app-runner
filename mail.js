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
            subject: "Github Action Runner: SUCCESS",
            text: `Build uploaded to drive successfully.\n\nlink: ${url}\n\nsend via SendInBlue SMPTP`,
        }
        await smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                process.exit(1)
                console.log(error);
            }else{
                process.exit()
                console.log(response);
            }
        });
    } catch (error) {
        process.exit(1)
        console.error(error);   
    }
}

main()
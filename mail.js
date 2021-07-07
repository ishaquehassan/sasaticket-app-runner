const nodemailer = require('nodemailer');
const args = require('args-parser')(process.argv);
const drive = require('./drive');
const fs = require('fs');


async function main(){
    try {
        const configs = JSON.parse(args.configs);
        // const timestamp = "2021-Jul-07 11:58:AM";
        const timestamp = fs.readFileSync('date.txt', 'utf8');
        const dir = await drive.getFolderByName(timestamp);
        // console.log(dir.data.files[0]);
        const url = dir.data.files[0].webViewLink
        // return url
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: args.user,
                pass: args.password,
            }
        });
        var mailOptions = {
            to: configs.to, 
            from: configs.from,
            subject: "Github Action Runner: SUCCESS",
            text: `Build uploaded to drive successfully.\n\nlink: ${url}`,
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
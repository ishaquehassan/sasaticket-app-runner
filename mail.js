const nodemailer = require('nodemailer');

async function main(){
    try {
        var name = "Hamza";
        var from = "hiqbal@voxlabs.io";
        var message = "req.body.message";
        var to = 'hackerhgl@gmail.com';
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "hiqbal@voxlabs.io",
                // pass: "lmaohamza"
                pass: "rcsenjkxuhoeoimf"
            }
        });
        var mailOptions = {
            from: from,
            to: to, 
            subject: name+' | new message !',
            text: message
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
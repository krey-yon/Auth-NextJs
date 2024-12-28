import nodemailer from 'nodemailer';
import bcrpyt from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async({email, emailType, userId} : any) =>{
    try {
        //create a hashed token
        console.log(userId);
        const hashedToken = await bcrpyt.hash(userId.toString(), 12);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpires: Date.now() + 3600000});
        }else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordExpires: Date.now() + 3600000});
        }

        //create a transporter
        // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
        }
    });

    const MailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: emailType === "VERIFY" ? `<h1>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email</h1>` : `<h1>Click <a href="http://localhost:3000/reset/${hashedToken}">here</a> to reset your password. Your token is ${hashedToken}</h1>`
    };

    const mailResponse = await transport.sendMail(MailOptions);
    return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}
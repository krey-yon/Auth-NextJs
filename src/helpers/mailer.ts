import nodemailer from 'nodemailer';
import bcrpyt from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async ({email, emailType, userId} : any){
    try {
        //create a hashed token
        const hashedToken = await bcrpyt.hash(userId, 12);
    } catch (error : any) {
        throw new Error(error.message);
    }
}
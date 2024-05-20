import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from 'src/config';

@Injectable()
export class EmailService {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                type: "OAuth2",
                user: config.mailer.gmailUser,
                clientId: config.mailer.gmailClientId,
                clientSc: config.mailer.gmailClientSecret,
                refreshToken: config.mailer.gmailRefreshToken,
            },
        });
    }

    async sendEmail(from: string, subject: string, text: string) {
        const mailOptions = {
            from: from,
            to: config.mailer.adminEmail,
            subject: subject,
            text: text,
        };
        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error.message);
            throw new InternalServerErrorException('Failed to send email');
        }
    }


}

import * as dotenv from 'dotenv';

dotenv.config();

export default {
    mailer: {
        gmailUser: process.env.GMAIL_OAUTH_USER,
        gmailClientId: process.env.CLIENT_ID,
        gmailClientSecret: process.env.CLIENT_SECRET,
        gmailRefreshToken: process.env.REFRESH_TOKEN,
        adminEmail: process.env.DESTINATION
    }
}
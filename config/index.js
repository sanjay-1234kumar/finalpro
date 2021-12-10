import dotenv from 'dotenv';

dotenv.config();


export const {
    APP_PORT,
    DB_URL,
    AUTH_SECRET,
    REFRESH_SECRET,
    APP_URL,
    API_KEY
}=process.env;



const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU85NkQrWHIwaEpER0l2aUxHUE1hY3MxaHA4Ny9UYytLNzdVZ0IzQjJHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1FFT3NJWDVaZGZ0ZXovSk9oWkhDWUMwS00zWEM0cXBIcXN1L1pSVkVDZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQVlRVDFMYVVTbmhqNjZicXJkRno0eWdyWlZSbnZXOVhtRWdZYm9iWTE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKVUVJaGtZWXJaY3JUbFA5ODRyN1JkdUR3TkkyeWszajdSRVhDWlZQd3d3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVNZGt2Z1pwQ0VLR05qcEg5NXhOaDR1aDNzbWxIU2IzRWY3T20vK0dlR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVsYVkzanFtcmY5L3JZQU4vaEppS1BWK21NaTUrY2tZR2I3cGdJaTZxbDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVBybG55VWhWOVZXRXBLVkdkdDBneTFsUDc4bU83ZVNxc3duNFhoVStrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlByVllxWXZZdEF4UThNRU9wZ3A3NnkxQmh4a2RxOGdDSSswZ3hKSUtTMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZlVzZLREFBRTY1VXl0Nm44TU1UQ1U2VjdZS0xuSkM3eVF2b0Q2N3JPaDloYm9wSE5tUkpGZzI4RmNxTTBtd0lralhoc2cwbFVmS0hKL2JTdnNvaWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6IkxpNWdPK0hHSVFDdXZlMjVjVEtFcmRLMHVEZFFsYlZ4L0ZXWWF3YXA0NVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJocHNWbWhWUW1XRGpkbWw4Y21LR0EiLCJwaG9uZUlkIjoiYWNhYTg3YjgtNDczMi00YjJjLWFjNTgtMWEwYWQ1N2EwNWM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii8wMkpIb1R3TUE3end1cTNzVURqTHdrSzk3az0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJncmRGQnNLaUJvc2pvMWgrNW1wajJReTh1a009In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNENOREVaNjEiLCJtZSI6eyJpZCI6IjIzNDgxMzMyODYxODE6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTm8gTmFtZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0hobmpZUXJLUGRzZ1lZQkNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaVBPZVZscFJWTlRyTG5nVnVJQ2FjTEtVMUdSTlRIM0VUb3BCMjVtT3ZHUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoialJKMEhUVnVDaWkyK243YkUwaTZPWXJOSFY0OUUvb2VYL2t2bldvc1FjS2RSTnQ0aVBBeHJxSmFUVTd2aDNobnVoUVVCTC9TY0l3Rm5Rb3Zha3p5Q1E9PSIsImRldmljZVNpZ25hdHVyZSI6IlR2T1VkdXNhNEJoRUluVE10V2RMZjA4cWhDYU1vTENaelhNeDlsVE1pK05QSmJhNHdTT3Y2QW9pdmo5dkFEWTAzcjByU3NxK3liUWJXeW9vWG5ZbmpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEzMzI4NjE4MToxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZanpubFphVVZUVTZ5NTRGYmlBbW5DeWxOUmtUVXg5eEU2S1FkdVpqcnhrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE2OTk4NTg1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVB5ayJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348133286181", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

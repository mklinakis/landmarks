require('dotenv').config();
const path = require('path');
const dirname = path.resolve();
const {MONGODB_URI, APP_ID, MASTER_KEY, SERVER_URL} = process.env;


const config = {
    databaseURI: MONGODB_URI,
    cloud: dirname + '/cloud/main.js',
    appId: APP_ID,
    masterKey: MASTER_KEY, 
    serverURL: SERVER_URL , 
};




module.exports = {config}
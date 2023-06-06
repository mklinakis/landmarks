require('dotenv').config();
const {APP_ID, MASTER_KEY, SERVER_URL} = process.env;


const config = {

    "apps": [
        {
        "serverURL": SERVER_URL,
        "appId": APP_ID,
        "masterKey": MASTER_KEY,
        "appName": "LandMarks"
        }
    ]
}

module.exports = {config}
require('dotenv').config()
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const app = require('./app');
const {SERVER_PORT,PARSE_MOUNT} = process.env
const serverConfiguration = require('./config/parseServerConfig').config
const dashboardConfiguration = require('./config/parseDashboardConfig').config


//Pass dashboard configuration
const dashboard = new ParseDashboard(dashboardConfiguration);

//Pass dashboard configuration
const server = new ParseServer(serverConfiguration);

//Mount path
const mountPath = PARSE_MOUNT;

//Start dashboard and Parse server on same port
(async function () {
    await server.start();
    app.use(mountPath, server.app);
    app.use('/dashboard', dashboard)
})();
   

app.listen(SERVER_PORT, () => {
console.log(`Listening on port ${SERVER_PORT}`);
});
  


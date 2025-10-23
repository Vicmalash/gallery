require('dotenv').config({ quiet: true, inject: {} });

var config = {};

const { MONGO_USERNAME: username, MONGO_PASSWORD: password, MONGO_CLUSTER: cluster, APP_VALUE: app_value,MONGO_DB: prod, MONGO_DB_DEV: dev, MONGO_DB_TEST:test} = process.env;

config.mongoURI = {
    production: `mongodb+srv://${username}:${password}@${cluster}/${prod}?retryWrites=true&w=majority&appName=${app_value}`,
    development: `mongodb+srv://${username}:${password}@${cluster}/${dev}?retryWrites=true&w=majority&appName=${app_value}`,
    test: `mongodb+srv://${username}:${password}@${cluster}/${test}?retryWrites=true&w=majority&appName=${app_value}`,

    }
module.exports = config;

var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: `mongodb+srv://victormalanga_db_user:2EXfHWwBwNTSRrBX@devops.xxons9o.mongodb.net/darkroom?retryWrites=true&w=majority&appName=devops`,
    development: `mongodb+srv://victormalanga_db_user:2EXfHWwBwNTSRrBX@devops.xxons9o.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=devops`,
    test: `mongodb+srv://victormalanga_db_user:2EXfHWwBwNTSRrBX@devops.xxons9o.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=devops`,
}
module.exports = config;

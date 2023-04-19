const fs = require("fs");

const configFile = "config.json";

function loadConfig() {
    if (fs.existsSync(configFile)) {
        return JSON.parse(fs.readFileSync(configFile));
    }
    return {};
}

function saveConfig(config) {
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

module.exports = {
    loadConfig,
    saveConfig,
};
const configCommand = {
    name: 'config',
    describe: 'Configure chatgpt',
    builder: {
        'api-key': {
            type: 'string',
            description: 'Your OpenAI API key',
        },
        'org-id': {
            type: 'string',
            description: 'Your OpenAI organization ID',
        }
    },
    handler: (argv) => {
        const { saveConfig } = require('../config');
        const { encrypt } = require('../security');

        let config = {};

        if (argv.apiKey) {
            config.apiKey = encrypt(argv.apiKey);
            saveConfig(config);
            console.log("API key saved.");
        } else {
            console.error("Error: Please provide an API key.");
        }
    },
}

module.exports = configCommand;
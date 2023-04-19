
let openai = undefined;

const promptCommand = {
    name: 'prompt',
    describe: 'Send a prompt to ChatGPT',
    builder: {
        engine: {
            alias: 'e',
            type: 'string',
            description: 'ChatGPT engine to use',
            default: 'text-davinci-002',
        },
        text: {
            alias: 't',
            type: 'string',
            description: 'Text prompt for ChatGPT',
            demandOption: true,
        },
        'max-tokens': {
            alias: 'm',
            type: 'number',
            description: 'Maximum number of tokens in the response',
            default: 50,
        },
        temperature: {
            alias: 'temp',
            type: 'number',
            description: 'Temperature for controlling the creativity of the response',
            default: 0.8,
        },
        n: {
            type: 'number',
            description: 'Number of responses to generate',
            default: 1,
        },
        stop: {
            type: 'string',
            description: 'Stop sequence(s) for the API',
        },
        echo: {
            type: 'boolean',
            description: 'Echo the input prompt with the output',
            default: false,
        },
    },
    handler: async (argv) => {

        const { OpenAIApi } = require("openai");
        const { loadConfig } = require('../config');
        const { decrypt } = require('../security');
        const config = loadConfig();

        console.log('loadconfig', config, decrypt(config.apiKey));
        if (!config.apiKey) {
            console.error("Error: API key not found. Please run 'chatgpt config --api-key <your-api-key>' to set it up.");
            return;
        }

        if (!openai) {
            openai = new OpenAIApi({
                apiKey: decrypt(config.apiKey),
            });
            console.log(openai.configuration, openai)
        }


        try {
            const response = await openai.createCompletion({
                engine: argv.engine,
                prompt: argv.text,
                max_tokens: argv.maxTokens,
                n: argv.n,
                stop: argv.stop,
                temperature: argv.temperature,
            });

            response.choices.forEach((choice, index) => {
                console.log(`Response ${index + 1}:`);
                if (argv.echo) {
                    console.log(`Input: ${argv.text}`);
                }
                console.log(choice.text);
                console.log("------------");
            });
        } catch (error) {
            console.error(error.message);
        }
    },
}

module.exports = promptCommand;
function addCustomCommands(filePath) {
    const fs = require('fs');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }

        let customCommands;

        try {
            customCommands = JSON.parse(data);
        } catch (error) {
            console.error(`Error parsing JSON data: ${error}`);
            return;
        }

        if (Array.isArray(customCommands)) {
            const yargs = require('yargs');
            customCommands.forEach((command) => {
                yargs.command(command);
            });
            yargs.parse().help();
            console.log('Custom commands added successfully');
        } else {
            console.error('Invalid custom commands format. Expected an array of command objects.');
        }
    });
}


const addCommand = {
    name: 'add',
    describe: 'Add custom commands provided by the user from a file',
    builder: {
        file: {
            description: 'Path to the file containing the list of custom commands',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => {
        console.log(`Adding custom commands from file: ${argv.file}`);
        addCustomCommands(argv.file);
    },
};

module.exports = addCommand;




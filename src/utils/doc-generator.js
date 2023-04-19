const { execSync } = require('child_process');
const fs = require('fs');
const commands = require('../commands');

function generateOptionsTable(optionsNames, optionsValues) {
    if (optionsNames.length === 0) {
        return 'No options available for this command.';
    }

    const header = '| Option | Alias | Description | Type | Default | Required |';
    const separator = '| ------ | ----- | ----------- | ---- | ------- | -------- |';

    const rows = optionsValues.map((option, index) => {
        const name = optionsNames[index];
        const {
            alias = '',
            description,
            type,
            default: defaultValue = '',
            demandOption = false,
        } = option;
        return `| --${name} | -${alias} | ${description} | ${type} | ${defaultValue} | ${demandOption ? 'Yes' : 'No'} |`;
    });

    return `${header}\n${separator}\n${rows.join('\n')}`;
}


function captureHelpOutput(command) {
    try {
        const output = execSync(`${command} --help`, { encoding: 'utf-8' });
        return output;
    } catch (error) {
        console.error(`Error capturing help output for command "${command}":`, error.message);
        return '';
    }
}

const mainHelpOutput = captureHelpOutput('chatgpt');

let readmeContent = `
# ChatGPT CLI

${mainHelpOutput}
`;

commands.forEach((command) => {
    const optionsTable = generateOptionsTable(command.builder ? Object.keys(command.builder) : [], command.builder ? Object.values(command.builder) : []);
    readmeContent += `
## ${command.name.charAt(0).toUpperCase() + command.name.slice(1)} Command - ${command.describe}

### Options

${optionsTable}
`;
});

fs.writeFileSync('README.md', readmeContent);
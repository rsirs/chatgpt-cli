#!/usr/bin/env node

const yargs = require('yargs');
const commands = require('../commands');

(commands || []).forEach((command) => {
    yargs.command(command.name, command.describe, command.builder, command.handler);
});

yargs
    .scriptName('chatgpt')
    .usage('$0 <cmd> [args]')
    .help()
    .demandCommand(1, 'Please provide a valid command.')
    .strict()
    .argv;
const addCommand = require("./add");
const configCommand = require("./config");
const promptCommand = require("./prompt");

const commands = [configCommand, promptCommand, addCommand];

module.exports = commands;
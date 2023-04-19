# ChatGPT CLI

# Installing

To install chatgpt cli either do `npm install` or `npm link` to use it.

# Usage

chatgpt <cmd> [args]

Commands:
chatgpt config Configure chatgpt
chatgpt prompt Send a prompt to ChatGPT
chatgpt add Add custom commands provided by the user from a file

Options:
--version Show version number [boolean]
--help Show help [boolean]

## Config Command - Configure chatgpt

### Options

| Option    | Alias | Description                 | Type   | Default | Required |
| --------- | ----- | --------------------------- | ------ | ------- | -------- |
| --api-key | -     | Your OpenAI API key         | string |         | No       |
| --org-id  | -     | Your OpenAI organization ID | string |         | No       |

## Prompt Command - Send a prompt to ChatGPT

### Options

| Option        | Alias | Description                                                | Type    | Default          | Required |
| ------------- | ----- | ---------------------------------------------------------- | ------- | ---------------- | -------- |
| --engine      | -e    | ChatGPT engine to use                                      | string  | text-davinci-002 | No       |
| --text        | -t    | Text prompt for ChatGPT                                    | string  |                  | Yes      |
| --max-tokens  | -m    | Maximum number of tokens in the response                   | number  | 50               | No       |
| --temperature | -temp | Temperature for controlling the creativity of the response | number  | 0.8              | No       |
| --n           | -     | Number of responses to generate                            | number  | 1                | No       |
| --stop        | -     | Stop sequence(s) for the API                               | string  |                  | No       |
| --echo        | -     | Echo the input prompt with the output                      | boolean | false            | No       |

## Add Command - Add custom commands provided by the user from a file

### Options

| Option | Alias | Description                                             | Type   | Default | Required |
| ------ | ----- | ------------------------------------------------------- | ------ | ------- | -------- |
| --file | -     | Path to the file containing the list of custom commands | string |         | Yes      |

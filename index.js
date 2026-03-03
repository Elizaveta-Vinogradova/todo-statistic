const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function skipWhile(str, predicate){
    let result = [];
    let skipping = true;
    for (let i = 0; i <= str.length; i++) {
        if(!skipping || !predicate(str[i]))
            skipping = false;
        if(skipping)
            continue;
        result.push(str[i]);
    }
    return result.join("");
}

function isWhitespace(c) {
    return c === ' ' || c === 't';
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            const lines = getFiles().flatMap((line) => line.split('//')).flatMap((line) => line.split('\r\n'));
            let noWhitespaces = lines.map(t => skipWhile(t, isWhitespace));
            console.log(noWhitespaces);
            let filtered = noWhitespaces.filter(t => t.startsWith('TODO '));
            console.log('ANSWEER');
            console.log(filtered);
            break;
        case 'important':
            console.log(getFiles());
            break;
        default:
            const splitLine = command.split(' ');
            const commandNew = splitLine[0];
            const value = splitLine[1];
            switch (commandNew) {
                case 'user':
                    break;
                case 'sort':
                    switch(value){
                        case 'importance':
                            break;
                        case 'user':
                            break;
                        case 'date':
                            break;
                        default:
                            console.log('invalid argument');
                            break;
                    }
                    break;

            }
            break;
    }
}

// TODO you can do it!

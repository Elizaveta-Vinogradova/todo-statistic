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

function countOf(str, char) {
    return str.split("").filter(x => x === char).length;
}

function isWhitespace(c) {
    return c === ' ' || c === 't';
}

function getTODO(){
    const lines = getFiles()
        .flatMap((line) => line.split('//'))
        .flatMap((line) => line.split('\r\n'));
    let noWhitespaces = lines.map(t => skipWhile(t, isWhitespace));
    let filtered = noWhitespaces.filter(t => t.startsWith('TODO '));
    return filtered;
}

function getMetadata(todoStr) {
    const parts = todoStr.split(';');
    if(parts.length === 1) {
        return {
            user : "",
            date : "",
            message : parts[0].split(' ')[1],
            original: todoStr
        };
    }
    const user = parts[0].split(' ')[1];
    const date = Date.parse(parts[1]);
    const message = parts[2];
    return {
        user : user,
        date : date,
        message : message,
        original: todoStr
    }
}

function parseDate(str){
    const date = str.split('-').map(t => parseInt(t));
    console.log(date);
    if (date.length === 1){
        console.log(date[0]);
        return new Date(date[0], 0, 2);
    }
    if (date.length === 2){
        return new Date(date[0], date[1] - 1, 2);
    }
    return new Date(date[0], date[1] - 1, date[2] + 1);
}

function processCommand(command) {
    console.log(parseDate('2018-03-02'));
    console.log(parseDate('2018-03'));
    console.log(parseDate('2018'));
    console.log(parseDate('2028'));
    const list = getTODO();
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(list);
            break;
        case 'important':
            const result = list.filter(t => t.includes('!'));
            console.log(result);
            break;
        default:
            const splitLine = command.split(' ');
            const commandNew = splitLine[0];
            const value = splitLine[1];
            switch (commandNew) {
                case 'user':
                    const user = value;
                    const users = list.filter(t => t.startsWith(`TODO ${user}`));
                    console.log(users);
                    break;
                case 'sort':
                    switch(value){
                        case 'importance':
                            const result = list.sort((a, b) => - countOf(a, '!') + countOf(b, '!'))
                            console.log(result);
                            break;
                        case 'user':
                            const metadata = list
                                .map(getMetadata)
                                .sort((a, b) => a.user > b.user)
                                .map(m => m.original);
                            console.log(metadata);
                            break;
                        case 'date':
                            const metadata2 = list
                                .map(getMetadata)
                                .sort((a, b) => - a.date + b.date)
                                .map(m => m.original);
                            console.log(metadata2);
                            break;
                        default:
                            console.log('invalid argument');
                            break;
                    }
                    break;
                case 'date':
                    const date = '';

            }
            break;
    }
}

// TODO you can do it!

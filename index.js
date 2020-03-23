const fs = require('fs');

const readFile = (file = '.env') => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '', err => {
            if (err) {
                console.log(`Can't create file ${file}`);
                return;
            }
        })
    }
    const source = fs.readFileSync(file);
    return source;
};

const parseFile = (source = '') => {
    const res = {};
    source.toString().split('\n').filter(line => Boolean(line)).map(line => {
        const [key, value] = line.split('=').map(part => part.trim());
        res[key] = value;
    });
    return res;
};

const read = file => {
    const source = readFile(file);
    return parseFile(source);
};

const writeFile = (fileData = [], file = '.env') => {
    try {
        fs.writeFileSync(file, Object.entries(fileData).map(line => line.join('=')).join('\n'), );
        return true;
    } catch (err) {
        return err;
    }
};

const write = (key, value, file) => {
    const fileData = read(file);
    fileData[key] = value;
    return writeFile(fileData, file);
};

module.exports = {
    read,
    write,
};

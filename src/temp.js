import fs from 'fs';
// import { cwd } from 'process';
import path from 'path';

const getFileData = (filepath) => {
    const absoluteFilePath = path.isAbsolute(filepath) ? filepath : path.resolve(filepath);
    const file = fs.readFileSync(absoluteFilePath, 'utf-8');
    return JSON.parse(file);
};

const someTempFunction = (filepath1, filepath2) => {
    const data1 = getFileData(filepath1);
    const data2 = getFileData(filepath2);
    console.log(data1);
    console.log(data2);
};
export default someTempFunction;

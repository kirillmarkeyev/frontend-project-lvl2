import yaml from 'js-yaml';
import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getFileExtension = (filepath) => path.extname(filepath);

const getFileData = (filepath) => {
  const absoluteFilePath = path.isAbsolute(filepath)
    ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absoluteFilePath, 'utf-8');
  const extension = getFileExtension(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
      return yaml.load(file);
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error(`Sorry! File extension: ${extension} is not supported in this version.`);
  }
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      acc.push(`  + ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      acc.push(`  - ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      acc.push(`  - ${key}: ${data1[key]}`);
      acc.push(`  + ${key}: ${data2[key]}`);
    } else {
      acc.push(`    ${key}: ${data1[key]}`);
    }
    return acc;
  }, []);

  return `{\n${result.join('\n')}\n}`;
};
export default genDiff;

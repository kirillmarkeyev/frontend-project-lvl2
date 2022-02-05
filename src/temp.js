/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getFileData = (filepath) => {
  const absoluteFilePath = path.isAbsolute(filepath)
    ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absoluteFilePath, 'utf-8');
  return JSON.parse(file);
};

const someTempFunction = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = [];
  for (const key of keys) {
    if (!_.has(data1, key)) {
      result.push(`  + ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`  - ${key}: ${data1[key]}`);
      result.push(`  + ${key}: ${data2[key]}`);
    } else {
      result.push(`    ${key}: ${data1[key]}`);
    }
  }

  return `{\n${result.join('\n')}\n}`;
};
export default someTempFunction;

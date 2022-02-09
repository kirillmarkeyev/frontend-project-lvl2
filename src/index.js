import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import getParsedFile from './parsers.js';
import stylish from './formatters/stylish.js';

const getFileData = (filepath) => {
  const absoluteFilePath = path.isAbsolute(filepath)
    ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absoluteFilePath, 'utf-8');
  const result = getParsedFile(filepath, file);
  return result;
};

// const getIndent = (depth, count = 4) => ' '.repeat(depth * count - 2);

const getDiffTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: getDiffTree(value1, value2),
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        removedValue: value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        addedValue: value2,
      };
    }
    if (_.has(data1, key) && _.has(data2, key) && (value1 !== value2)) {
      return {
        key,
        type: 'changed',
        removedValue: value1,
        addedValue: value2,
      };
    }
    return {
      key,
      type: 'unchanged',
      unchangedValue: value1,
    };
  });

  return diffTree;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const diffTree = getDiffTree(data1, data2);
  const formattedDiffTree = stylish(diffTree);

  return formattedDiffTree;
};

export default genDiff;

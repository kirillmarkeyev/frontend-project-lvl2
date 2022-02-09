import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import getParsedFile from './parsers.js';

const getFileData = (filepath) => {
  const absoluteFilePath = path.isAbsolute(filepath)
    ? filepath : path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absoluteFilePath, 'utf-8');
  const result = getParsedFile(filepath, file);
  return result;
};

const getIndent = (depth, count = 4) => ' '.repeat(depth * count - 2);

const getDiffTree = (tree1, tree2) => {
  const added = '+ ';
  const deleted = '- ';
  const unchanged = '  ';

  const iter = (data1, data2, depth) => {
    const indent = getIndent(depth);
    const bracket = `${indent}  `;

    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const keys = _.sortBy(_.union(keys1, keys2));

    const diffTree = keys.flatMap((key) => {
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        if (!_.has(data1, key)) {
          return `${indent}${added}${key}: {\n${iter(data1[key], data2[key], depth + 1)}\n${bracket}}`;
        }
        if (!_.has(data2, key)) {
          return `${indent}${deleted}${key}: {\n${iter(data1[key], data2[key], depth + 1)}\n${bracket}}`;
        }
        if (_.has(data1, key) && _.has(data2, key)) {
          return `${indent}${unchanged}${key}: {\n${iter(data1[key], data2[key], depth + 1)}\n${bracket}}`;
        }
      }

      if (!_.has(data1, key)) {
        return `${indent}${added}${key}: ${data2[key]}`;
      }

      if (!_.has(data2, key)) {
        return `${indent}${deleted}${key}: ${data1[key]}`;
      }

      if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
        return `${indent}${deleted}${key}: ${data1[key]}\n${indent}${added}${key}: ${data2[key]}`;
      }

      return `${indent}${unchanged}${key}: ${data1[key]}`;
    });

    return diffTree.join('\n');
  };
  const tree = iter(tree1, tree2, 1);

  return `{\n${tree}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const result = getDiffTree(data1, data2);

  return result;
};

export default genDiff;

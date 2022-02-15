import fs from 'fs';
import process from 'process';
import path from 'path';
import getParsedFile from './parsers.js';
import getDiffTree from './diffTree.js';
import getFormattedDiffTree from './formatters/index.js';

const getFileData = (filepath) => {
  const absoluteFilePath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(absoluteFilePath, 'utf-8');
  return file;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getFileData(filepath1);
  const file2 = getFileData(filepath2);

  const data1 = getParsedFile(filepath1, file1);
  const data2 = getParsedFile(filepath2, file2);

  const diffTree = getDiffTree(data1, data2);
  const formattedDiffTree = getFormattedDiffTree(diffTree, formatName);

  return formattedDiffTree;
};

export default genDiff;

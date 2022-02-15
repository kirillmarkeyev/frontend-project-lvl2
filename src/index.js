import fs from 'fs';
import process from 'process';
import path from 'path';
import getParsedData from './parsers.js';
import getDiffTree from './diffTree.js';
import getFormattedDiffTree from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (filepath) => {
  const absoluteFilePath = getAbsolutePath(filepath);
  return fs.readFileSync(absoluteFilePath, 'utf-8');
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getParsedData(getFileFormat(filepath1), getFileData(filepath1));
  const data2 = getParsedData(getFileFormat(filepath2), getFileData(filepath2));

  const diffTree = getDiffTree(data1, data2);

  const formattedDiffTree = getFormattedDiffTree(diffTree, formatName);

  return formattedDiffTree;
};

export default genDiff;

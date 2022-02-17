import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testCases = [
  ['json', 'stylish'],
  ['yaml', 'stylish'],
  ['json', 'plain'],
  ['yaml', 'plain'],
  ['json', 'json'],
  ['yaml', 'json'],
];

test.each(testCases)('%# check diff for two %s files (output - %s)', (format, output) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  const receivedResult = genDiff(filepath1, filepath2, `${output}`);
  const expectedResult = readFile(`${output}.txt`);
  expect(receivedResult).toEqual(expectedResult);
});

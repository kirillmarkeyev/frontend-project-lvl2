import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check diff for two plain json files', () => {
  const filepath1 = getFixturePath('file1Plain.json');
  const filepath2 = getFixturePath('file2Plain.json');
  const receivedResult = genDiff(filepath1, filepath2);
  const expectedResult = readFile('expectedPlain.txt');
  expect(receivedResult).toEqual(expectedResult);
});

test('check diff for two plain yaml files', () => {
  const filepath1 = getFixturePath('file1Plain.yml');
  const filepath2 = getFixturePath('file2Plain.yaml');
  const receivedResult = genDiff(filepath1, filepath2);
  const expectedResult = readFile('expectedPlain.txt');
  expect(receivedResult).toEqual(expectedResult);
});

test('check diff for two nested json files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const receivedResult = genDiff(filepath1, filepath2);
  const expectedResult = readFile('expected.txt');
  expect(receivedResult).toEqual(expectedResult);
});

// test('check diff for two nested yaml files', () => {
//   const filepath1 = getFixturePath('file1.yaml');
//   const filepath2 = getFixturePath('file2.yaml');
//   const receivedResult = genDiff(filepath1, filepath2);
//   const expectedResult = readFile('expected.txt');
//   expect(receivedResult).toEqual(expectedResult);
// });

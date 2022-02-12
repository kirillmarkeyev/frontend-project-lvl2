import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('#1 check diff for two json files (stylish)', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const receivedResult = genDiff(filepath1, filepath2, 'stylish');
  const expectedResult = readFile('stylish.txt');
  expect(receivedResult).toEqual(expectedResult);
  expect(typeof receivedResult).toBe('string');
});

test('#2 check diff for two yaml files (stylish)', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const receivedResult = genDiff(filepath1, filepath2, 'stylish');
  const expectedResult = readFile('stylish.txt');
  expect(receivedResult).toEqual(expectedResult);
  expect(typeof receivedResult).toBe('string');
});

test('#3 check diff for two json files (plain)', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const receivedResult = genDiff(filepath1, filepath2, 'plain');
  const expectedResult = readFile('plain.txt');
  expect(receivedResult).toEqual(expectedResult);
  expect(typeof receivedResult).toBe('string');
});

test('#4 check diff for two yaml files (plain)', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const receivedResult = genDiff(filepath1, filepath2, 'plain');
  const expectedResult = readFile('plain.txt');
  expect(receivedResult).toEqual(expectedResult);
  expect(typeof receivedResult).toBe('string');
});

#!/usr/bin/env node

import { Command } from 'commander';
import someTempFunction from '../src/temp.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    someTempFunction(filepath1, filepath2);
  });

program.parse(process.argv);

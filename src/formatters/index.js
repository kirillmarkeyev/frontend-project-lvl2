import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormattedDiffTree = (diffTree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      throw new Error(`Sorry! Format: ${format} is not supported in this version.`);
  }
};

export default getFormattedDiffTree;

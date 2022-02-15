import _ from 'lodash';

const spacesCount = 4;
const getIndent = (depth) => ' '.repeat(depth * spacesCount - 2);

// https://ru.hexlet.io/challenges/js_trees_stringify_exercise

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const keys = _.keys(value);
  const result = keys.map((key) => {
    const childValue = value[key];
    return `${getIndent(depth)}  ${key}: ${stringify(childValue, depth + 1)}\n`;
  });
  return `{\n${result.join('')}${getIndent(depth - 1)}  }`;
};

const getDiffTree = (nodes) => {
  const iter = (node, depth = 1) => {
    const {
      type, key, children, removedValue, addedValue, unchangedValue,
    } = node;

    switch (type) {
      case 'nested':
        return `\n${getIndent(depth)}  ${key}: {${children.map((child) => iter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
      case 'unchanged':
        return `\n${getIndent(depth)}  ${key}: ${stringify(unchangedValue, depth + 1)}`;
      case 'changed':
        return `\n${getIndent(depth)}- ${key}: ${stringify(removedValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringify(addedValue, depth + 1)}`;
      case 'added':
        return `\n${getIndent(depth)}+ ${key}: ${stringify(addedValue, depth + 1)}`;
      case 'removed':
        return `\n${getIndent(depth)}- ${key}: ${stringify(removedValue, depth + 1)}`;
      default:
        throw new Error(`Sorry! Type: ${type} is unknown.`);
    }
  };
  return iter(nodes);
};

const stylish = (diffTree) => {
  const result = diffTree.map((nodes) => getDiffTree(nodes));
  return `{${result.join('')}\n}`;
};

export default stylish;

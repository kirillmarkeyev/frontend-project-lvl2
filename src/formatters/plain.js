import _ from 'lodash';

// https://ru.hexlet.io/challenges/js_trees_stringify_exercise

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getDiffTree = (nodes) => {
  const iter = (node, fullName = '') => {
    const currentName = `${fullName}${node.key}`;
    switch (node.type) {
      case 'nested':
        return node.children.map((child) => iter(child, `${currentName}.`)).join('');
      case 'unchanged':
        return ''; // Вывод для неизменившихся узлов делать не нужно
      case 'added':
        return `Property '${currentName}' was ${node.type} with value: ${stringify(node.addedValue)}\n`;
      case 'removed':
        return `Property '${currentName}' was ${node.type}\n`;
      case 'changed':
        return `Property '${currentName}' was updated. From ${stringify(node.removedValue)} to ${stringify(node.addedValue)}\n`;
      default:
        throw new Error(`Sorry! Type: ${node.type} is unknown.`);
    }
  };
  return iter(nodes);
};

const plain = (diffTree) => {
  const result = diffTree.map((nodes) => getDiffTree(nodes));
  return result.join('').trim(); // Метод str.trim() удаляет пробелы с начала и конца строки
};

export default plain;

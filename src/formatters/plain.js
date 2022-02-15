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
    const {
      type, key, children, removedValue, addedValue,
    } = node;
    const currentName = `${fullName}${key}`;
    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, `${currentName}.`)).join('');
      case 'unchanged':
        return ''; // Вывод для неизменившихся узлов делать не нужно
      case 'added':
        return `Property '${currentName}' was ${type} with value: ${stringify(addedValue)}\n`;
      case 'removed':
        return `Property '${currentName}' was ${type}\n`;
      case 'changed':
        return `Property '${currentName}' was updated. From ${stringify(removedValue)} to ${stringify(addedValue)}\n`;
      default:
        throw new Error(`Sorry! Type: ${type} is unknown.`);
    }
  };
  return iter(nodes);
};

const plain = (diffTree) => {
  const result = diffTree.map((nodes) => getDiffTree(nodes));
  return result.join('').trim(); // Метод str.trim() удаляет пробелы с начала и конца строки
};

export default plain;

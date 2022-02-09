const stringify = (arr, depth = 1) => {
  const indent = '  '.repeat(depth);
  const bracket = `${indent}  `;
  const result = arr.map((element) => {
    switch (element.type) {
      case 'removed':
        return `${indent}- ${element.key}: ${element.removedValue}`;
      case 'added':
        return `${indent}+ ${element.key}: ${element.addedValue}`;
      case 'changed':
        return `${indent}- ${element.key}: ${element.removedValue}\n${indent}+ ${element.key}: ${element.addedValue}`;
      case 'unchanged':
        return `${indent}  ${element.key}: ${element.unchangedValue}`;
      case 'nested':
        return `${indent}  ${element.key}: {\n${stringify(element.children, depth + 2)}\n${bracket}}`;
      default:
        throw new Error(`Unknown type: ${element.type}`);
    }
  });
  return result.join('\n');
};

const stylish = (diffTree) => `{\n${stringify(diffTree)}\n}`;

export default stylish;

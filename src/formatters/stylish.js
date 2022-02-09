const stylish = (arr) => {
  const indent = '  ';
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
      default:
        throw new Error(`Unknown ${element.type}`);
    }
  });
  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};
export default stylish;

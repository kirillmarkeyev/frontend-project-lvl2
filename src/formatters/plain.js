const plain = (diffTree) => {
  const lines = diffTree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const {
        key, type, removedValue, addedValue,
      } = node;
      switch (type) {
        case 'added':
          return `Property '${key}' was ${type} with value: '${addedValue}'`;
        case 'removed':
          return `Property '${key}' was ${type}`;
        case 'changed':
          return `Proprty '${key}' was updated. From '${removedValue}' to '${addedValue}'`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
  return lines.join('\n');
};

export default plain;

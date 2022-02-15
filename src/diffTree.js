import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        key,
        children: getDiffTree(value1, value2),
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'removed',
        key,
        removedValue: value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        addedValue: value2,
      };
    }
    if (_.has(data1, key) && _.has(data2, key) && (value1 !== value2)) {
      return {
        type: 'changed',
        key,
        removedValue: value1,
        addedValue: value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      unchangedValue: value1,
    };
  });
  return diffTree;
};

export default getDiffTree;

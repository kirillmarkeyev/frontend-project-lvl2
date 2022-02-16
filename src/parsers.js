import yaml from 'js-yaml';

const getParsedData = (format, dataWithoutParsing) => {
  switch (format) {
    case 'json':
      return JSON.parse(dataWithoutParsing);
    case 'yaml':
    case 'yml':
      return yaml.load(dataWithoutParsing);
    default:
      throw new Error('Sorry! This format is not supported in the current version.');
  }
};
export default getParsedData;

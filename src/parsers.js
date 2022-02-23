import yaml from 'js-yaml';

const getParsedData = (format, dataWithoutParsing) => {
  switch (format) {
    case 'json':
      return JSON.parse(dataWithoutParsing);
    case 'yaml':
    case 'yml':
      return yaml.load(dataWithoutParsing);
    default:
      throw new Error(`Sorry! Format: ${format} is not supported in this version.`);
  }
};
export default getParsedData;

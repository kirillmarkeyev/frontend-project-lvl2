import yaml from 'js-yaml';
import path from 'path';

const getFileExtension = (filepath) => path.extname(filepath);

const getParsedFile = (filepath, fileWithoutParsing) => {
  const extension = getFileExtension(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(fileWithoutParsing);
    case '.yaml':
      return yaml.load(fileWithoutParsing);
    case '.yml':
      return yaml.load(fileWithoutParsing);
    default:
      throw new Error(`Sorry! File extension: ${extension} is not supported in this version.`);
  }
};
export default getParsedFile;

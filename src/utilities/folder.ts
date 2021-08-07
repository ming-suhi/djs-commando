import fs from 'fs';

/**
 * Get the file exports of all files
 * @param path Path to folder
 * @returns File exports
 */
export function getFiles(path: string): Array<any> {
  const files = [];
  for (let file of fs.readdirSync(path)) {
    files.push(require.main?.require(`./${path}/${file}`));
  }
  return files;
}
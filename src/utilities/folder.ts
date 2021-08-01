import fs from 'fs';

function getFiles(path: string): Array<any> {
  const files = [];
  for (let file of fs.readdirSync(path)) {
    files.push(require.main?.require(`./${path}/${file}`));
  }
  return files;
}

export { getFiles };
import { readdirSync, lstatSync } from 'fs';
import { resolve } from 'path';

/**
 * Get the file exports of all files
 * @param path Path to folder
 * @returns File exports
 */
export function getFiles(folderPath: string): any[] {
  const files = [];
  for (let file of readdirSync(folderPath)) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      files.push(require(resolve(folderPath, file)));
    }
  }
  return files;
}

/**
 * Deletes the cache of the directory files
 * @param path Folder path
 */
export function deleteCache(path: string) {
  for(let file of readdirSync(path)) {
    if(lstatSync(resolve(path, file)).isDirectory()) {
      deleteCache(resolve(path, file));
    } else {
      delete require.cache[resolve(path, file)]
    }
  }
}
import { readdirSync } from 'fs';
import path from 'path';

/**
 * Get the file exports of all files
 * @param path Path to folder
 * @returns File exports
 */
export function getFiles(folderPath: string): any[] {
  const files = [];
  for (let file of readdirSync(path.resolve(require.main?.path!, folderPath))) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      files.push(require.main?.require(`./${folderPath}/${file}`));
    }
  }
  return files;
}
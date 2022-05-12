import { readdirSync, lstatSync } from "fs";
import { resolve, extname } from "path";

/**
 * Get the path of all folders inside a given path.
 * @param path A folder path
 */
export function* getFolderPaths(path: string) {
  for (let content of readdirSync(path)) {
    const contentPath = resolve(path, content);
    const isDirectory = lstatSync(contentPath).isDirectory();
    if(isDirectory) yield contentPath;
  }
}

/**
 * Get the path of all files inside a given path.
 * Only gets ts and js files.
 * @param path A folder path
 */
export function* getFilePaths(path: string) {
  yield* (function* generator(path: string): Generator<any, any, any> {
    for (let content of readdirSync(path)) {
      const contentPath = resolve(path, content);
      const file = lstatSync(contentPath).isFile();
      if(!file) yield* generator(contentPath)
      else if(extname(content) == ".js") yield contentPath;
    }
  })(path);
}

/**
 * Deletes the cache of all the files inside a given path.
 * @param path Folder path
 */
export function deleteCache(path: string) {
  for(let file of readdirSync(path)) {
    lstatSync(resolve(path, file)).isDirectory() ? deleteCache(resolve(path, file)) : delete require.cache[resolve(path, file)];
  }
}
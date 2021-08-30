import { deleteCache, getFiles } from '../utilities/folder';
import { resolve } from 'path';

/** Structure for managing a folder */
export class Folder {
  /** Path to folder */
  public path: string;

  /**
   * @param path Path to folder
   */
  constructor(path: string) {
    this.path = resolve(require.main!.path, path);
  }

  /**
   * Get the file exports of all files
   * @returns File exports
   */
  get files(): any[] {
    return getFiles(this.path);
  }

  /**
   * Gets the file exports of a file
   * @param name The name of the file
   * @returns File exports
   */
  file(name: string): any {
    return require(resolve(this.path, name));
  }

  /**
   * Deletes the folder cache
   */
  deleteCache() {
    deleteCache(this.path)
  }
}
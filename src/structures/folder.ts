import { getFiles } from '../utilities/folder';

/** Structure for managing a folder */
export class Folder {
  /** Path to folder */
  path: string;

  /**
   * @param path Path to folder
   */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * Get the file exports of all files
   * @returns File exports
   */
  get files(): Array<any> {
    return getFiles(this.path);
  }

  /**
   * Gets the file exports of a file
   * @param name The name of the file
   * @returns File exports
   */
  file(name: string): any {
    return require.main?.require(`./${this.path}/${name}`);
  }
}
import { resolve } from "path";
import FileSystemService from "../services/file-system";

/**
 * Folder structure.
 * Used to easily navigate through the file system.
 */
export default class Folder {
  /** 
   * The path to the folder 
   */
  readonly path: string;
  /** 
   * The folders inside the folder 
   */
  readonly folders: Folder[];
  /** 
   * The file exports of the files inside the folder 
   */
  readonly files: any[];
  /**
   * @param path The path to the folder
   */
  constructor(path: string) {
    this.path = resolve(path);
    this.folders = FileSystemService.getFolderPaths(path).map(path => new Folder(path));
    this.files = FileSystemService.getFilePaths(path).map(path => require(path));
  }
  /**
   * Delete cache of folder
   */
  deleteCache() {
    FileSystemService.deleteCache(this.path);
  }
}
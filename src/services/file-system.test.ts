import { resolve } from "path";
import FileSystemService from "./file-system";

describe("File System Service", () => {

  const path = resolve(__dirname, "..", "mocks/directory");

  test("getFolderPaths function", () => {
    expect(FileSystemService.getFolderPaths(path)).toEqual([`${resolve(path, "folder")}`])
  })

  test("getFilePath function", () => {
    expect(FileSystemService.getFilePaths(path)).toEqual([`${resolve(path, "sample.js")}`, `${resolve(path, "sample.ts")}`]);
  })

  test("deleteCache function", () => {
    FileSystemService.deleteCache(path);
  })
})
import { resolve } from "path";
import { getFolderPaths, getFilePaths, deleteCache } from "./file-system";

describe("File System Service", () => {

  const path = resolve(__dirname, "..", "mocks/directory");

  test("getFolderPaths function", () => {
    expect(getFolderPaths(path)).toEqual([`${path}\\folder`])
  })

  test("getFilePath function", () => {
    expect(getFilePaths(path)).toEqual([`${path}\\sample.js`, `${path}\\sample.ts`]);
  })

  test("deleteCache function", () => {
    deleteCache(path);
  })
})
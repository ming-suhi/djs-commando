import { resolve } from "path";
import { getFilePaths, getFolderPaths, deleteCache } from "./file-system";

describe("File System Service", () => {

  const path = resolve(__dirname, "..");

  test("getFolderPaths function", () => {
    const path = resolve(__dirname, "..");
    expect(Array.from(getFolderPaths(path))).toEqual([`${resolve(path, "mocks")}`, `${resolve(path, "services")}`, `${resolve(path, "structures")}`])
  })

  test("getFilePath function", () => {
    const path = resolve(__dirname, "..", "mocks");
    expect(Array.from(getFilePaths(path))).toEqual([`${resolve(path, "moderate.js")}`]);
  })

  test("deleteCache function", () => {
    deleteCache(path);
  })
})
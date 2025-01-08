const fs = require('fs');
const path = require('path');

const getFileInPath = (pathname, type = 'file') => {
  return fs.readdirSync(pathname).filter((name) => {
    switch (type) {
      case 'file':
        return fs.statSync(path.join(pathname, name)).isFile();
      case 'folder':
        return fs.statSync(path.join(pathname, name)).isDirectory();
      case 'all':
      default:
        return true;
    }
  });
};

// 指定目录文件夹整理为mapper对象，key为文件目录，value为文件路径数组
const folderFileCleanup = (pathname, length) => {
  getFileInPath(pathname, 'folder').forEach((folderName) => {
    const fileList = fs.readdirSync(path.join(pathname, folderName));
    if (fileList.length < length || length < 0) {
      fileList.forEach((filename) => {
        fs.renameSync(
          path.join(pathname, folderName, filename),
          path.join(
            pathname,
            `${folderPrefix}${folderName}${folderSuffix}${filename}`,
          ),
        );
      });
      fs.rmdirSync(path.join(pathname, folderName));
    }
  });
};

// 把移动到根目录文件再移回原本文件夹，
const fileResume2Folder = (pathname, length) => {
  getFileInPath(pathname).forEach((filename) => {
    const folderName = filename.match(
      new RegExp(
        `(?<=${folderPrefix})[^${folderPrefix}^${folderSuffix}]+(?=${folderSuffix})`,
      ),
    )?.[0];
    if (!!folderName) {
      const newFileName = filename
        .replace(`${folderPrefix}${folderName}${folderSuffix}`, '')
      const targetFolderPathame = path.join(pathname, folderName);
      const sourceFilePathname = path.join(pathname, filename);
      const targetFilePathname = path.join(pathname, folderName, newFileName);
      if (!fs.existsSync(targetFolderPathame)) {
        fs.mkdirSync(targetFolderPathame);
      }
      if (!!length && fs.readdirSync(targetFolderPathame).length <= length) {
        return;
      }
      fs.renameSync(sourceFilePathname, targetFilePathname); // 改名并动位置
    }
  });
};

// const rootFileRename = (
//   pathname,
//   oldFileGroupFormat = ['{', '}'],
//   newFileGroupFormat = ['【', '】'],
// ) => {
//   getFileInPath(pathname).forEach((filename) => {
//     const newFilename = oldFileGroupFormat.reduce(
//       (prev, curr, currIndex) =>
//         prev.replace(curr, newFileGroupFormat[currIndex]),
//       filename,
//     );
//     fs.renameSync(
//       path.join(pathname, filename),
//       path.join(pathname, newFilename),
//     );
//   });
// };

const folderPrefix = '【';
const folderSuffix = '】';
const targetLength = 5;

// folderFileCleanup('//MrMaNAS/video/绳缚', targetLength); // 低于指定数量的文件夹文件移动到根目录（文件名增加对应名称
fileResume2Folder('//MrMaNAS/video/绳缚'); // 将上述改动还原
// rootFileRename('//MrMaNAS/video/绳缚'); // 指定目录修改格式

const fs = require('fs');
const path = require('path');

const findEpisodeFromName = (name) => {
  const result = name.match(/((?<=第)[0-9]+(?=集))|((?<=[eE])[0-9]+)/);
  if (result) {
    return result[0];
  } else {
    return name;
  }
};

const findSeasonFromName = (name) => {
  const result = name.match(/((?<=第)[0-9]+(?=季))|((?<=[sS])[0-9]+)/);
  if (result) {
    return result[0];
  } else {
    return '01';
  }
};

const fileNameBatchRename = (dir, handle) => {
  fs.readdir(dir, (err, files) => {
    if (!err) {
      files.forEach((file) => {
        fs.rename(
          path.resolve(dir, file),
          path.resolve(dir, handle(file)),
          () => {},
        );
      });
    } else {
      console.log(err);
    }
  });
};

const formatFiles = (dir) => {
  fileNameBatchRename(dir, (file) => {
    const episode = findEpisodeFromName(file);
    const season = findSeasonFromName(file);
    const ext = path.extname(file);
    return `S${season}E${episode}${ext}`;
  });
};

// 对文件名进行替换
const fileNameReplace = (dir) => {
  fileNameBatchRename(dir, (file) => {
    return file.replace('删除', '');
  });
};

fileNameReplace('E:\\chrome下载\\S04.BD1080P.H264.AAC.English.CHS-ENG')

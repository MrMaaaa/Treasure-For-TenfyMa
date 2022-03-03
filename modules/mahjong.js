const tileMap = {
  '0m': -5,
  '1m': 1,
  '2m': 2,
  '3m': 3,
  '4m': 4,
  '5m': 5,
  '6m': 6,
  '7m': 7,
  '8m': 8,
  '9m': 9,

  '0p': -25,
  '1p': 21,
  '2p': 22,
  '3p': 23,
  '4p': 24,
  '5p': 25,
  '6p': 26,
  '7p': 27,
  '8p': 28,
  '9p': 29,

  '0s': -45,
  '1s': 41,
  '2s': 42,
  '3s': 43,
  '4s': 44,
  '5s': 45,
  '6s': 46,
  '7s': 47,
  '8s': 48,
  '9s': 49,

  '1z': 60, // 东
  '2z': 62, // 南
  '3z': 64, // 西
  '4z': 66, // 北
  '5z': 68, // 白
  '6z': 70, // 发
  '7z': 72, // 中
};

// 字牌
const honorsTiles = [
  tileMap['1z'],
  tileMap['2z'],
  tileMap['3z'],
  tileMap['4z'],
  tileMap['5z'],
  tileMap['6z'],
  tileMap['7z'],
];

const tileRMap = {
  '-5': '0m',
  1: '1m',
  2: '2m',
  3: '3m',
  4: '4m',
  5: '5m',
  6: '6m',
  7: '7m',
  8: '8m',
  9: '9m',

  '-25': '0p',
  21: '1p',
  22: '2p',
  23: '3p',
  24: '4p',
  25: '5p',
  26: '6p',
  27: '7p',
  28: '8p',
  29: '9p',

  '-45': '0s',
  41: '1s',
  42: '2s',
  43: '3s',
  44: '4s',
  45: '5s',
  46: '6s',
  47: '7s',
  48: '8s',
  49: '9s',

  60: '1z',
  62: '2z',
  64: '3z',
  66: '4z',
  68: '5z',
  70: '6z',
  72: '7z',
};

const tileEmojiMap = {
  '1m': '🀇',
  '2m': '🀈',
  '3m': '🀉',
  '4m': '🀊',
  '5m': '🀋',
  '6m': '🀌',
  '7m': '🀍',
  '8m': '🀎',
  '9m': '🀏',

  '1p': '🀙',
  '2p': '🀚',
  '3p': '🀛',
  '4p': '🀜',
  '5p': '🀝',
  '6p': '🀞',
  '7p': '🀟',
  '8p': '🀠',
  '9p': '🀡',

  '1s': '🀐',
  '2s': '🀑',
  '3s': '🀒',
  '4s': '🀓',
  '5s': '🀔',
  '6s': '🀕',
  '7s': '🀖',
  '8s': '🀗',
  '9s': '🀘',

  '1z': '🀀',
  '2z': '🀁',
  '3z': '🀂',
  '4z': '🀃',
  '5z': '🀆',
  '6z': '🀅',
  '7z': '🀄',
};

const parseTiles = (tiles, type) => {
  if (!tiles) throw 'empty tiles';

  let tileList = [];
  let result = [];

  for (const t of tiles) {
    if (/[0-9]/.test(t)) {
      tileList.push(t);
    } else if (/m|p|s|z/.test(t)) {
      result = [...result, ...tileList.map((el) => `${el}${t}`)];
      tileList = [];
    } else {
      throw 'invalid tiles';
    }
  }

  return result.map((el) => {
    if (type === 'emoji') {
      return tileEmojiMap[el];
    }

    return tileMap[el];
  });
};

const reverseTiles = (tiles) => {
  return tiles.map((el) => tileRMap[el]);
};

const judgeIsWin = (tiles) => {
  const tileRs = reverseTiles(tiles);
  const tileTypeMapper = {
    m: [],
    p: [],
    s: [],
    z: [],
  };
  for (const tile of tileRs) {
    tileTypeMapper[tile[1]].push(tile)
  }

  console.log(tileTypeMapper)
};

// 是否为十三幺/国士无双
const judgeIsThirteenOrphans = (tiles) => {
  // 构造一个包含13张不重复幺九字牌的数组
  // 遍历14张牌，如果某张牌在toTiles中，就同时删除testTiles和copyTiles中对应的牌，
  // 遍历结束后，如果testTiles为空则表示14张牌有13张牌为不重复的幺九字牌，此时只需判断最后一张牌是否为幺九字牌即可
  let isThirteenOrphans = false;
  const toTiles = [
    tileMap['1m'],
    tileMap['9m'],
    tileMap['1p'],
    tileMap['9p'],
    tileMap['1s'],
    tileMap['9s'],
    tileMap['1z'],
    tileMap['2z'],
    tileMap['3z'],
    tileMap['4z'],
    tileMap['5z'],
    tileMap['6z'],
    tileMap['7z'],
  ];
  const testTiles = [...toTiles];
  const copyTiles = [...tiles];

  tiles.forEach((t) => {
    const findIndex = testTiles.findIndex((el) => el === t);
    if (findIndex > -1) {
      testTiles.splice(findIndex, 1);
      const findCopyTilesIndex = copyTiles.findIndex((el) => el === t);
      copyTiles.splice(findCopyTilesIndex, 1);
    }
  });

  if (
    testTiles.length === 0 &&
    copyTiles.length === 1 &&
    toTiles.includes(copyTiles[0])
  ) {
    isThirteenOrphans = true;
  }

  return isThirteenOrphans;
};

// 是否为七对子
const judgeIsSevenPairs = (tiles) => {
  // 声明一个对象，将每张牌作为key存储到这个对象中，value表示这张牌出现的次数
  // 如果key有7个且value都为2就是七对子
  // 这次不考虑清龙七对的情况（即杠子作为两个对子）
  const mapper = {};

  tiles.forEach((t) => {
    if (mapper[t]) {
      mapper[t] += 1;
    } else {
      mapper[t] = 1;
    }
  });

  return (
    Object.keys(mapper).length === 7 &&
    Object.values(mapper).every((el) => el === 2)
  );
};

// 获取一张牌的进张种类
const getGoodInTile = (tile) => {
  // 字牌只有自己是进张
  if (honorsTiles.includes(tile)) return [tile];

  return [tile - 2, tile - 1, tile, tile + 1, tile + 2].reduce((prev, curr) => {
    const tiles = [];
    if (!!tileRMap[curr]) {
      tiles.push(curr);
    }

    if (!!tileRMap[-1 * curr]) {
      tiles.push(-1 * curr);
    }

    return [...prev, ...tiles];
  }, []);
};

console.log(judgeIsWin(parseTiles('123456789s123p44z')))

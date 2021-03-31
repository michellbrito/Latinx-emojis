const mergeImg = require("merge-img");
const jimp = require("jimp");
const _ = require("lodash");
const fs = require("fs");

let allImgs = 0;

async function getImgs(path) {
  const imgs = [];
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    imgs.push(`./emojis/${dirent.name}`);
  }
  return await imgs;
}

async function createGrid(imgs, fileOutput) {
  mergeImg(imgs, { direction: true }).then((img) => {
    img.write(fileOutput, () => console.log("done"));
  });
}

async function createResult(res, index) {
  const imgSplit = _.chunk(res, 5);
  mergeImg(imgSplit[index]).then((img) => {
    // allImgs.push(`./out${index}.png`);
    img.write(`./out/out${index}.png`, () => console.log("done"));
  });

  allImgs = imgSplit.length;
}

async function finalGrid() {
  const imgsList = [];
  fs.readdirSync("out").forEach((file) => {
    imgsList.push(`./out/${file}`);
  });
  createGrid(imgsList, "grid.png");
}

async function finalImgs() {
  getImgs("./emojis").then((result) => createResult(result, 1));
  getImgs("./emojis").then((result) => createResult(result, 2));
  getImgs("./emojis").then((result) => createResult(result, 3));
  getImgs("./emojis").then((result) => createResult(result, 4));
  getImgs("./emojis").then((result) => createResult(result, 5));
  getImgs("./emojis").then((result) => createResult(result, 6));
}

module.exports = {
  finalImgs,
  finalGrid,
};

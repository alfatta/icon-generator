const Jimp = require('jimp');
const fs = require('fs');
const iconList = require('./iconList.json')

let [ image, dest ] = process.argv.slice(2);
let hasError = false

if (!image) {
  console.error('Error : Please provide an image');
  hasError = true
} else {
  if (!(fs.existsSync(image) && fs.lstatSync(image).isFile())) {
    console.error('Error : Can\'t get your image')
    hasError = true
  }
}

if (!hasError) {

  if (!dest) dest = 'dest'
  if (!fs.existsSync(dest)) fs.mkdirSync

  iconList.sort((a, b) => b.size - a.size)

  Jimp.read(image, async (err, source) => {
    if (err) console.error('Error : ' + err.message);
    iconList.forEach(({ name, size }) => {
      source
        .resize(size, size)
        .write(dest + '/' + name);
    });
    console.log('Done');
  });
}

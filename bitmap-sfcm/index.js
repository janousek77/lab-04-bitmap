'use strict';

let fs = require('fs');
let bitmap = require('./lib/bitmap.js');

let convertImage = (file) => {
  bitmap.readFromFile(file, (data) => {
    let img = new bitmap.Image(data, file);
    img.grayImg();
  });
};

convertImage('./imgs/bitmap.bmp');

'use strict';

let fs = require('fs');
let bitmap = require('./lib/bitmap.js');

let convertImage = (file) => {
  bitmap.readFromFile(file, (data) => {
    let img = new bitmap.Image(data);
    console.log(img.pixelArr.length);
    console.log(img.invertImg());
  });
};

convertImage('./imgs/1.bmp');

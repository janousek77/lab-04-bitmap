'use strict';

let fs = require('fs');

let bitmap = module.exports = {};

function Image(buffer) {
  this.buffer = buffer;
  this.header = this.buffer.slice(0, 2);
  this.dib = this.buffer.slice(2, 42);
  this.width = this.buffer.slice(22, 26).readUInt16LE(0);
  this.height = this.buffer.slice(18, 22).readUInt16LE(0);
  this.colorTable = this.buffer.slice(42, 1066);
  this.pixelArr = this.buffer.slice(1066, 1066 + this.width * this.height);
}

bitmap.readFromFile = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if(err)
      return console.log(err);

    callback(data);
  });
};

bitmap.Image = Image;

bitmap.Image.prototype.writeToFile = (file) => {
  console.log('write to file');
};

bitmap.Image.prototype.invertImg = () => {

};

bitmap.Image.prototype.grayImg = () => {

};

bitmap.Image.prototype.rgbImg = (color) => {

};

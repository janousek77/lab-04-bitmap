'use strict';

let fs = require('fs');

let bitmap = module.exports = {};

function Image(buffer, file) {
  this.buffer = buffer;
  this.fileLocation = file;
  this.header = this.buffer.slice(0, 2);
  this.dib = this.buffer.slice(2, 42);
  this.height = this.buffer.slice(18, 22).readUInt16LE(0);
  this.width = this.buffer.slice(22, 26).readUInt16LE(0);
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

bitmap.Image.prototype.writeToFile = function(file) {
  console.log('write to file');
};

bitmap.Image.prototype.invertImg = function() {
  // console.log(this.buffer.slice(28, 32).readUInt16LE(0));
  for(let i = 0; i < this.colorTable.length; i++) {
    this.colorTable[i] = 255 - this.colorTable[i];
  }
  // console.log(this.buffer);
  fs.writeFile(this.fileLocation, this.buffer, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
};

bitmap.Image.prototype.grayImg = function() {

};

bitmap.Image.prototype.rgbImg = function(color) {

};

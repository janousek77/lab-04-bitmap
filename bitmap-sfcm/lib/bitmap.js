'use strict';

let fs = require('fs');

let bitmap = module.exports = {};

function Image(buffer, file) {
  this.buffer = buffer;
  this.fileLocation = file;
  this.header = this.buffer.slice(0, 2);
  this.dib = this.buffer.slice(2, 54);
  this.height = this.buffer.slice(18, 22).readUInt16LE(0);
  this.width = this.buffer.slice(22, 26).readUInt16LE(0);
  this.colorTable = this.buffer.slice(54, 1078);
  this.pixelArr = this.buffer.slice(1078, 1078 + this.width * this.height);
}

bitmap.readFromFile = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if(err)
      return console.log(err);
    callback(data);
  });
};

bitmap.Image = Image;

bitmap.Image.prototype.writeToFile = function() {
  fs.writeFile(this.fileLocation, this.buffer, function(err) {
    if(err)
      return console.log(err);
    console.log('The file was written!');
  });
};

bitmap.Image.prototype.invertImg = function() {
  for(let i = 0; i < this.colorTable.length; i++) {
    this.colorTable[i] = 255 - this.colorTable[i];
  }
  this.writeToFile();
};

bitmap.Image.prototype.grayImg = function() {

  this.writeToFile();
};

bitmap.Image.prototype.rgbImg = function(color) {

  this.writeToFile();
};

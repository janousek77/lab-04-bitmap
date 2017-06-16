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

bitmap.Image.prototype.writeToFile = function(file) {
  console.log('write to file');
};

bitmap.Image.prototype.invertImg = function() {
  for(let i = 0; i < this.pixelArr.length; i += 3) {
    console.log('before', this.pixelArr[i], this.pixelArr[i+1], this.pixelArr[i+2], '\n');
    this.pixelArr[i] = parseInt(255, 16) - this.pixelArr[i];
    this.pixelArr[i+1] = parseInt(255, 16) - this.pixelArr[i+1];
    this.pixelArr[i+2] = parseInt(255, 16) - this.pixelArr[i+2];
    // this.pixelArr[i+3] = parseInt(255, 16) - this.pixelArr[i+3];
    console.log('after', this.pixelArr[i], this.pixelArr[i+1], this.pixelArr[i+2], '\n');
  }
  fs.writeFile("imgs/1invert.bmp", this.buffer, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
};

bitmap.Image.prototype.grayImg = function() {

};

bitmap.Image.prototype.rgbImg = function(color) {

};

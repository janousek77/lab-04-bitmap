'use strict';

let fs = require('fs');

let bitmap = module.exports = {};

function Image(buffer, file) {
  this.buffer = buffer;
  this.fileLocation = file;
  this.colorTable = this.buffer.slice(54, 1078);
  this.header = this.buffer.slice(0, 2);
  this.dib = this.buffer.slice(2, 54);
  this.pixelArr = this.buffer.slice(1066);
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
  if (this.file)
    this.writeToFile();
};

bitmap.Image.prototype.grayImg = function() {
  for(let i = 0; i < this.colorTable.length; i+=4) {
    let totalColors = (this.colorTable[i]+this.colorTable[i+1]+this.colorTable[i+2])/3;
    this.colorTable[i] = totalColors;
    this.colorTable[i+1] = totalColors;
    this.colorTable[i+2] = totalColors;
  }
  if (this.file)
    this.writeToFile();
};

bitmap.Image.prototype.rgbImg = function(color) {
  let i;
  if (color==='blue')
    i = 0;
  else if (color==='green')
    i = 1;
  else if (color==='red')
    i = 2;

  for(i; i < this.colorTable.length; i+=4) {
    this.colorTable[i] = 255;
  }
  if (this.file)
    this.writeToFile();
};

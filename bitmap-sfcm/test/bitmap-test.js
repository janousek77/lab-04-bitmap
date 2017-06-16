'use strict';

let expect = require('expect');

let bitmap = require('../lib/bitmap.js');

describe('Constructor', () => {
  it('should throw error', () => {
    expect(() => new bitmap.Image(3, null)).toThrow(Error);
  });
});
describe('Invert Image', () => {
  it('should flip the image colors', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = img.buffer;
    img.invertImg();
    expect(img.buffer).toEqual([232, 212, 132, 190]);
  });
  it('should throw error', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = 1;
    expect(() => img.invertImg()).toThrow(Error);
  });
});
describe('Greyscaling Image', () => {
  it('should flip the image black white', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = img.buffer;
    img.grayImg();
    expect(img.buffer).toEqual([63, 63, 63, 65]);
  });
  it('should throw error', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = 1;
    expect(() => img.grayImg()).toThrow(Error);
  });
});
describe('Adding red blue green to Image', () => {
  it('should flip the image blue', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = img.buffer;
    img.rgbImg('blue');
    expect(img.buffer).toEqual([255, 43, 123, 65]);
  });
  it('should flip the image green', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = img.buffer;
    img.rgbImg('green');
    expect(img.buffer).toEqual([23, 255, 123, 65]);
  });
  it('should flip the image red', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = img.buffer;
    img.rgbImg('red');
    expect(img.buffer).toEqual([23, 43, 255, 65]);
  });
  it('should throw error', () => {
    let img = new bitmap.Image([23, 43, 123, 65], null);
    img.colorTable = 1;
    expect(() => img.rgb()).toThrow(Error);
  });
});

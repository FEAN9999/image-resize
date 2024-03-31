import sharp, { Sharp } from "sharp";
import fs from "fs";

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 200;

// Function to resize an image
function resize(
  path: string,
  width: number = DEFAULT_WIDTH,
  height: number = DEFAULT_HEIGHT
): Sharp {
  const readStream = fs.createReadStream(path);
  let transform = sharp();
  transform = transform.resize(width, height);
  return readStream.pipe(transform);
}

// Function to save an image to disk
function saveImageToDisk(imageData: Buffer, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, imageData, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Function to pull an image from disk
function pullImageFromDisk(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export {
  resize,
  saveImageToDisk,
  pullImageFromDisk,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
};

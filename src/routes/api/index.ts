import { Router } from "express";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  pullImageFromDisk,
  resize,
  saveImageToDisk,
} from "../../utilities/imageUtils";
import fs from "fs/promises";

import path from "path";

const log = require("debug")("http");
const DEFAULT_FILE_NAME = "encenadaport";
const api = Router();

api.get("/images", async (req, res) => {
  const query = req.query;
  if (!query.filename || !query.height || !query.width) {
    return res.status(400).send("Missing parameters");
  }

  const width = Number(query.width) || DEFAULT_WIDTH;
  const height = Number(query.height) || DEFAULT_HEIGHT;
  const fileName = query.filename || DEFAULT_FILE_NAME;

  const pathImage = `${path.resolve(
    __dirname,
    `../../../src/assets/full/${fileName}.jpg`
  )}`;

  const imageData = await fs.readFile(pathImage).catch(() => {
    res.status(404).send("Image does not exist");
    return null;
  });

  if (!imageData) return;

  // Check if the resized image is already in the cache
  pullImageFromDisk(`src/assets/thumb/${fileName}_${width}_${height}.jpg`)
    .then((data) => {
      res.type("image/jpeg").send(data);
    })
    .catch(() => {
      resize(`src/assets/full/${fileName}.jpg`, width, height)
        .toBuffer()
        .then((resizedImage) => {
          // Store the resized image in the cache
          saveImageToDisk(
            resizedImage,
            `src/assets/thumb/${fileName}_${width}_${height}.jpg`
          );
          res.status(200).type("image/jpg").send(resizedImage);
        })
        .catch((error) => {
          // Handle any errors that occur during resizing
          log("Error resizing image:", error);
          res.status(500).send("Error resizing image");
        });
    });
});

export default api;

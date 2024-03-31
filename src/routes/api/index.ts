import { Router } from "express";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  pullImageFromDisk,
  resize,
  saveImageToDisk,
} from "../../utilities/imageUtils";

const DEFAULT_FILE_NAME = "encenadaport";
const api = Router();

api.get("/images", (req, res) => {
  const query = req.query;
  const width = Number(query.width) || DEFAULT_WIDTH;
  const height = Number(query.height) || DEFAULT_HEIGHT;
  const fileName = query.fileName || DEFAULT_FILE_NAME;

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
          console.error("Error resizing image:", error);
          res.status(500).send("Error resizing image");
        });
    });
});

export default api;

import app from "../index";
import { resize } from "../utilities/imageUtils";
import request from "supertest";

describe("resize", (): void => {
  it("should resize the image with default width and height", (): void => {
    expect(resize("src/assets/full/encenadaport.jpg")).toBeDefined();
  });

  it("should resize the image with custom width and height", (): void => {
    expect(resize("src/assets/full/encenadaport.jpg", 300, 300)).toBeDefined();
  });

  it("should return the transformed image stream", (): void => {
    expect(resize("src/assets/full/encenadaport.jpg")).toBeDefined();
  });
});

describe("GET /", (): void => {
  it("responds with 200", (done): void => {
    request(app).get("/").expect(200, done);
  });
});

describe("GET /api/images", () => {
  it("responds with 400 if api without parameters", (done): void => {
    request(app).get("/api/images").expect(400, done);
  });

  it("responds with 400 if api with a missing parameter", (done): void => {
    request(app)
      .get("/api/images?filename=encenadaport&width=200")
      .expect(400, done);
  });

  it("responds with 404 if api correctly but image does not exist", (done): void => {
    request(app)
      .get("/api/images?filename=test&height=100&width=100")
      .expect(404, done);
  });
});

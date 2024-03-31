import { resize } from "../utilities/imageUtils";

describe("resize", () => {
  it("should resize the image with default width and height", () => {
    expect(resize("src/assets/full/encenadaport.jpg")).toBeDefined();
  });

  it("should resize the image with custom width and height", () => {
    expect(resize("src/assets/full/encenadaport.jpg", 300, 300)).toBeDefined();
  });

  it("should return the transformed image stream", () => {
    expect(resize("src/assets/full/encenadaport.jpg")).toBeDefined();
  });
});

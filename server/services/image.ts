import Sharp from "sharp";

async function bufferToBase64(buffer: Buffer) {
  return `data:image/jpeg;base64,` + buffer.toString("base64");
}

export async function parseImage(file: Buffer) {
  try {
    const image = Sharp(file).jpeg().resize(800, null).withMetadata();
    const preview = image.clone().resize(5, null).blur(10);

    const [imageBuff, imageMetadata, previewBase64] = await Promise.all([
      image.toBuffer(),
      image.metadata(),
      preview
        .toBuffer()
        .then(bufferToBase64)
        .catch(() => undefined),
    ]);

    const { height, width } = imageMetadata;
    const imageBase64 = bufferToBase64(imageBuff);

    return { imageBuff, imageBase64, previewBase64, height, width };
  } catch (error) {
    return undefined;
  }
}

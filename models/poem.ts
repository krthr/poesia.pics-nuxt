import type { DocumentSnapshot } from "firebase/firestore";

interface PoemImage {
  path: string;
  width?: number;
  height?: number;
  preview?: string;
}

interface PoemPoem {
  caption?: string;
  content: string;
  mood: string;
}

export interface PoemPayload {
  id: string;
  image: PoemImage;
  poem: PoemPoem;
  createdAt: Date;
}

export class Poem implements PoemPayload {
  constructor(
    public id: string,
    public image: PoemImage,
    public poem: PoemPoem,
    public createdAt: Date
  ) {}

  public get imageFullPath() {
    return `https://storage.googleapis.com/poesiapics.appspot.com/${this.image.path}`;
  }
}

export const poemConverter = {
  toFirestore(poem: PoemPayload): PoemPayload {
    return {
      id: poem.id,
      image: {
        path: poem.image.path,
        height: poem.image.height,
        width: poem.image.width,
        preview: poem.image.preview,
      },
      poem: {
        content: poem.poem.content,
        caption: poem.poem.caption,
        mood: poem.poem.mood,
      },
      createdAt: poem.createdAt,
    };
  },
  fromFirestore(snapshot: DocumentSnapshot, options: any) {
    const data = snapshot.data(options)!;
    return new Poem(data.name, data.image, data.poem, data.createdAt);
  },
};

import type { DocumentSnapshot } from "firebase/firestore";

interface PoemImage {
  path: string;
  width?: number;
  height?: number;
  preview?: string;
}

export interface PoemPayload {
  id: string;
  image: PoemImage;
}

export class Poem {
  constructor(public id: string, public image: PoemImage) {}
}

export const poemConverter = {
  toFirestore(poem: PoemPayload) {
    return {
      id: poem.id,
      image: {
        path: poem.image.path,
        height: poem.image.height,
        width: poem.image.width,
      },
    };
  },
  fromFirestore(snapshot: DocumentSnapshot, options: any) {
    const data = snapshot.data(options)!;
    return new Poem(data.name, data.image);
  },
};

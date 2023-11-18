import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NUXT_FIREBASE_API_KEY,
  authDomain: "poesiapics.firebaseapp.com",
  projectId: "poesiapics",
  storageBucket: "poesiapics.appspot.com",
  messagingSenderId: "1042574337197",
  appId: "1:1042574337197:web:4b349f2347b4699d5b5224",
  measurementId: "G-K80PMDDGSD",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export async function uploadImage(path: string, imageBuffer: Buffer) {
  try {
    const imageRef = ref(storage, path);

    const uploadResult = await uploadBytes(imageRef, imageBuffer, {
      cacheControl: "max-age=31536000, public",
      contentType: "image/jpeg",
    });

    return { imagePath: uploadResult.metadata.fullPath };
  } catch (error) {
    return undefined;
  }
}

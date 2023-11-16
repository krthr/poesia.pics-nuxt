<template>
  <h1 class="text-2xl font-medium">Poema</h1>

  <img
    class="lazyload max-w-[400px] w-full"
    height="auto"
    :data-src="imagePath"
    :src="poem.image.preview"
    :width="poem.image.width"
    :style="{
      aspectRatio: poem.image.width / poem.image.height,
    }"
  />
  <p>
    {{ poem }}
  </p>
</template>

<script setup>
useHead({
  script: [
    {
      src: "/lazysizes.min.js",
    },
  ],
});

import { doc, firestore, getDoc } from "@/services/firebase";
import { poemConverter } from "~/models/poem";

const route = useRoute();
const id = route.params.id;

const docRef = doc(firestore, "poems", id).withConverter(poemConverter);
const document = await getDoc(docRef);

const poem = document.data();
if (!poem) {
  useRouter().push("/");
}

const imagePath = `https://storage.googleapis.com/poesiapics.appspot.com/${poem.image.path}`;
</script>

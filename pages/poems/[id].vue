<template>
  <div id="poem"></div>

  <div class="divider"></div>
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
  await navigateTo("/", { replace: true });
}

const imagePath = `https://storage.googleapis.com/poesiapics.appspot.com/${poem.image.path}`;
</script>

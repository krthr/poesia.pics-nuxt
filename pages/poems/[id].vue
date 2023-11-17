<template>
  <div>
    <div id="poem">
      <img
        class="w-full h-auto rounded-md lazyload"
        :data-src="poem.imageFullPath"
        :src="poem.image.preview"
        width="100%"
        height="auto"
      />

      <h1
        id="caption"
        class="mb-10 mt-5 font-serif font-light italic text-center"
      >
        Caption
      </h1>

      <p class="whitespace-pre-wrap font-serif my-5">Poem poema</p>
    </div>

    <div class="divider"></div>

    <div class="text-center flex flex-col justify-between">
      <h2 class="text-2xl mb-6">
        Comparte tu poema usando el hashtag
        <span class="font-bold">#PoesiaPics</span>
      </h2>

      <div>
        <button class="btn btn-ghost btn-outline gap-2" id="download-poem">
          <Icon class="w-5 h-5" name="ph:download" /> Descargar poema
        </button>
      </div>
    </div>
  </div>
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
</script>

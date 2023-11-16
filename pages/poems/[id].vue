<template>
  <h1 class="text-2xl font-medium">Poema</h1>

  <NuxtImg :src="imagePath" :width="poem.image.width" height="auto" />
  <p>
    {{ poem }}
  </p>
</template>

<script setup>
import { doc, firestore, getDoc } from "@/services/firebase";

const route = useRoute();
const id = route.params.id;

const docRef = doc(firestore, "poems", id);
const document = await getDoc(docRef);

const poem = document.data();
if (!poem) {
  useRouter().push("/");
}

const imagePath = `https://storage.googleapis.com/poesiapics.appspot.com/${poem.image.path}`;
</script>

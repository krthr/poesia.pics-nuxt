<template>
  <div>
    <h1
      class="mt-10 text-center font-display text-5xl font-bold md:text-7xl md:leading-[5rem]"
    >
      Tus imágenes se vuelven <span class="italic font-serif">poesía</span>
    </h1>
  </div>

  <p class="my-7 text-center text-gray-500 md:text-xl">
    Con Inteligencia Artificial convertimos tus fotografías en poemas.
  </p>

  <IndexForm :error="error" />
</template>

<script setup lang="ts">
const error = useErrorCookie();
</script>

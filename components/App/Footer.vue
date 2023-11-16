<template>
  <footer
    class="flex justify-between w-full px-8 py-6 text-primary-content bottom-0"
  >
    <p class="font-medium inline-flex items-center">
      Hecho con
      <Icon class="w-4 h-4 text-red-700 mx-1" name="ph:heart-fill" /> por Wilson
      Tovar
    </p>

    <div class="flex gap-4">
      <NuxtLink to="https://github.com/krthr" target="_blank">
        <Icon class="h-6 w-6" name="ph:github-logo-fill" />
      </NuxtLink>

      <NuxtLink to="https://www.instagram.com/wilson__tovar" target="_blank">
        <Icon class="h-6 w-6" name="ph:instagram-logo-fill" />
      </NuxtLink>
    </div>
  </footer>
</template>

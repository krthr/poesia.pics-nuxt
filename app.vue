<template>
  <Topbar />

  <div class="w-full p-5">
    <div class="w-full max-w-xl m-auto">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ERROR_COOKIE_NAME } from "@/constants/errors";

const errorCookie = useCookie(ERROR_COOKIE_NAME);
const error = errorCookie.value;

errorCookie.value = null;
</script>

<template>
  <div class="w-full flex flex-col min-h-screen">
    <AppTopbar />

    <div class="w-full p-5 flex align-middle justify-center flex-1">
      <div class="w-full max-w-xl pt-20">
        <NuxtPage />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ERROR_COOKIE_NAME } from "@/constants/errors";

const errorCookie = useCookie(ERROR_COOKIE_NAME);
const error = errorCookie.value;

errorCookie.value = null;
</script>

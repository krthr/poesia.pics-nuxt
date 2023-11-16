<template>
  <Topbar />

  <div>
    <NuxtPage />
  </div>

  {{ error }}
</template>

<script setup lang="ts">
import { ERROR_COOKIE_NAME } from "@/constants/errors";

const errorCookie = useCookie(ERROR_COOKIE_NAME);
const error = errorCookie.value;

errorCookie.value = null;
</script>

<template>
  <form
    action="/api/poem"
    method="post"
    enctype="multipart/form-data"
    name="form"
    ref="form"
  >
    <div v-if="error" class="alert alert-error mb-4">
      <div>
        <Icon class="w-6 h-6 stroke-current shrink-0 mr-2" name="ph:x-circle" />
        <span>{{ error.message }}</span>
      </div>
    </div>

    <input
      accept="image/jpg,image/jpeg,image/webp,image/png"
      type="file"
      name="image"
      id="image"
      hidden
      ref="image"
      onchange="document.querySelector('#selectImage').setAttribute('disabled', true); form.submit()"
    />

    <div class="w-full flex flex-wrap items-end md:space-x-4 space-y-4">
      <div class="form-control flex-1">
        <div class="label-text inline-flex">Selecciona la emoción</div>

        <select
          class="select select-bordered"
          name="mood"
          id="mood"
          placeholder="Selecciona el mood"
        >
          <option
            v-for="mood in MOODS"
            :key="mood.value"
            :selected="mood.value == 'default'"
          >
            {{ mood.label }}
          </option>
        </select>
      </div>

      <button
        class="btn btn-primary gap-4 w-full md:w-auto"
        id="selectImage"
        type="button"
        onclick="form.image.click()"
      >
        <span>Subir imagen</span>
        <Icon class="w-6 h-6" name="ph:upload" />
      </button>
    </div>

    <p class="mt-2 text-center text-sm text-gray-500">
      Puede que obtengas mejores resultados con fotografías de paisajes y
      retratos.
    </p>
  </form>
</template>

<script setup lang="ts">
import type { ErrorCookie } from "@/server/utils/error";

defineProps<{ error?: ErrorCookie }>();

const MOODS = [
  {
    label: "La IA elige",
    value: "default",
  },
  {
    label: "Romance ❤️‍🔥",
    value: "romance",
  },
  {
    label: "Erotismo 🥵",
    value: "erotic",
  },
  {
    label: "Melancolía 😥",
    value: "sad",
  },
  {
    label: "Divetido 😂",
    value: "fun",
  },
] as const;
</script>

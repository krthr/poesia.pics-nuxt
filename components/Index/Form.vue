<template>
  <form
    action="/api/poem"
    method="post"
    enctype="multipart/form-data"
    name="form"
    ref="form"
  >
    <input
      accept="image/jpg,image/jpeg,image/webp,image/png"
      type="file"
      name="image"
      id="image"
      hidden
      ref="image"
      onchange="document.querySelector('#selectImage').setAttribute('disabled', true); form.submit()"
    />

    <div class="w-full flex items-end space-x-4">
      <div class="form-control flex-1">
        <div class="label-text inline-flex">Selecciona la emoción</div>

        <select
          class="select select-bordered"
          name="mood"
          id="mood"
          placeholder="Selecciona el mood"
        >
          <option selected>Selecciona la emoción</option>
          <option>Romance ❤️‍🔥</option>
          <option>Erotismo 🥵</option>
          <option>Melancolía 😥</option>
          <option>Diversión 😂</option>
        </select>
      </div>

      <button
        class="btn btn-primary gap-4"
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

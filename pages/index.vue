<template>
  <div>
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

      <button
        class="btn"
        id="selectImage"
        type="button"
        onclick="form.image.click()"
      >
        <span>Seleccionar imagen</span>
      </button>
    </form>
  </div>
</template>

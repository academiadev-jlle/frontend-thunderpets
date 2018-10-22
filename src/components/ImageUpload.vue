<template>
  <div>
    <v-layout row>
      <v-img
        :src="'data:image/png;base64,'+item.image"
        alt="item.name"
        height="100px"
        max-width="100px"
        v-bind:key="index"
        v-for="(item, index) in images"
      ></v-img>
    </v-layout>
    <v-text-field
      @click="openFileUploader"
      label="Imagem"
      placeholder="Envie uma imagem para identificar do animal"
      prepend-icon="attach_file"
      v-model="imageNames"
    ></v-text-field>
    <input
      @change="getFile"
      accept="image/*"
      id="file"
      multiple
      ref="file"
      type="file"
      value="image"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      image: null,
      imageNames: null,
      images: [],
    };
  },
  methods: {
    openFileUploader() {
      this.$refs.file.click();
    },
    getFile() {
      const uploadedFiles = document.getElementById('file').files;
      this.imageNames = '';
      this.images = [];

      for (let i = 0; i < uploadedFiles.length; i += 1) {
        const file = uploadedFiles[i];
        const reader = new FileReader();

        this.imageNames += i === uploadedFiles.length - 1 ? file.name : `${file.name}, `;

        reader.onload = () => {
          const array = new Uint8Array(reader.result);
          let binaryString = '';

          for (let j = 0; j < array.length; j += 1) {
            binaryString = `${binaryString}${String.fromCharCode(array[j])}`;
          }

          this.images.push({
            name: file.name,
            image: btoa(binaryString),
          });
        };

        reader.readAsArrayBuffer(file);
      }

      this.$emit('get-images', this.images);
    },
  },
};
</script>

<style lang="scss" scoped>
  #file {
    display: none;
  }
</style>

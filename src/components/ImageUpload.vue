<template>
  <div>
    <v-layout
      align-end
      justify-center
      row
      wrap
    >
      <v-card
        :key="index"
        class="ma-1"
        color="primary"
        height="fit-content"
        hover
        v-for="(item, index) in images"
        width="100px"
      >
        <p class="body-2 ma-0 text-xs-center" v-if="index === mainImage">Foto Principal</p>
        <v-img
          :class="{'main-image': index === mainImage}"
          :src="`data:image/png;base64,${item}`"
          @click="setMainImage(index)"
          height="100px"
          max-width="100px"
        >
          <v-layout class="pa-1" justify-end row>
            <v-tooltip color="red" top>
              <v-avatar
                @click="removePhoto(index)"
                class="elevation-2"
                color="red"
                size="20"
                slot="activator"
              >
                <v-icon dark small>mdi-close</v-icon>
              </v-avatar>
              <span>Remover</span>
            </v-tooltip>
          </v-layout>
        </v-img>
      </v-card>
      <v-card
        @click.native="openFileUploader"
        :class="{'ma-1': true, 'no-image-margin': images.length == 0}"
        height="100px"
        hover
        id="new-image"
        v-if="images.length < 10"
        width="100px"
      >
        <v-layout
          align-center
          column
          fill-height
          justify-center
        >
          <v-icon color="grey" size="50">add_a_photo</v-icon>
          <span class="grey--text">Nova foto</span>
        </v-layout>
      </v-card>
    </v-layout>
    <input
      @change="getFile"
      accept="image/*"
      id="file"
      multiple
      ref="file"
      type="file"
    />
  </div>
</template>

<script>
const MAX_PHOTOS = 10;

export default {
  name: 'ImageUpload',
  data() {
    return {
      images: [],
      mainImage: 0,
    };
  },
  methods: {
    validate() {
      this.$validator.validateAll();
    },
    setMainImage(index) {
      this.mainImage = index >= this.images.length ? 0 : index;
    },
    removePhoto(index) {
      this.images.splice(index, 1);
      this.setMainImage(index);

      this.$emit('input', this.images);
    },
    openFileUploader() {
      this.$refs.file.click();
    },
    getFile() {
      const uploadedFiles = document.getElementById('file').files;

      for (let i = 0; i < uploadedFiles.length; i += 1) {
        const file = uploadedFiles[i];
        const reader = new FileReader();

        reader.onload = () => {
          const array = new Uint8Array(reader.result);
          let binaryString = '';

          for (let j = 0; j < array.length; j += 1) {
            binaryString = `${binaryString}${String.fromCharCode(array[j])}`;
          }

          if (this.images.length < MAX_PHOTOS) {
            this.images.push(btoa(binaryString));
            this.$emit('input', this.images);
          }
        };

        reader.readAsArrayBuffer(file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  #file {
    display: none;
  }

  #new-image {
    border: 3px dashed grey;
    border-radius: 5px;
  }

  .main-image {
    border: 3px solid #ffd044;
  }

  .no-image-margin {
    margin-top: 25px !important;
  }
</style>

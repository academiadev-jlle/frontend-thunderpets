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
        v-for="(item, index) in value"
        width="100px"
      >
        <p class="body-2 ma-0 text-xs-center" v-if="index === mainImage && max > 1">
          Foto Principal
        </p>
        <v-img
          :class="{'main-image': index === mainImage && max > 1}"
          :src="`data:image/png;base64,${item}`"
          @click="setMainImage(index)"
          height="100px"
          max-width="100px"
        >
          <v-layout class="pa-1" justify-end row>
            <v-tooltip color="red" top>
              <v-avatar
                @click.stop="removePhoto($event, index)"
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
        :class="{'ma-1': true, 'no-image-margin': value.length == 0}"
        @click.native="openFileUploader"
        height="100px"
        hover
        id="new-image"
        v-if="value.length < max"
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
export default {
  name: 'ImageUpload',
  props: {
    value: {
      type: Array,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      mainImage: 0,
    };
  },
  created() {
  },
  methods: {
    validate() {
      this.$validator.validateAll();
    },
    setMainImage(index) {
      this.mainImage = index >= this.value.length ? 0 : index;
    },
    removePhoto(event, index) {
      this.value.splice(index, 1);

      if (this.mainImage >= this.value.length) {
        this.mainImage -= 1;
      }

      this.mainImage = Math.min(Math.max(this.mainImage, 0), this.value.length);

      this.$emit('input', this.value);
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

          if (this.value.length < this.max) {
            this.value.push(btoa(binaryString));
            this.$emit('input', this.value);
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

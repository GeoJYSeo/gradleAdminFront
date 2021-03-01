<template>
  <v-row>
    <v-col cols="12" sm="9">
      <v-file-input
        v-model="files"
        color="blue darken-4 accent-4"
        counter
        label="File input"
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip v-if="index < 2" dark label small>
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
    </v-col>
    <v-col cols="12" sm="3">
      <v-btn
        block
        large
        depressed
        color="#B71C1C"
        class="white--text"
        @click="delFileInput"
        >delete</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    fileInputIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      files: [],
    }
  },
  methods: {
    ...mapActions('admin/goods/cate_register', ['back']),
    delFileInput() {
      this.$emit('delFileInput', this.fileInputIndex)
    },
  },
}
</script>

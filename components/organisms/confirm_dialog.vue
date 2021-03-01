<template>
  <v-dialog v-model="dispConfirmDialog" persistent max-width="650">
    <v-card>
      <v-card-title class="headline">
        {{ dialogContents.text }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="dialogContents.btn_color" text @click="closeDialog">
          confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dispConfirmDialog: {
      type: Boolean,
      required: true,
    },
    dialogContents: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

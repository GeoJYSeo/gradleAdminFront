<template>
  <v-btn
    block
    outlined
    rounded
    large
    :color="color"
    :disabled="disabled"
    @click="sendEvent"
    >{{ text }}</v-btn
  >
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: () => {
        return '#424242'
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
  },
  methods: {
    sendEvent() {
      this.$emit('sendEvent')
    },
  },
}
</script>

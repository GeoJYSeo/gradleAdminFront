<template>
  <v-btn
    large
    depressed
    :color="color"
    :block="block"
    :disabled="disabled"
    class="white--text"
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
    block: {
      type: Boolean,
      required: false,
      default: () => {
        return true
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

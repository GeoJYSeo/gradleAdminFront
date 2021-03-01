<template>
  <v-btn block depressed :color="color" class="white--text" @click="sendEvent"
    ><v-icon>{{ text }}</v-icon></v-btn
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
  },
  methods: {
    sendEvent() {
      this.$emit('sendEvent')
    },
  },
}
</script>

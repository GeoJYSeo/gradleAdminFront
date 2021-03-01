<template>
  <v-textarea
    :value="inputContent"
    :outlined="isDetail"
    :readonly="isDetail"
    :hide-details="isDetail"
    :clearable="!isDetail"
    :label="label"
    :placeholder="placeholder"
    auto-grow
    @input="sendInput"
  ></v-textarea>
</template>

<script>
export default {
  props: {
    inputContent: {
      type: String,
      required: false,
      default: () => {
        return null
      },
    },
    label: {
      type: String,
      required: false,
      default: () => {
        return null
      },
    },
    placeholder: {
      type: String,
      required: false,
      default: () => {
        return null
      },
    },
    isDetail: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
  },
  methods: {
    sendInput(input) {
      this.$emit('update:inputContent', input)
    },
  },
}
</script>

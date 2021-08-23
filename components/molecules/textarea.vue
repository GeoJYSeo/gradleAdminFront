<template>
  <v-textarea
    :value="inputContent"
    :outlined="isDetail"
    :readonly="isDetail"
    :hide-details="isDetail"
    :rules="rules"
    :clearable="!isDetail"
    :label="label"
    :placeholder="placeholder"
    :prepend-icon="prependIcon"
    auto-grow
    @input="sendInput"
  ></v-textarea>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    inputContent: {
      type: String,
      required: false,
      default: () => {
        return null
      },
    },
    rules: {
      type: Array,
      required: true,
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
  computed: {
    prependIcon() {
      return this.required ? 'mdi-star-circle' : null
    },
  },
  methods: {
    sendInput(input) {
      this.$emit('update:inputContent', input)
    },
  },
}
</script>

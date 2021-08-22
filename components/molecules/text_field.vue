<template>
  <v-text-field
    :value="inputContent"
    :outlined="isDetail"
    :readonly="isDetail"
    :hide-details="isDetail"
    :rules="rules"
    :type="inputType"
    :clearable="!isDetail"
    :label="label"
    :prepend-inner-icon="prependInnerIcon"
    @input="sendInput"
  ></v-text-field>
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
      default: () => {
        return null
      },
    },
    inputType: {
      type: String,
      default: () => {
        return 'text'
      },
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: () => {
        return null
      },
    },
    rules: {
      type: Array,
      required: true,
    },
    isDetail: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  computed: {
    prependInnerIcon() {
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

<template>
  <v-row>
    <v-col>
      <CompButton
        :disabled="isEmailCheck"
        :text="text"
        @sendEvent="sendEvent"
      />
    </v-col>
    <v-col v-if="isDel">
      <CompButton text="delete" @sendEvent="delData" />
    </v-col>
    <v-col>
      <CompButton text="back" @sendEvent="back" />
    </v-col>
  </v-row>
</template>

<script>
import CompButton from '@/components/molecules/button'

export default {
  components: { CompButton },
  props: {
    text: {
      type: String,
      required: true,
    },
    isDel: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isEmailCheck: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  methods: {
    sendEvent() {
      this.$emit('sendEvent')
    },
    delData() {
      this.$emit('delData')
    },
    back() {
      this.$emit('back')
    },
  },
}
</script>

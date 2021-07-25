<template>
  <v-row>
    <v-col>
      <CompButton
        :disabled="isBtnDisabled"
        :text="text"
        @sendEvent="sendEvent"
      />
    </v-col>
    <v-col v-if="isDetail">
      <div v-if="userStatus === 'ACTIVATED' && !isAdmin">
        <CompButton text="delete" @sendEvent="delData" />
      </div>
      <div v-else-if="userStatus === 'DELETED_PENDING' && isAdmin">
        <CompButton text="confirm delete" @sendEvent="delData" />
      </div>
      <div v-else>
        <CompButton text="deleted" disabled />
      </div>
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
    userStatus: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    isDetail: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isBtnDisabled: {
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

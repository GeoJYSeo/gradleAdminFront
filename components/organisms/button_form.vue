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
      <div v-if="userStatus === 'ACTIVATED'">
        <CompButton
          text="delete"
          :disabled="isMe ? false : disableButton"
          @sendEvent="delData"
        />
      </div>
      <div v-else-if="userStatus === 'DELETED_PENDING'">
        <CompButton
          text="confirm delete"
          :disabled="disableButton"
          @sendEvent="delData"
        />
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
      required: false,
      default: () => {
        return null
      },
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    isMe: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
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
  computed: {
    disableButton() {
      return !this.isAdmin
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

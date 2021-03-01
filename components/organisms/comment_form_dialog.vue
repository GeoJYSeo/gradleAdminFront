<template>
  <v-dialog v-model="dispCommentDialog" persistent max-width="650">
    <v-card>
      <v-card-title class="headline">
        {{ dialogContents.text }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <FormTextarea
            :input-content.sync="commentInfo.comment"
            :rules="commentRules"
            label="Comment"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="dialogContents.con_btn_color" text @click="validate">
          confirm
        </v-btn>
        <v-btn :color="dialogContents.can_btn_color" text @click="closeDialog">
          cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import FormTextarea from '@/components/molecules/textarea'

export default {
  components: { FormTextarea },
  props: {
    commentInfo: {
      type: Object,
      required: true,
    },
    dispCommentDialog: {
      type: Boolean,
      required: true,
    },
    dialogContents: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
    }
  },
  computed: {
    ...mapState('validation', ['commentRules']),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('modify', this.commentInfo)
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

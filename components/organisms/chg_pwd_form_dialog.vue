<template>
  <v-dialog v-model="dispChgPwdDialog" persistent max-width="650">
    <v-card>
      <v-card-title class="headline">
        {{ dialogContents.text }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" class="px-15" lazy-validation>
          <v-row>
            <TextFieldForm
              :input-content.sync="oldPasswd"
              :rules="passwordRules"
              input-type="password"
              label="Old Password"
            />
          </v-row>
          <v-row>
            <TextFieldForm
              :input-content.sync="newPasswd"
              :rules="passwordRules"
              input-type="password"
              label="New Password"
            />
          </v-row>
          <v-row>
            <TextFieldForm
              :input-content.sync="passwdCheck"
              :rules="passwordCheckRules"
              input-type="password"
              label="Password Check"
            />
          </v-row>
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
import TextFieldForm from '@/components/molecules/text_field'

export default {
  components: { TextFieldForm },
  props: {
    dispChgPwdDialog: {
      type: Boolean,
      required: true,
    },
    dialogContents: {
      type: Object,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      oldPasswd: null,
      newPasswd: null,
      passwdCheck: null,
      passwordCheckRules: [
        (v) => !!v || 'Please enter the PASSWORD',
        (v) => this.newPasswd === this.passwdCheck || 'password is different',
        // (v) => /^[a-zA-Z0-9]{8,16}$/.test(v),
      ],
    }
  },
  computed: {
    ...mapState('validation', ['passwordRules']),
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('changePassword', this.oldPasswd, this.newPasswd)
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

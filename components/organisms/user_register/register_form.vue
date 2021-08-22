<template>
  <div class="pa-4">
    <v-form ref="emailForm" v-model="emailCheckValid" lazy-validation>
      <v-row align="center">
        <v-col>
          <TextFieldForm
            :required="!isDetail"
            :is-detail="isDetail || isMod"
            :input-content.sync="userInfo.user_email"
            :rules="isDetail ? [true] : emailRules"
            label="Email"
          />
        </v-col>
        <v-col v-if="!isDetail && !isMod" cols="12" sm="3">
          <CompButton text="email check" @sendEvent="emailCheck" />
        </v-col>
      </v-row>
    </v-form>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row v-if="!isMod">
        <v-col>
          <TextFieldForm
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="userInfo.passwd"
            :rules="isDetail || modUserInfo ? [true] : passwordRules"
            input-type="password"
            label="Password"
          />
        </v-col>
        <v-col v-if="!isDetail">
          <TextFieldForm
            :input-content.sync="passwdCheck"
            :rules="isDetail || modUserInfo ? [true] : passwordCheckRules"
            input-type="password"
            label="Password Check"
          />
        </v-col>
      </v-row>
      <v-row v-else-if="isAdmin || isMe">
        <v-col>
          <v-form ref="chkPwdForm" v-model="chkPwdvalid" lazy-validation>
            <TextFieldForm
              :input-content.sync="userInfo.passwd"
              :rules="passwordRules"
              input-type="password"
              label="Password"
            />
          </v-form>
        </v-col>
        <v-col sm="3">
          <CompButton text="change Password" @sendEvent="hasPasswdCheck" />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail || isMod"
            :input-content.sync="userInfo.passwd"
            :rules="isDetail ? [true] : passwordRules"
            label="Password"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TextFieldForm
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="userInfo.user_name"
            :rules="isDetail ? [true] : lastNameRules"
            label="Last Name"
          />
        </v-col>
        <v-col>
          <TextFieldForm
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="userInfo.user_surname"
            :rules="isDetail ? [true] : surNameRules"
            label="Surname"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TextFieldForm
            :required="!isDetail"
            :is-detail="isDetail"
            :input-content.sync="userInfo.phone_num"
            :rules="isDetail ? [true] : phoneNumberRules"
            label="Phone Number"
            placeholder="Please enter without hyphen(-)"
          />
        </v-col>
      </v-row>
      <v-row v-if="isDetail">
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content="splitBirthday.birthdayYear"
            :rules="[true]"
            label="Birthday Year"
          />
        </v-col>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content="splitBirthday.birthdayMonth"
            :rules="[true]"
            label="Birthday Month"
          />
        </v-col>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content="splitBirthday.birthdayDay"
            :rules="[true]"
            label="Birthday Day"
          />
        </v-col>
      </v-row>
      <v-row v-else align="center">
        <v-col>
          <v-select
            v-model="eachBirthday.birthdayYear"
            :items="optionBirthdayYears"
            :is-detail="isMod"
            :outlined="isMod"
            label="Birthday Year"
            @change="generateBirthday"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="eachBirthday.birthdayMonth"
            :items="optionBirthdayMonths"
            :is-detail="isMod"
            :outlined="isMod"
            label="Birthday Month"
            @change="generateBirthday"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="eachBirthday.birthdayDay"
            :items="optionBirthdayDays"
            :is-detail="isMod"
            :outlined="isMod"
            label="Birthday Day"
            @change="generateBirthday"
          ></v-select>
        </v-col>
        <v-col v-if="!isMod">
          <CompButton text="clear" @sendEvent="birthdayClear" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content.sync="userInfo.post_code"
            :rules="isDetail ? [true] : postCodeRules"
            label="Post Code"
            placeholder="Please enter without hyphen(-)"
          />
        </v-col>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content.sync="userInfo.user_addr1"
            :rules="isDetail ? [true] : stateRules"
            label="State"
          />
        </v-col>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content.sync="userInfo.user_addr2"
            :rules="isDetail ? [true] : cityRules"
            label="City/Town"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TextFieldForm
            :is-detail="isDetail"
            :input-content.sync="userInfo.user_addr3"
            :rules="isDetail ? [true] : otherAddrRules"
            label="Road/Building"
          />
        </v-col>
      </v-row>
      <v-row v-if="isAdmin">
        <v-col>
          <v-card color="#263238">
            <v-card-title>Permission</v-card-title>
            <v-divider></v-divider>
            <v-row justify="center">
              <v-radio-group v-model="userInfo.access" row>
                <v-radio
                  v-for="(radio, i) in radioInfo"
                  :key="i"
                  :label="radio.label"
                  :color="radio.color"
                  :value="radio.value"
                  :readonly="isDetail"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <ButtonForm
        :is-admin="isAdmin"
        :is-me="isMe"
        :user-status="userStatus"
        :is-detail="isDetail"
        :text="btnText"
        :is-btn-disabled="isBtnDisabled"
        @sendEvent="validate"
        @delData="destroy"
        @back="back"
      />
    </v-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TextFieldForm from '@/components/molecules/text_field'
import ButtonForm from '@/components/organisms/button_form'
import CompButton from '@/components/molecules/button'

export default {
  components: { TextFieldForm, ButtonForm, CompButton },
  props: {
    deUserInfo: {
      type: Object,
      required: false,
      default: () => {
        return null
      },
    },
    modUserInfo: {
      type: Object,
      required: false,
      default: () => {
        return null
      },
    },
    btnText: {
      type: String,
      required: true,
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
    isMod: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    btnDisabled: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
  },
  data() {
    return {
      valid: true,
      emailCheckValid: true,
      chkPwdvalid: true,
      chdUserInfo: {
        user_email: null,
        passwd: null,
        user_name: null,
        user_surname: null,
        phone_num: null,
        birthday: null,
        post_code: null,
        user_addr1: null,
        user_addr2: null,
        user_addr3: null,
        access: 0,
      },
      passwdCheck: null,
      passwordCheckRules: [
        (v) => !!v || 'Please enter the PASSWORD',
        (v) =>
          this.userInfo.passwd === this.passwdCheck || 'password is different',
        // (v) => /^[a-zA-Z0-9]{8,16}$/.test(v),
      ],
      eachBirthday: {
        birthdayYear: null,
        birthdayMonth: null,
        birthdayDay: null,
      },
      radioInfo: [
        { label: 'Administrator', color: 'primary', value: 9 },
        { label: 'Manager', color: 'secondary', value: 8 },
        { label: 'Member', color: 'success', value: 0 },
      ],
    }
  },
  computed: {
    ...mapState('validation', [
      'emailRules',
      'passwordRules',
      'surNameRules',
      'lastNameRules',
      'phoneNumberRules',
      'postCodeRules',
      'stateRules',
      'cityRules',
      'otherAddrRules',
    ]),
    ...mapState('birthday', [
      'optionBirthdayYears',
      'optionBirthdayMonths',
      'optionBirthdayDays',
      'splitBirthday',
    ]),
    userInfo() {
      return this.deUserInfo || this.modUserInfo || this.chdUserInfo
    },
    userStatus() {
      return this.userInfo.status
    },
    isBtnDisabled() {
      return !!this.btnDisabled
    },
    isDetail() {
      return !!this.deUserInfo
    },
  },
  async created() {
    this.setSelBirthday()
    if (!new Set(Object.values(this.userInfo)).has(null)) {
      await this.setBirthdayInput()
    }
  },
  methods: {
    ...mapMutations('birthday', ['setSelBirthday', 'setBirthday']),
    setBirthdayInput() {
      this.setBirthday(this.userInfo.birthday)
      this.eachBirthday = JSON.parse(JSON.stringify(this.splitBirthday))
    },
    generateBirthday() {
      this.userInfo.birthday =
        this.eachBirthday.birthdayYear +
        '/' +
        this.eachBirthday.birthdayMonth +
        '/' +
        this.eachBirthday.birthdayDay
    },
    birthdayClear() {
      this.eachBirthday.birthdayYear = null
      this.eachBirthday.birthdayMonth = null
      this.eachBirthday.birthdayDay = null
      this.userInfo.birthday = null
    },
    emailCheck() {
      if (this.$refs.emailForm.validate()) {
        this.$emit('emailCheck', this.userInfo.user_email)
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('sendEvent', this.userInfo)
      }
    },
    hasPasswdCheck() {
      if (this.$refs.chkPwdForm.validate()) {
        this.$emit('hasPasswdCheck', {
          id: this.userInfo.id,
          user_email: this.userInfo.user_email,
          passwd: this.userInfo.passwd,
        })
      }
    },
    destroy() {
      this.$emit('destroy', this.userInfo.id)
    },
    back() {
      this.$emit('back')
    },
  },
}
</script>

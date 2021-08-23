<template>
  <v-card>
    <v-toolbar flat :color="colorTitle.color">
      <v-toolbar-title>{{ colorTitle.title }}</v-toolbar-title>
    </v-toolbar>
    <div class="pa-4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.user_name"
              :rules="lastNameRules"
              :prepend-inner-icon="prependInnerIcon"
              type="text"
              label="Last Name"
              clearable
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.user_surname"
              :prepend-inner-icon="prependInnerIcon"
              :rules="surNameRules"
              type="text"
              label="Surname"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.phone_num"
              :prepend-inner-icon="prependInnerIcon"
              :rules="phoneNumberRules"
              label="Phone Number"
              placeholder="Please enter without hyphen(-)"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.post_code"
              :prepend-inner-icon="prependInnerIcon"
              :rules="orderPostCodeRules"
              label="Post Code"
              placeholder="Please enter without hyphen(-)"
              clearable
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.user_addr1"
              :prepend-inner-icon="prependInnerIcon"
              :rules="orderStateRules"
              label="State"
              clearable
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.user_addr2"
              :prepend-inner-icon="prependInnerIcon"
              :rules="orderCityRules"
              label="City/Town"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="orderUserInfo.user_addr3"
              :prepend-inner-icon="prependInnerIcon"
              :rules="orderOtherAddrRules"
              label="Road/Building"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              block
              large
              depressed
              color="#424242"
              class="white--text"
              @click="validate"
              >confirm</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              block
              large
              depressed
              color="#424242"
              class="white--text"
              @click="clear"
              >clear</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    deOrderUserInfo: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    colorTitle: {
      type: Object,
      default() {
        return {
          title: 'New User Information',
          color: '#0D47A1',
        }
      },
    },
  },
  data() {
    return {
      valid: true,
      prependInnerIcon: 'mdi-star-circle',
      chOrderUserInfo: {
        user_id: null,
        user_name: null,
        user_surname: null,
        phone_num: null,
        post_code: null,
        user_addr1: null,
        user_addr2: null,
        user_addr3: null,
      },
    }
  },
  computed: {
    ...mapState('validation', [
      'surNameRules',
      'lastNameRules',
      'phoneNumberRules',
      'orderPostCodeRules',
      'orderStateRules',
      'orderCityRules',
      'orderOtherAddrRules',
    ]),
    orderUserInfo() {
      return this.deOrderUserInfo || this.chOrderUserInfo
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('sendOrderUserInfo', this.orderUserInfo)
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>

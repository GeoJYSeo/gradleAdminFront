<template>
  <v-card>
    <v-toolbar flat color="#1B5E20">
      <v-toolbar-title>Order User Information</v-toolbar-title>
    </v-toolbar>
    <ProgressLiner v-if="!orderUserInfo" />
    <div v-else class="pa-4">
      <v-row>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.user_name"
            type="text"
            label="Last Name"
            disabled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.user_surname"
            type="text"
            label="Surname"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.phone_num"
            label="Phone Number"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.post_code"
            label="Post Code"
            disabled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.user_addr1"
            label="State"
            disabled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.user_addr2"
            label="City/Town"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="orderUserInfo.user_addr3"
            label="Road/Building"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="!summary">
        <v-col>
          <v-btn
            block
            large
            depressed
            color="#424242"
            class="white--text"
            @click="sendOrderInfo"
            >Use This Address</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            block
            large
            depressed
            color="#424242"
            class="white--text"
            @click="modOrderUserInfo"
            >modify</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-btn
            block
            large
            depressed
            color="#424242"
            class="white--text"
            @click="sendConfirm"
            >confirm</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import ProgressLiner from '@/components/molecules/progress_liner'

export default {
  components: { ProgressLiner },
  props: {
    orderUserInfo: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
    summary: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      childOrderUserInfo: this.orderUserInfo,
    }
  },
  methods: {
    sendOrderInfo() {
      this.$emit('sendOrderInfo')
    },
    modOrderUserInfo() {
      this.$emit('modOrderUserInfo')
    },
    sendConfirm() {
      this.$emit('sendConfirm')
    },
  },
}
</script>

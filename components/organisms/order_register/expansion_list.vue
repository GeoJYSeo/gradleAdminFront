<template>
  <v-card color="#263238">
    <v-row class="px-5" align="center">
      <v-card-title>Payment Methods</v-card-title>
      <v-spacer />
      <v-btn icon dark @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
        v-for="(item, index) in paymentTypes"
        :key="index"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item-content class="px-7">
          <v-row v-if="item.title !== 'Paypal'" align="center" justify="center">
            <v-col>
              <v-select
                v-model="paymentType"
                :items="item.contents"
                :label="item.selectLabel"
              ></v-select>
            </v-col>
            <v-col sm="3">
              <v-btn block @click="selectPayment">Select</v-btn>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-list-item-title>{{ paypalText }}</v-list-item-title>
            </v-col>
            <v-col sm="3">
              <v-btn block @click="selectPayment">Select</v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      paymentTypes: [
        {
          icon: 'mdi-credit-card-outline',
          title: 'Card(Credit/Debit)',
          contents: ['VISA', 'MASTER', 'MAESTRO', 'AMERICAN EXPRESS', 'JBC'],
          selectLabel: 'Select the card company',
        },
        {
          icon: 'mdi-cash-usd-outline',
          title: 'Cash',
          contents: ['Bank1', 'Bank2', 'Bank3'],
          selectLabel: 'Select the bank',
        },
        {
          icon: 'mdi-contactless-payment-circle-outline',
          title: 'Paypal',
          contents: [{ title: 'List' }],
        },
      ],
      paypalText: 'When you check out it, Redirect to Paypal.',
      paymentType: null,
    }
  },
  methods: {
    selectPayment() {
      this.paymentType = this.paymentType || 'Paypal'
      this.$emit('sendPaymentType', this.paymentType)
    },
    closeDialog() {
      this.$emit('closeDialog', false)
    },
  },
}
</script>

export const state = () => ({
  emailRules: [
    (v) => !!v || 'Please enter the EMAIL',
    (v) =>
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
        v
      ) || 'Email is invalid',
  ],
  passwordRules: [
    (v) => !!v || 'Please enter the PASSWORD',
    // (v) => /^[a-zA-Z0-9]{8,16}$/.test(v) || 'Password is invalid',
  ],
  passwordRulesForMod: [
    // (v) => /^[a-zA-Z0-9]{8,16}$/.test(v) || 'Password is invalid',
  ],
  surNameRules: [
    (v) => !!v || 'Please enter the SURNAME',
    (v) => /^[a-zA-Z]{1,24}$/.test(v) || 'Invalid User SURNAME',
  ],
  lastNameRules: [
    (v) => !!v || 'Please enter the LAST NAME',
    (v) => /^[a-zA-Z]{1,24}$/.test(v) || 'Invalid User LAST Name',
  ],
  phoneNumberRules: [
    (v) => !!v || 'Please enter the PHONE NUMBER',
    (v) => /^[0-9]{11}$/.test(v) || 'Invalid Phone Number',
  ],
  postCodeRules: [(v) => /^[0-9]{7}|null$/.test(v) || 'Invalid Post code'],
  stateRules: [(v) => /^[a-zA-Z]{1,100}$/.test(v) || 'Invalid State'],
  cityRules: [(v) => /^[a-zA-Z]{1,100}$/.test(v) || 'Invalid City/Town'],
  otherAddrRules: [
    (v) => /^[a-zA-Z0-9\s]{1,100}$/.test(v) || 'Invalid Address',
  ],
  cateNameRules: [
    (v) => !!v || 'Please enter the CATEGORY NAME',
    (v) => /^[a-zA-Z0-9_]{1,24}$/.test(v) || 'Invalid Category Name',
  ],
  cateCodeRules: [
    (v) => !!v || 'Please enter the CATEGORY CODE',
    (v) => /^[a-zA-Z0-9]{1,50}$/.test(v) || 'Invalid Category Code',
  ],
  cateCodeRefRules: [
    (v) => !!v || 'Please enter the CATEGORY CODE REFERENCE',
    (v) => /^[a-zA-Z0-9]{1,50}$/.test(v) || 'Invalid Category Code Reference',
  ],
  selCateCodeRules: [(v) => !!v || 'Please select the CATEGORY CODE'],
  selCateCodeRefRules: [
    (v) => !!v || 'Please select the CATEGORY CODE REFERENCE',
  ],
  gdsNameRules: [
    (v) => !!v || 'Please enter the GOODS NAME',
    (v) => /^[a-zA-Z0-9\s]{1,24}$/.test(v) || 'Invalid Goods Name',
  ],
  priceRules: [
    (v) => !!v || 'Please enter the GOODS Price',
    (v) => /^\d{1,20}(?:[.]\d{1,4})?$/.test(v) || 'Invalid Goods price',
    (v) => !String(v).startsWith('0') || 'Invalid price format',
  ],
  stockRules: [
    (v) => !!v || 'Please enter the GOODS STOCK',
    (v) => /^[0-9]{1,9}$/.test(v) || 'Invalid Goods stock',
    (v) => !String(v).startsWith('0') || 'Invalid stock format',
  ],
  orderPostCodeRules: [
    (v) => !!v || 'Please enter the POST CODE',
    (v) => /^[0-9]{7}$/.test(v) || 'Invalid Post code',
  ],
  orderStateRules: [
    (v) => !!v || 'Please enter the STATE',
    (v) => /^[a-zA-Z]{1,100}$/.test(v) || 'Invalid State',
  ],
  orderCityRules: [
    (v) => !!v || 'Please enter the CITY/TOWN',
    (v) => /^[a-zA-Z]{1,100}$/.test(v) || 'Invalid City/Town',
  ],
  orderOtherAddrRules: [
    (v) => !!v || 'Please enter the OTHER ADDRESS',
    (v) => /^[a-zA-Z0-9\s]{1,100}$/.test(v) || 'Invalid Address',
  ],
  commentRules: [(v) => !!v || 'Please enter the Comment'],
})

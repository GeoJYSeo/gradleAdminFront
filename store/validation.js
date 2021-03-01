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
    (v) => /^[a-zA-Z]{1,24}$/.test(v) || 'User SURNAME is invalid',
  ],
  lastNameRules: [
    (v) => !!v || 'Please enter the LAST NAME',
    (v) => /^[a-zA-Z]{1,24}$/.test(v) || 'User LAST Name is invalid',
  ],
  phoneNumberRules: [
    (v) => !!v || 'Please enter the PHONE NUMBER',
    (v) => /^[0-9]{11}$/.test(v) || 'Phone Number is invalid',
  ],
  postCodeRules: [(v) => /^[0-9]{7}|null$/.test(v) || 'Post code is invalid'],
  stateRules: [(v) => /^[a-zA-Z]{1,100}$/.test(v) || 'State is invalid'],
  cityRules: [(v) => /^[a-zA-Z]{1,100}$/.test(v) || 'City/Town is invalid'],
  otherAddrRules: [
    (v) => /^[a-zA-Z0-9\s]{1,100}$/.test(v) || 'Address is invalid',
  ],
  cateNameRules: [
    (v) => !!v || 'Please enter the CATEGORY NAME',
    (v) => /^[a-zA-Z0-9_]{1,24}$/.test(v) || 'Category Name is invalid',
  ],
  cateCodeRules: [
    (v) => !!v || 'Please enter the CATEGORY CODE',
    (v) => /^[a-zA-Z0-9]{1,50}$/.test(v) || 'Category Code is invalid',
  ],
  cateCodeRefRules: [
    (v) => !!v || 'Please enter the CATEGORY CODE REFERENCE',
    (v) =>
      /^[a-zA-Z0-9]{1,50}$/.test(v) || 'Category Code Reference is invalid',
  ],
  selCateCodeRules: [(v) => !!v || 'Please select the CATEGORY CODE'],
  selCateCodeRefRules: [
    (v) => !!v || 'Please select the CATEGORY CODE REFERENCE',
  ],
  gdsNameRules: [
    (v) => !!v || 'Please enter the GOODS NAME',
    (v) => /^[a-zA-Z0-9]{1,24}$/.test(v) || 'Goods Name is invalid',
  ],
  priceRules: [
    (v) => !!v || 'Please enter the GOODS NAME',
    (v) =>
      /^[-]?\d{1,999999}(?:[.]\d{1,4})?$/.test(v) || 'Goods price is invalid',
  ],
  stockRules: [
    (v) => !!v || 'Please enter the GOODS STOCK',
    (v) => /^[0-9]{1,999999}$/.test(v) || 'Goods stock is invalid',
  ],
  orderPostCodeRules: [
    (v) => !!v || 'Please enter the POST CODE',
    (v) => /^[0-9]{7}$/.test(v) || 'Post code is invalid',
  ],
  orderStateRules: [
    (v) => !!v || 'Please enter the STATE',
    (v) => /^[a-zA-Z]{1,100}$/.test(v) || 'State is invalid',
  ],
  orderCityRules: [
    (v) => !!v || 'Please enter the CITY/TOWN',
    (v) => /^[a-zA-Z]{1,100}$/.test(v) || 'City/Town is invalid',
  ],
  orderOtherAddrRules: [
    (v) => !!v || 'Please enter the OTHER ADDRESS',
    (v) => /^[a-zA-Z0-9\s]{1,100}$/.test(v) || 'Address is invalid',
  ],
  commentRules: [(v) => !!v || 'Please enter the Comment'],
})

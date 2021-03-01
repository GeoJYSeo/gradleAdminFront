export const state = () => ({
  optionBirthdayYears: [],
  optionBirthdayMonths: [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  optionBirthdayDays: [],
  splitBirthday: {
    birthdayYear: null,
    birthdayMonth: null,
    birthdayDay: null,
  },
})

export const mutations = {
  setSelBirthday(state) {
    const today = new Date()
    let yearNow = today.getFullYear()
    while (yearNow >= 1900) {
      state.optionBirthdayYears.push(String(yearNow))
      yearNow--
    }
    let day = 1
    while (day < 32) {
      state.optionBirthdayDays.push(String(day))
      day++
    }
  },
  setBirthday(state, birthday) {
    const ymdBirthday = birthday.split('/')
    state.splitBirthday.birthdayYear = ymdBirthday[0]
    state.splitBirthday.birthdayMonth = ymdBirthday[1]
    state.splitBirthday.birthdayDay = ymdBirthday[2]
  },
}

/* eslint-disable no-useless-escape */
const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const numberRegex = /\d/

export default function checkPassword(password) {
  if (password.length < 7) {
    return 'Password must be atleast 8 characters long'
  } else if (!numberRegex.test(password)) {
    return 'Password must include a number'
  } else if (!specialCharsRegex.test(password)) {
    return 'Password must contain a special character'
  }
  return ''
}

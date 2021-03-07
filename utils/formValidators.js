import {
  forEach,
  size,
  get,
  isEmpty,
  toString,
  filter,
  reduce,
  keys,
} from 'lodash'
import { SubmissionError } from 'redux-form'

export const fieldTypes = {
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  make: 'make',
  model: 'model',
  color: 'color',
  username: 'username',
  urgent: 'urgent',
  description: 'description',
  featured: 'featured', // custom field
  fuel: 'fuel',
  mileage: 'mileage',
  power: 'power',
  capacity: 'capacity',
  gearbox: 'transmission',
  bodyType: 'bodyType',
  price: 'price',
  year: 'year',
  remember: 'remember',
  regNumber: 'regNumber',
  fuelTankCapacity: 'fuelTankCapacity',
  consumptionCombined: 'consumptionCombined',
  consumptionHighway: 'consumptionHighway',
  consumptionUrban: 'consumptionUrban',
  VIN: 'VIN',
}

export const autoCompleteFields = {
  [fieldTypes.password]: 'current-password',
  [fieldTypes.username]: 'username',
  [fieldTypes.firstName]: 'given-name',
  [fieldTypes.lastName]: 'family-name',
}

const emailIsCorrect = (email) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )

const isPasswordComplex = (password) => size(password) >= 6

export const emailValidator = (value) =>
  emailIsCorrect(value) || size(value) === 0
    ? undefined
    : 'errors.invalid_email'

export const passwordValidator = (value) =>
  isPasswordComplex(value) || size(value) === 0
    ? undefined
    : 'errors.weak_password'

export const validateRequiredFields = (values, requiredFields) => {
  const errors = reduce(
    requiredFields,
    (result, field) => {
      if (!get(values, field))
        return {
          ...result,
          [field]: 'errors.required_field',
        }
      return result
    },
    {}
  )
  if (!isEmpty(errors)) throw new SubmissionError(errors)
  else return true
}

export const validators = {
  [fieldTypes.newPassword]: [passwordValidator],
  [fieldTypes.email]: [emailValidator],
}

export const findEmptyFields = (data, requiredFields) =>
  filter(
    requiredFields,
    (field) => isEmpty(data[field]) || !toString(data[field]).trim().length
  )

export const validateFormData = (values, requiredFields) => {
  const data = keys(values)
  const errors = {}
  const missing = findEmptyFields(values, requiredFields)
  reduce(
    missing,
    (result, field) => {
      errors[field] = 'errors.required_field'
      return result
    },
    {}
  )
  forEach(data, (field) => {
    const type = fieldTypes[field]
    const value = values[field]
    if (type && requiredFields.includes(type)) {
      const validatorsList = validators[type]
      forEach(validatorsList, (validator) => {
        const result = validator && validator(value, values)
        if (result) {
          errors[field] = result
        }
      })
    }
  })
  if (!isEmpty(errors)) throw new SubmissionError(errors)
  else return true
}

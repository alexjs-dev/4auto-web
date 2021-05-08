import {
  forEach,
  size,
  get,
  isEmpty,
  toString,
  filter,
  reduce,
  keys,
  toNumber,
  isNumber,
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
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  urgent: 'urgent',
  description: 'description',
  featured: 'featured', // custom field
  fuel: 'fuel',
  locationId: 'locationId',
  mileage: 'mileage',
  images: 'images',
  year: 'year',
  month: 'month',
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

export const powerValidator = (value) =>
  !value || value === '' || toNumber(value) < 10
    ? 'errors.invalidVehiclePower'
    : undefined

export const capacityValidator = (value) =>
  !value || value === '' || toNumber(value) <= 0.1
    ? 'errors.invalidVehicleCapacity'
    : undefined

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
  [fieldTypes.power]: [powerValidator],
  [fieldTypes.capacity]: [capacityValidator],
}

export const findEmptyFields = (values, requiredFields) =>
  filter(requiredFields, (field) => {
    const value = get(values, field)
    return (
      (isEmpty(value) && !isNumber(value)) || !toString(value).trim().length
    )
  })

export const validateFormData = (values, requiredFields, options) => {
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
  if (!isEmpty(errors)) {
    const cb = get(options, 'cb')
    if (cb) {
      cb()
    }
    if (get(options, 'scrollToError')) {
      const key = Object.keys(errors)[0]
      const element = document.getElementById(`field-${key}`)
      const headerOffset = 90

      if (element && window) {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }

    throw new SubmissionError(errors)
  } else return true
}

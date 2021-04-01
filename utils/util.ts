import { fieldTypes } from './formValidators'

export const FORMS = {
  1: 'createListingBaseForm',
  2: 'createListingGeneralForm',
  3: 'createListingListingForm',
}

export const requiredFields = {
  1: [fieldTypes.regNumber],
  2: [
    fieldTypes.make,
    fieldTypes.model,
    fieldTypes.fuel,
    fieldTypes.gearbox,
    fieldTypes.bodyType,
    fieldTypes.year,
    fieldTypes.month,
    fieldTypes.mileage,
    fieldTypes.power,
    fieldTypes.capacity,
    fieldTypes.consumptionCombined,
    fieldTypes.consumptionHighway,
    fieldTypes.consumptionUrban,
  ],
  3: [fieldTypes.price, fieldTypes.images],
}

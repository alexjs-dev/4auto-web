import { reduce, get } from 'lodash'
import moment from 'moment'
import { bodyType as bodyTypes } from '~consts/vehicle'

export const mapBaseOptions = (array, key = '_id', label = 'name') =>
  reduce(
    array,
    (acc, item) => {
      acc[get(item, key)] = {
        value: get(item, key),
        label: get(item, label),
      }
      return acc
    },
    {}
  )

export const mapVehicleTranslatableOptions = (type, t) =>
  reduce(
    type,
    (acc, key) => {
      acc[key] = {
        value: key,
        label: t(`vehicle.${key}`),
      }
      return acc
    },
    {}
  )

export const formatThousandNumbers = (n, t) =>
  n < 1e3 ? n : `${+(Math.floor(n) / 1e3).toFixed(0)}${t('label.k')}`

export const formatMillage = (mileage, t) =>
  `${formatThousandNumbers(mileage, t)} ${t('label.km')}`

export const formatCapacity = (capacity, t) =>
  capacity > 0 ? `${(capacity / 1000).toFixed(1)} ${t('label.l')}` : ''

export const formatVehicleMainLabel = (bodyType, regDate, t, shorten) => {
  const title = t(`vehicle.${bodyTypes[bodyType]}`)
  return `${shorten ? title.substring(0, 3) : title}, ${regDate}`
}

export const formatPriceWithDiscount = (price, discount) => {
  let result = price
  if (discount > 0) result = Math.floor(price - (price * discount) / 100)
  return result
}

export const getVehicleCardProps = (props) => {
  const {
    _id,
    vehicle,
    price,
    location,
    discountPercentage,
    urgent,
    recommendedUntil,
    featuredUntil,
  } = props
  const { city, countryCode, country } = location
  const {
    regDate,
    power,
    capacity,
    mileage,
    bodyType,
    fuel,
    transmission,
    images,
    ...rest
  } = vehicle
  const model = get(vehicle, 'model.name', '')
  const make = get(vehicle, 'model.make.name', '')
  return {
    _id,
    ...rest,
    model,
    make,
    regDate,
    power,
    capacity,
    mileage,
    bodyType,
    price,
    discountPercentage:
      discountPercentage && discountPercentage > 0 ? discountPercentage : null,
    fuel,
    transmission,
    city,
    countryCode,
    country,
    urgent,
    featured: moment().isBefore(moment(featuredUntil)),
    recommended: moment().isBefore(moment(recommendedUntil)),
    images,
  }
}

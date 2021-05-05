import moment from 'moment'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
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
  return `${shorten ? title.substring(0, 3) : title}, ${moment(regDate).format(
    'MM/YY'
  )}`
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
  const city = get(location, 'city')
  const countryCode = get(location, 'countryCode')
  const country = get(location, 'country')
  const regDate = get(vehicle, 'regDate', new Date())
  const {
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
    listingId: _id,
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

export const toQueryString = (values) => {
  // replace URIEncode
  // works the same way, but supports objects by combining root key + object key=value
  const result = map(values, (value, key) => {
    if (isString(value)) {
      return `${key}=${value}`
    }
    if (isArray(value)) {
      const array = value.join('%2C')
      return `${key}=${array}`
    }
    if (isObject(value)) {
      const object = reduce(
        value,
        (prev, curr, k) => {
          if (!prev) return `${key}${k}=${curr}`
          return `${key}${k}=${curr}&${prev}`
        },
        ''
      )
      return object
    }
  })
    .join('&')
    .replace(/^\$/, '')
  return result
}

export const toQueryBasic = (values) => {
  // basic submit for nextjs, only handle objects
  return reduce(
    values,
    (prev, curr, key) => {
      let object = null
      if (!prev) prev = {}
      console.log('curr', curr)
      console.log('prev', prev)
      console.log('key', key)
      if (isObject(curr) && !isArray(curr)) {
        // { min: 1000, max: 2000 }
        object = reduce(
          curr,
          (prev, curr, k) => {
            return {
              ...prev,
              [`${key}${k}`]: curr,
            }
          },
          {}
        )
      }
      return {
        ...prev,
        ...(curr ? { [key]: curr } : {}),
        ...((object && object) || {}),
      }
    },
    {}
  )
}

export const getVehicleTitle = (vehicle, t) =>
  (vehicle &&
    `${vehicle.make} ${vehicle.model} ${vehicle.power} ${t(
      'label.kw'
    )} ${formatCapacity(vehicle.capacity, t)}`) ||
  ''

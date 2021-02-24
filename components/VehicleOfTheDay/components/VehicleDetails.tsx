import React from 'react'
import { GiCarWheel, GiGasPump, GiSpeedometer } from 'react-icons/gi'
import { FiMapPin, FiGitPullRequest, FiTag } from 'react-icons/fi'
import useViewport from '../../../hooks/useViewport'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import classNames from 'classnames'
import { formatVehicleMainLabel } from '../../../utils/helpers'
import { useTranslation } from 'react-i18next'
import {
  transmissionTypes,
  fuelTypes,
  colorCodes,
} from '../../../consts/vehicle'
import { VehicleDetail } from '../..'
import ListingType from '../../../types/listing'
import styles from '../VehicleOfTheDay.module.scss'

type Props = {
  listing: ListingType
  fullHeight?: boolean // no scroll, remove fixed height
}

const VehicleDetails: React.FunctionComponent<Props> = ({
  listing,
  fullHeight,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useViewport()
  const { vehicle } = listing
  const vehicleBodyYear = formatVehicleMainLabel(
    vehicle.bodyType,
    vehicle.regDate,
    t,
    isMobile
  )
  return (
    <div
      className={classNames(
        styles.vehicleDetails,
        fullHeight && styles.vehicleDetailsFullHeight
      )}
    >
      <VehicleDetail
        icon={<FiTag />}
        title={`${t('label.bodyType')} ${t('label.year')}`}
      >
        {vehicleBodyYear}
      </VehicleDetail>
      <VehicleDetail icon={<FiMapPin />} title={t('label.location')}>
        {`${listing.location.city} ${listing.location.countryCode}`}
      </VehicleDetail>
      <VehicleDetail icon={<FiGitPullRequest />} title={t('label.gearbox')}>
        {t(`vehicle.${get(transmissionTypes, vehicle.transmission, '')}`)}
      </VehicleDetail>
      <VehicleDetail icon={<GiCarWheel />} title={t('label.mileage')}>
        {vehicle.mileage}
      </VehicleDetail>
      <VehicleDetail icon={<GiGasPump />} title={t('label.fuel')}>
        {t(`vehicle.${get(fuelTypes, vehicle.fuel, '')}`)}
      </VehicleDetail>
      <VehicleDetail icon={<FiTag />} title={t('label.labelConsCity')}>
        {vehicle.consumptionUrban} {t('label.litersIn100Km')}
      </VehicleDetail>
      {vehicle.color && (
        <VehicleDetail icon={<FiTag />} title={t('label.color')}>
          <div
            style={{
              width: 8,
              display: 'inline-block',
              height: 8,
              borderRadius: '50%',
              marginRight: 4,
              background: vehicle.color && colorCodes[vehicle.color],
            }}
          />
          {t(`colors.${vehicle.color}`)}
        </VehicleDetail>
      )}
      {!isNil(vehicle.accelerationZeroToHundred) &&
        vehicle.accelerationZeroToHundred > 0 && (
          <VehicleDetail icon={<GiSpeedometer />} title={t('label.speedTo100')}>
            {vehicle.accelerationZeroToHundred} {t('label.seconds')}
          </VehicleDetail>
        )}
    </div>
  )
}

export default VehicleDetails

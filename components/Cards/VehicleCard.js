import React, { useState, useRef } from 'react'
import { find } from 'lodash'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  FiMapPin,
  FiMoreVertical,
  FiGitPullRequest,
  FiDisc,
  FiHeart,
} from 'react-icons/fi'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import { BaseButton, Button } from '~components'
import {
  formatMillage,
  formatCapacity,
  formatVehicleMainLabel,
} from '~utils/helpers'
import useViewport from '~hooks/useViewport'
import useOutsideClick from '~hooks/useOutsideClick'
import { transmissionTypes, fuelTypes } from '~consts/vehicle'
import VehicleCardRibbons from './VehicleCardRibbons'
import VehicleCardOverlay from './VehicleCardOverlay'
import styles from './VehicleCard.module.scss'

const VehicleCard = ({
  _id,
  model,
  make,
  regDate,
  power,
  capacity,
  mileage,
  bodyType,
  price,
  discountPercentage,
  fuel,
  transmission,
  city,
  countryCode,
  country,
  urgent,
  featured,
  recommended,
  images, // handle re-render
}) => {
  const ref = useRef(null)
  const [overlayActive, setOverlayActive] = useState(false)
  const { isMobile } = useViewport()
  useOutsideClick({ ref, isOpen: overlayActive, setOpen: setOverlayActive })
  const image = find(images, (image) => image.order === 0)
  const { t } = useTranslation()
  const vehicleBodyYear = formatVehicleMainLabel(bodyType, regDate, t, isMobile)
  const vehicleMileage = isMobile ? mileage : formatMillage(mileage, t)
  const vehicleL = formatCapacity(capacity, t)
  const vehicleTitle = `${make} ${model} ${power} ${t('label.kw')} ${vehicleL}`
  return (
    <div className={styles.container} ref={ref}>
      <VehicleCardRibbons
        urgent={urgent}
        featured={featured}
        recommended={recommended}
        visible={!overlayActive}
      />
      <BaseButton className={styles.likeButton}>
        <FiHeart />
      </BaseButton>
      <VehicleCardOverlay
        visible={overlayActive}
        onClose={() => setOverlayActive(false)}
      >
        <div className={styles.overlayContent}>
          <Button
            type={Button.types.GHOST}
            fluid
            onClick={() => {}}
            className={styles.overlayButton}
          >
            {t('button.contact')}
          </Button>
          <Button
            type={Button.types.GHOST}
            fluid
            onClick={() => {}}
            className={styles.overlayButton}
          >
            {t('button.share')}
          </Button>
        </div>
      </VehicleCardOverlay>
      <div className={styles.image}>
        <img src={image?.url || ''} alt={t('vehicle.vehicle')} />
      </div>
      <div className={styles.content}>
        <h6>{vehicleTitle}</h6>
        <div className={styles.features}>
          <div className={styles.feature}>
            <GiCarWheel />
            <span>{vehicleBodyYear}</span>
          </div>
          <div className={styles.feature}>
            <FiMapPin />
            <span>{`${city}, ${countryCode}`}</span>
          </div>
          <div className={styles.feature}>
            <FiGitPullRequest />
            <span>{t(`vehicle.${transmissionTypes[transmission]}`)}</span>
          </div>
          <div className={styles.feature}>
            <FiDisc />
            <span>{vehicleMileage}</span>
          </div>
          <div className={styles.feature}>
            {fuel === fuelTypes.electric ? <GiElectric /> : <GiGasPump />}
            <span>{t(`vehicle.${fuelTypes[fuel]}`)}</span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.prices}>
          {discountPercentage && (
            <span className={styles.price}>{`${
              price * discountPercentage
            }€`}</span>
          )}
          <span
            className={classNames(
              styles.price,
              discountPercentage && styles.hasDiscount
            )}
          >
            {`${price}€`}
          </span>
        </div>
        <BaseButton
          className={styles.moreButton}
          onClick={() => setOverlayActive(true)}
        >
          <FiMoreVertical />
        </BaseButton>
      </div>
    </div>
  )
}

export default VehicleCard
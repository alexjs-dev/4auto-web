import React, { useState, useRef } from 'react'
import find from 'lodash/find'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import {
  FiMapPin,
  FiMoreVertical,
  FiGitPullRequest,
  FiDisc,
} from 'react-icons/fi'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import Lottie from 'lottie-react'
import { BaseButton, VehicleDetail } from '~components'
import {
  formatMillage,
  getVehicleTitle,
  formatVehicleMainLabel,
} from '~utils/helpers'
import VehicleCardScreen from './VehicleCardScreen/VehicleCardScreen'
import HeartAnimation from '~public/animations/heart.json'
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
  const heartRef = useRef(null)
  const vehicleTitle = getVehicleTitle({ make, model, power, capacity }, t)

  const isLiked = useRef(true)

  const lottieAnimation = {
    animationData: HeartAnimation, // dur: 60 frames
    loop: false,
    autoplay: false,
    lottieRef: heartRef,
    onDOMLoaded: () =>
      isLiked.current &&
      heartRef.current &&
      heartRef.current.goToAndStop(60, true),
    style: {
      width: '32px',
      height: '32px',
    },
  }

  const setVehicleFavorite = () => {
    isLiked.current = !isLiked.current
    if (heartRef.current) {
      heartRef.current.setDirection(isLiked.current ? 1 : -1)
      heartRef.current.play()
    }
  }

  return (
    <div className={styles.container} ref={ref}>
      <VehicleCardRibbons
        urgent={urgent}
        featured={featured}
        recommended={recommended}
        visible={!overlayActive}
      />
      <button
        className={styles.likeButton}
        onClick={() => setVehicleFavorite()}
      >
        <Lottie {...lottieAnimation} />
      </button>
      <VehicleCardOverlay
        visible={overlayActive}
        onClose={() => setOverlayActive(false)}
      >
        <VehicleCardScreen />
      </VehicleCardOverlay>
      <div className={styles.image}>
        <BaseButton
          isInternalLink
          href={`/vehicle/${_id}`}
          className={styles.imageLink}
        >
          <img
            src={image?.url || ''}
            draggable="false"
            alt={t('vehicle.vehicle')}
          />
        </BaseButton>
      </div>
      <div className={styles.content}>
        <BaseButton
          className={styles.title}
          isInternalLink
          href={`/vehicle/${_id}`}
        >
          {vehicleTitle}
        </BaseButton>
        <div className={styles.features}>
          <VehicleDetail icon={<GiCarWheel />}>{vehicleBodyYear}</VehicleDetail>
          <VehicleDetail
            icon={fuel === fuelTypes.electric ? <GiElectric /> : <GiGasPump />}
          >
            {t(`vehicle.${fuelTypes[fuel]}`)}
          </VehicleDetail>
          <VehicleDetail icon={<FiGitPullRequest />}>
            {t(`vehicle.${transmissionTypes[transmission]}`)}
          </VehicleDetail>
          <VehicleDetail icon={<FiDisc />}>{vehicleMileage}</VehicleDetail>
          <VehicleDetail
            icon={<FiMapPin />}
          >{`${city}, ${countryCode}`}</VehicleDetail>
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
        <button
          className={styles.moreButton}
          onClick={() => setOverlayActive(true)}
        >
          <FiMoreVertical />
        </button>
      </div>
    </div>
  )
}

export default React.memo(VehicleCard)

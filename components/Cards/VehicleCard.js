import React, { useState, useRef, useEffect } from 'react'
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
import { Player } from '@lottiefiles/react-lottie-player'
import { BaseButton, VehicleDetail } from '~components'
import {
  formatMillage,
  formatCapacity,
  formatVehicleMainLabel,
} from '~utils/helpers'
import VehicleCardScreen from './VehicleCardScreen/VehicleCardScreen'
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
  const heartRef = useRef(null)
  const vehicleTitle = `${make} ${model} ${power} ${t('label.kw')} ${vehicleL}`

  const onCompleteAnimation = () => {
    if (heartRef.current) {
      heartRef.current.setSeeker('100%')
    }
  }

  useEffect(() => {
    if (heartRef.current) {
      //  heartRef.current.addEventListener('complete', onCompleteAnimation)
    }
    return () => {
      // heartRef.current.removeEventListener('complete', onCompleteAnimation)
    }
  }, [heartRef])

  return (
    <div className={styles.container} ref={ref}>
      <VehicleCardRibbons
        urgent={urgent}
        featured={featured}
        recommended={recommended}
        visible={!overlayActive}
      />
      <BaseButton
        className={styles.likeButton}
        onClick={() => heartRef.current && heartRef.current.play()}
      >
        <Player
          autoplay={false}
          loop={false}
          controls={false}
          ref={heartRef}
          src="https://assets4.lottiefiles.com/packages/lf20_OkXAMI.json"
          style={{ height: '64px', width: '64px' }}
        ></Player>
      </BaseButton>
      <VehicleCardOverlay
        visible={overlayActive}
        onClose={() => setOverlayActive(false)}
      >
        <VehicleCardScreen />
      </VehicleCardOverlay>
      <div className={styles.image}>
        <img src={image?.url || ''} alt={t('vehicle.vehicle')} />
      </div>
      <div className={styles.content}>
        <h6>{vehicleTitle}</h6>
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

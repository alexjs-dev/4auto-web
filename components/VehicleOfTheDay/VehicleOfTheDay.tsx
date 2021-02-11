import React, { useState, useEffect } from 'react'
import { GiCarWheel, GiGasPump, GiSpeedometer } from 'react-icons/gi'
import { FiPhone, FiMail } from 'react-icons/fi'
import { useSwipeable } from 'react-swipeable'
import Lottie from 'lottie-react'
import { FiLink2, FiMapPin, FiGitPullRequest, FiTag } from 'react-icons/fi'
import sample from 'lodash/sample'
import useViewport from '../../hooks/useViewport'
import classNames from 'classnames'
import get from 'lodash/get'
import { formatVehicleMainLabel, getVehicleTitle } from '../../utils/helpers'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { transmissionTypes, fuelTypes, colorCodes } from '../../consts/vehicle'
import SwipeLeftAnim from '../../public/animations/swipe-left.json'
import {
  VehicleDetail,
  BaseButton,
  ImageCarousel,
  Avatar,
  Button,
  OfferForm,
  Loader,
} from '../'
import ListingType from '../../types/listing'
import styles from './VehicleOfTheDay.module.scss'

const emojis = ['🤘', '🙌', '🙏', '🤑', '😍']

type PriceProps = {
  price: number
  discountedPrice: number
}
type VehicleOfTheDayProps = {
  listing: ListingType
}

const Price: React.FunctionComponent<PriceProps> = ({
  price,
  discountedPrice,
}) => {
  return (
    <div className={styles.price}>
      <span>
        {discountedPrice > 0 && (
          <>
            {discountedPrice}&nbsp;<strong>{price}€</strong>
          </>
        )}
        {discountedPrice === 0 && <>{price}€</>}
      </span>
    </div>
  )
}

const Actions = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.actions}>
      <Button fluid type={Button.types.GHOST}>
        {t('button.call')} &nbsp; <FiPhone />
      </Button>
      <Button fluid type={Button.types.GHOST}>
        {t('button.mail')} &nbsp; <FiMail />
      </Button>
      <Button fluid label="Message" />
    </div>
  )
}

const VehicleDetails: React.FunctionComponent<VehicleOfTheDayProps> = ({
  listing,
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
    <div className={styles.vehicleDetails}>
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
      <VehicleDetail icon={<GiSpeedometer />} title={t('label.speedTo100')}>
        {vehicle.accelerationZeroToHundred} {t('label.seconds')}
      </VehicleDetail>
    </div>
  )
}

const VehicleContent: React.FunctionComponent<VehicleOfTheDayProps> = ({
  listing,
}) => {
  const { isMobile } = useViewport()
  const [visible, setVisible] = useState(!isMobile)
  const { t } = useTranslation()
  useEffect(() => {
    let timer: any
    if (!visible && isMobile) {
      timer = setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [visible, isMobile])

  if (!visible) return <Loader loading centered isBranded />
  return (
    <>
      <div className={styles.title}>
        <h3>
          {getVehicleTitle(
            {
              make: listing.vehicle.model.make.name,
              model: listing.vehicle.model.name,
              power: listing.vehicle.power,
            },
            t
          )}
          {/* @ts-ignore */}
          <BaseButton
            onClick={() =>
              toast.success(`${t('snackbar.link_copied')} ${sample(emojis)}`, {
                autoClose: 1800,
              })
            }
          >
            <FiLink2 size={20} />
          </BaseButton>
        </h3>
      </div>
      <VehicleDetails listing={listing} />
      <Avatar />
      <Actions />
      <OfferForm />
      <Price
        price={listing.price}
        discountedPrice={
          (listing.discountPercentage &&
            listing.price * listing.discountPercentage) ||
          0
        }
      />
    </>
  )
}

const VehicleOfTheDay: React.FunctionComponent<VehicleOfTheDayProps> = ({
  listing,
}) => {
  const { isMobile } = useViewport()
  const [isImageMaximized, setImageMaximized] = useState(isMobile)
  const { t } = useTranslation()
  const handlers = useSwipeable({
    onSwiped: () => setImageMaximized(false),
    trackMouse: isMobile,
  })

  const lottieAnimation = {
    animationData: SwipeLeftAnim, // dur: 60 frames
    loop: true,
    autoplay: true,
    style: {
      width: '19vw',
      height: '19vw',
    },
  }
  useEffect(() => {
    setImageMaximized(isMobile)
  }, [isMobile])
  if (!listing) return null
  return (
    <div className={styles.container}>
      <h1>{t('titles.vehicle_of_the_day')}</h1>
      <div className={styles.vehicleContainer}>
        <div
          className={classNames(
            styles.imageContainer,
            isImageMaximized && styles.maximized
          )}
          onClick={() => setImageMaximized(true)}
        >
          <ImageCarousel images={listing.vehicle.images} />
        </div>
        <div
          className={classNames(
            styles.detailsContainer,
            !isImageMaximized && styles.maximized
          )}
          {...handlers}
        >
          {isMobile && isImageMaximized ? (
            <div>
              <Lottie {...lottieAnimation} className={styles.swipeTutorial} />
            </div>
          ) : (
            <VehicleContent listing={listing} />
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

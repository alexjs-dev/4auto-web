import React, { useState, useRef } from 'react'
import find from 'lodash/find'
import head from 'lodash/head'
import get from 'lodash/get'
import classNames from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTranslation } from 'react-i18next'
import { bodyType as bodyTypes } from '~consts/vehicle'
import {
  FiMapPin,
  FiMoreVertical,
  FiGitPullRequest,
  FiDisc,
} from 'react-icons/fi'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import { FiCalendar } from 'react-icons/fi'
import Lottie from 'lottie-react'
import { BaseButton, VehicleDetail } from '~components'
import {
  formatMillage,
  getVehicleTitle,
  formatVehicleMainLabel,
  formatPriceWithDiscount,
  parseCloudinaryUrl,
  getPlaceholderImageUrl,
} from '~utils/helpers'
import VehicleCardScreen from './VehicleCardScreen/VehicleCardScreen'
import HeartAnimation from '~public/animations/heart.json'
import useViewport from '~hooks/useViewport'
import useOutsideClick from '~hooks/useOutsideClick'
import { transmissionTypes, fuelTypes } from '~consts/vehicle'
import VehicleCardRibbons from './VehicleCardRibbons'
import VehicleCardOverlay from './VehicleCardOverlay'
import styles from './VehicleCard.module.scss'

const isFavored = (id) =>
  localStorage.getItem(`favorite-listing-${id}`) === true ||
  localStorage.getItem(`favorite-listing-${id}`) === 'true'
const setFavored = (id) => localStorage.setItem(`favorite-listing-${id}`, true)
const unsetFavored = (id) => localStorage.removeItem(`favorite-listing-${id}`)

const VehicleCard = (props) => {
  const {
    model,
    make,
    regDate,
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
  } = props

  const listingId = get(props, 'listingId')
  const power = get(props, 'power')

  const ref = useRef(null)

  const [overlayActive, setOverlayActive] = useState(false)
  const { isMobile } = useViewport()
  useOutsideClick({ ref, isOpen: overlayActive, setOpen: setOverlayActive })
  const image = find(images, (image) => image.order === 0) || head(images)
  const { t } = useTranslation()
  const vehicleBodyYear = formatVehicleMainLabel(bodyType, regDate, t, isMobile)
  const vehicleBody = t(`vehicle.${bodyTypes[bodyType]}`);
  const vehicleMileage = isMobile ? mileage : formatMillage(mileage, t)
  const heartRef = useRef(null)
  const vehicleTitle = getVehicleTitle({ make, model, power, capacity }, t)

  const isLiked = useRef(isFavored(listingId))

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
    if (isLiked.current) setFavored(listingId)
    else unsetFavored(listingId)

    if (heartRef.current) {
      heartRef.current.setDirection(isLiked.current ? 1 : -1)
      heartRef.current.play()
    }
  }

  const finalPrice = formatPriceWithDiscount(price, discountPercentage)

  const imageSrc = get(image, 'url')
  const placeHolderSrc = getPlaceholderImageUrl(imageSrc)
  const imageUrl = parseCloudinaryUrl(imageSrc)

  return (
    <article className={styles.container} ref={ref}>
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
        <VehicleCardScreen
          listingId={listingId}
          price={finalPrice}
          title={vehicleTitle}
        />
      </VehicleCardOverlay>
      <div className={styles.image}>
        <BaseButton
          isInternalLink
          href={`/listing/${listingId}`}
          className={styles.imageLink}
        >
          <LazyLoadImage
            alt={vehicleTitle}
            effect="blur"
            src={imageUrl}
            placeholderSrc={placeHolderSrc}
          />
        </BaseButton>
      </div>
      <div className={styles.content}>
        <BaseButton
          className={styles.title}
          isInternalLink
          href={`/listing/${listingId}`}
        >
          {vehicleTitle}
        </BaseButton>
        <div className={styles.features}>
          <VehicleDetail icon={<FiCalendar />}>{vehicleBodyYear}</VehicleDetail>
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
            <VehicleDetail mobileOnly icon={<GiCarWheel />}>{vehicleBody}</VehicleDetail>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.prices}>
          {discountPercentage && (
            <span className={styles.price}>{`${finalPrice}€`}</span>
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
    </article>
  )
}

export default React.memo(VehicleCard)

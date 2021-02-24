import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import Lottie from 'lottie-react'
import { FiLink2 } from 'react-icons/fi'
import sample from 'lodash/sample'
import useViewport from '../../hooks/useViewport'
import classNames from 'classnames'
import { getVehicleTitle } from '../../utils/helpers'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import SwipeLeftAnim from '../../public/animations/swipe-left.json'
import { BaseButton, ImageCarousel, Avatar, OfferForm, Loader } from '../'
import ListingType from '../../types/listing'
import VehicleDetails from './components/VehicleDetails'
import styles from './VehicleOfTheDay.module.scss'
import VotdActions from './components/VotdActions'

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
      <Avatar
        userId={listing.userId}
        avatarSrc={listing.user.profile?.image?.url}
        username={
          listing.user.profile?.username || listing.user.profile?.firstName
        }
      />
      <VotdActions
        email="bill@gates.com"
        phone="37258587389"
        userId={listing.userId}
      />
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

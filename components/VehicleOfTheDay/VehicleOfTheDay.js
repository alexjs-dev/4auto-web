import React, { useState, useEffect } from 'react'
import { GiCarWheel, GiGasPump, GiSpeedometer } from 'react-icons/gi'
import { FiPhone, FiMail } from 'react-icons/fi'
import { useSwipeable } from 'react-swipeable'
import { FaRegHandPointer } from 'react-icons/fa'
import { FiLink2, FiMapPin, FiGitPullRequest, FiTag } from 'react-icons/fi'
import sample from 'lodash/sample'
import useViewport from '~hooks/useViewport'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import {
  VehicleDetail,
  BaseButton,
  ImageCarousel,
  Avatar,
  Button,
  OfferForm,
} from '~components'
import styles from './VehicleOfTheDay.module.scss'

const emojis = ['🤘', '🙌', '🙏', '🤑', '😍']

const Price = () => {
  return (
    <div className={styles.price}>
      <span>
        5899€&nbsp;
        <strong>9000€</strong>
      </span>
    </div>
  )
}

const Actions = () => {
  return (
    <div className={styles.actions}>
      <Button fluid type={Button.types.GHOST}>
        Call &nbsp; <FiPhone />
      </Button>
      <Button fluid type={Button.types.GHOST}>
        Mail &nbsp; <FiMail />
      </Button>
      <Button fluid label="Message" />
    </div>
  )
}

const VehicleDetails = () => {
  return (
    <div className={styles.vehicleDetails}>
      <VehicleDetail icon={<FiTag />} title={'Body type, year'}>
        Sedan, 2020
      </VehicleDetail>
      <VehicleDetail icon={<FiMapPin />} title={'Location'}>
        Tallinn, Estonia
      </VehicleDetail>
      <VehicleDetail icon={<FiGitPullRequest />} title={'Gearbox'}>
        Semi-automatic
      </VehicleDetail>
      <VehicleDetail icon={<GiCarWheel />} title={'Mileage'}>
        274 500
      </VehicleDetail>
      <VehicleDetail icon={<GiGasPump />} title={'Fuel'}>
        Gasoline, Gas (LPG)
      </VehicleDetail>
      <VehicleDetail icon={<FiTag />} title={'Cons.(city)'}>
        8L/100 Km
      </VehicleDetail>
      <VehicleDetail icon={<FiTag />} title={'Color'}>
        Silver
      </VehicleDetail>
      <VehicleDetail icon={<GiSpeedometer />} title={'Speed (1-100)'}>
        6.5s
      </VehicleDetail>
    </div>
  )
}

const VehicleContent = () => (
  <>
    <div className={styles.title}>
      <h3>
        Mercedes-Benz GLK-320 180 kW Quattro S-LINE Quadro xDrive v2
        <BaseButton
          onClick={() =>
            toast.success(`Link copied! ${sample(emojis)}`, {
              autoClose: 1800,
            })
          }
        >
          <FiLink2 size={20} />
        </BaseButton>
      </h3>
    </div>
    <VehicleDetails />
    <Avatar />
    <Actions />
    <OfferForm />
    <Price />
  </>
)

const VehicleOfTheDay = () => {
  const { isMobile } = useViewport()
  const [isImageMaximized, setImageMaximized] = useState(isMobile)

  const handlers = useSwipeable({
    onSwiped: () => setImageMaximized(false),
    trackMouse: isMobile,
  })

  useEffect(() => {
    setImageMaximized(isMobile)
  }, [isMobile])

  return (
    <div className={styles.container}>
      <h1>Vehicle of the day</h1>
      <div className={styles.vehicleContainer}>
        <div
          className={classNames(
            styles.imageContainer,
            isImageMaximized && styles.maximized
          )}
          onClick={() => setImageMaximized(true)}
        >
          <ImageCarousel />
        </div>
        <div
          className={classNames(
            styles.detailsContainer,
            !isImageMaximized && styles.maximized
          )}
          {...handlers}
        >
          {isMobile && isImageMaximized ? (
            <FaRegHandPointer size={64} className={styles.swipeTutorial} />
          ) : (
            <VehicleContent />
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

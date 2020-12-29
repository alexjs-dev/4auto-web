import React, { useState } from 'react'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import { FaRegHandPointer } from 'react-icons/fa'
import { FiLink2 } from 'react-icons/fi'
import sample from 'lodash/sample'
import useViewport from '~hooks/useViewport'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { VehicleDetail, BaseButton, ImageCarousel } from '~components'
import styles from './VehicleOfTheDay.module.scss'

const emojis = ['🤘', '🙌', '🙏', '🤑', '😍']

const VehicleContent = () => (
  <div className={styles.vehicleDetails}>
    <VehicleDetail icon={<GiCarWheel />} title="Body type, year">
      Sedan, 2020
    </VehicleDetail>
    <VehicleDetail icon={<GiCarWheel />} title="Body type, year">
      Sedan, 2020
    </VehicleDetail>
    <VehicleDetail icon={<GiCarWheel />} title="Body type, year">
      Sedan, 2020
    </VehicleDetail>
  </div>
)

const SwipeTutorial = () => (
  <div className={styles.swipeTutorial}>
    <FaRegHandPointer size={64} />
  </div>
)

const VehicleOfTheDay = () => {
  const { isMobile } = useViewport()
  const [isImageMaximized, setImageMaximized] = useState(false)
  return (
    <div className={styles.container}>
      <h1>Vehicle of the day</h1>
      <div className={styles.vehicleContainer}>
        <div className={styles.imageContainer}>
          <ImageCarousel />
        </div>
        <div className={styles.detailsContainer}>
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
          {isMobile ? <SwipeTutorial /> : <VehicleContent />}
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

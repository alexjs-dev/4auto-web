import React, { useState } from 'react'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import { useSwipeable } from 'react-swipeable'
import { FaRegHandPointer } from 'react-icons/fa'
import { FiLink2 } from 'react-icons/fi'
import sample from 'lodash/sample'
import useViewport from '~hooks/useViewport'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { VehicleDetail, BaseButton, ImageCarousel, Avatar } from '~components'
import styles from './VehicleOfTheDay.module.scss'

const emojis = ['🤘', '🙌', '🙏', '🤑', '😍']

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
      <VehicleDetail icon={<GiCarWheel />} title="Body type, year">
        Sedan, 2020
      </VehicleDetail>
      <VehicleDetail icon={<GiCarWheel />} title="Body type, year">
        Sedan, 2020
      </VehicleDetail>
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
    <Avatar />
  </>
)

const VehicleOfTheDay = () => {
  const { isMobile } = useViewport()
  const [isImageMaximized, setImageMaximized] = useState(isMobile)

  const handlers = useSwipeable({
    onSwiped: () => setImageMaximized(false),
  })

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
            <div className={styles.swipeTutorial}>
              <FaRegHandPointer size={64} />
            </div>
          ) : (
            <VehicleContent />
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

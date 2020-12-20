import React from 'react'
import { GiCarWheel, GiGasPump, GiElectric } from 'react-icons/gi'
import { FiLink2 } from 'react-icons/fi'
import sample from 'lodash/sample'
import { toast } from 'react-toastify'
import { VehicleDetail, BaseButton } from '~components'
import styles from './VehicleOfTheDay.module.scss'

const emojis = ['🤘', '🙌', '🙏', '🤑', '😍']

const VehicleOfTheDay = () => {
  return (
    <div className={styles.container}>
      <h1>Vehicle of the day</h1>
      <div className={styles.vehicleContainer}>
        <div className={styles.imageContainer}>
          <div className={styles.image} />
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
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

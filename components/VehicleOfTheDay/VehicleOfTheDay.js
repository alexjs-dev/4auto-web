import React from 'react'
import { GiElectric } from 'react-icons/gi'
import styles from './VehicleOfTheDay.module.scss'

const VehicleOfTheDay = () => {
  return (
    <div className={styles.container}>
      <h2>Vehicle of the day</h2>
      <div className={styles.vehicleContainer}>
        <div className={styles.imageContainer}>
          <img src="ads/bmw7.png" alt="some bmw car" />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.title}>
            <h3>Mercedes benz</h3>
            <GiElectric />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleOfTheDay

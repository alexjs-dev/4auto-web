import React from 'react'
import { FiTag } from 'react-icons/fi'
import styles from './VehicleDetail.module.scss'

const VehicleDetail = ({ icon, title, children }) => {
  return (
    <div className={styles.container}>
      {title && <h6>{title}</h6>}
      <div className={styles.detail}>
        {icon ? icon : <FiTag />}
        <span>{children}</span>
      </div>
    </div>
  )
}

export default React.memo(VehicleDetail)

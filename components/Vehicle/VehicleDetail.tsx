import React, { ReactChildren, ReactChild } from 'react'
import { FiTag } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'
import classNames from 'classnames'
import styles from './VehicleDetail.module.scss'

type Props = {
  icon?: IconType | ReactChild | ReactChildren
  title?: any
  children?: any
  className?: string
}

const VehicleDetail: React.FunctionComponent<Props> = ({
  icon,
  title,
  children,
  className
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      {title && <h6>{title}</h6>}
      <div className={styles.detail}>
        {icon ? icon : <FiTag />}
        <span>{children}</span>
      </div>
    </div>
  )
}

export default React.memo(VehicleDetail)
import React from 'react'
import classNames from 'classnames'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import styles from './ArrowPagination.module.scss'
import { BaseButton } from '~components'

const ArrowPagination = ({ onForward }) => {
  return (
    <div className={styles.container}>
      <BaseButton className={classNames(styles.button, styles.left)}>
        <FiChevronLeft />
      </BaseButton>
      <BaseButton className={styles.button} onClick={onForward}>
        <FiChevronRight />
      </BaseButton>
    </div>
  )
}

export default ArrowPagination
